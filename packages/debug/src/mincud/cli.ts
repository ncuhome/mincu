import internalIp from 'internal-ip'
import execa from 'execa'
import stripAnsi from 'strip-ansi'
import meow from 'meow'
import readline, { Key } from 'readline'
import type { Server } from 'ws'
import chalk from 'chalk'
import terminate from 'terminate'
import { startServer } from './server'
import { StringMatcher } from './StringMatcher'
import { REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST, CMD_RELOAD, CMD_DEV_TOOL, DEBUG_PORT } from './shared'
import { LazyModule } from './LazyModule'
import { join } from 'path'
import openBrowser from './openBrowser';

const CWD = __filename.includes('.ts')
  ? join(__dirname, '../../mincud/cli/dist')
  : __dirname

const lazyModule = new LazyModule({
  cwd: CWD
})

const pkgInstall = async (name: string, version?: string) => {
  const content = `${name}${version ? '@' + version : ''}`
  try {
    await lazyModule.install(name, version)
    console.log(`Installed ${content}`)
  } catch (e) {
    console.log(`Install ${content} failed`)
    console.error(e)
  }
}

const TAG = chalk.inverse.green.bold(' Server ')

const rLog = (...args: any[]) => console.log(`\r` + args.join(' '))

const initCli = () => {
  return meow(`
	Usage
	  $ mincud <command> [options]

	Options
	  --no-qrcode, Disable qrcode generation
    --no-server-command, Disable handling server command
    --no-chii, Disable chii remote devtools

	Examples
	  $ mincud npm run dev
`, {
    flags: {
      help: {
        alias: 'h'
      },
      qrcode: {
        type: 'boolean',
        default: true
      },
      chii: {
        type: 'boolean',
        default: true
      },
      serverCommand: {
        type: 'boolean',
        default: true
      }
    }
  })
}

class Cli {
  flags: ReturnType<typeof initCli>['flags'];
  input: string[];
  devtoolPort?: number;
  childPid?: number;

  constructor() {
    const { input, flags, showHelp } = initCli()
    this.flags = flags
    this.input = input;

    if (this.flags.help) {
      showHelp(0)
      return
    }

    this.start()
  }

  startAndBindServer = async (wss?: Server) => {
    if (this.flags.serverCommand) {
      if (!wss) {
        await this.startDevtool()
      }
      this.bindServerCommand(wss || startServer())
    }
  }

  async start() {
    const flags = this.flags;
    const input = this.input;

    if (flags.chii) {
      await pkgInstall('mincu-chii')
    }

    // Directly start if no input
    if (this.input.length === 0) {
      if (this.flags.chii) {
        this.useChii()
      } else {
        this.startAndBindServer()
      }
      return
    }

    const finalCmd = input.length > 1 ? input.join(' ') : input[0]

    const { stderr, stdout, pid } = execa.command(finalCmd, { env: { FORCE_COLOR: 'true' } })

    this.childPid = pid

    // Only start after child process running successfully
    stdout.once('data', async () => {
      if (flags.chii) {
        this.useChii()
      } else if (flags.qrcode) {
        this.useQrcode(stdout)
      }
    })

    stdout?.pipe(process.stdout)
    stderr?.pipe(process.stderr)
  }

  useChii = async () => {
    try {
      const chii = lazyModule.require('mincu-chii')
      const res = chii.start({
        port: DEBUG_PORT
      })
      if (res) {
        this.startAndBindServer(res.wss)
      }
      openBrowser(`http://localhost:${DEBUG_PORT}`)
    } catch (err) {
      console.log(err)
    }
    return
  }

  openQRCode = (text: string) => {
    if (!this.devtoolPort) return

    let origin = text
    if (origin.match('localhost')) {
      const ipv4 = internalIp.v4.sync()
      if (!ipv4) {
        rLog(TAG, 'Cannot get Network Host')
        return
      }
      origin = text.replace('localhost', ipv4)
    }
    const url = new URL(origin)
    url.searchParams.set('devSecret', 'iNCUDeveloper++')
    openBrowser(`http://localhost:${this.devtoolPort}/?url=${encodeURIComponent(url.toString())}&origin=${origin}`)
  }

  startDevtool = async () => {
    await lazyModule.install('mincu-debug-tools')
    try {
      const { DEV_TOOL_PORT, startDevTool } = lazyModule.require('mincu-debug-tools/server')

      this.devtoolPort = DEV_TOOL_PORT

      startDevTool?.()
    } catch (err) {
      console.log("TEST", err)
    }
  }

  useQrcode = async (stdout) => {
    this.startAndBindServer()

    const stringMatcher = new StringMatcher([REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST])
    stringMatcher.onMatch(matchRes => {
      this.openQRCode(matchRes[0])
    })
    stdout?.on('data', data => {
      const str = stripAnsi(data.toString())
      stringMatcher.put(str)
    })
  }

  bindServerCommand = (wss: Server) => {
    const { stdin, exit, stdout } = process
    readline.emitKeypressEvents(stdin)
    if (stdin.isTTY) stdin.setRawMode(true)

    const broadcast = (data: any, message) => {
      if (wss.clients.size > 0) {
        rLog(TAG, message)
      } else {
        rLog(TAG, 'No client connected')
      }
      wss.clients.forEach(client => {
        client.send(data)
      })
    }

    const exitWithLog = () => {
      rLog(chalk.inverse.cyan.bold(' Mincud '), 'was shutdown')
      exit()
    }

    stdin.on('keypress', (_, data: Key) => {
      const {
        ctrl,
        name
      } = data
      if (ctrl) {
        switch (name) {
          case 'c':
            if (this.childPid >= 0) {
              // @ts-ignore
              terminate(childPid, 'SIGINT', { timeout: 0 }, exitWithLog);
            } else {
              exitWithLog()
            }
          case 'z':
            break
        }
      } else if (name === 'r') {
        broadcast(CMD_RELOAD, 'Reloading app...')
      } else if (name === 'd') {
        broadcast(CMD_DEV_TOOL, 'Toggle Dev Tools...')
      } else if (name === 'return') {
        stdout.write('\r\n')
      } else if (name) {
        stdout.write(name)
      }
    })
  }
}

export const startCli = () => new Cli()
import internalIp from 'internal-ip'
import execa from 'execa'
import stripAnsi from 'strip-ansi'
import meow from 'meow'
import readline, { Key } from 'readline'
import type { WebSocketServer } from 'ws'
import chalk from 'chalk'
import terminate from 'terminate'
import mincuChii from 'mincu-chii'
import { startServer } from './server'
import { StringMatcher } from './StringMatcher'
import {
  REGEXP_NETWORK_HOST,
  REGEXP_LOCAL_HOST,
  CMD_RELOAD,
  CMD_DEV_TOOL,
  DEBUG_CHII_PORT,
} from 'mincu-lib/debug'
import openBrowser from './openBrowser'
import { DEV_TOOL_PORT, startDevTool } from 'mincu-debug-tools/server'
import { CHII_EVENT } from 'mincu-lib/debug'

const IPV4 = internalIp.v4.sync()

const LOCALHOST = 'http://localhost'

const TAG = chalk.inverse.green.bold(' Server ')

const rLog = (...args: any[]) => console.log(`\r` + args.join(' '))

const initCli = () => {
  return meow(
    `
	Usage
	  $ mincud <command> [options]

	Options
	  --no-qrcode, Disable qrcode generation
    --no-server-command, Disable handling server command
    --no-chii, Disable chii remote devtools

	Examples
	  $ mincud npm run dev
`,
    {
      flags: {
        help: {
          alias: 'h',
        },
        qrcode: {
          type: 'boolean',
          default: true,
        },
        chii: {
          type: 'boolean',
          default: true,
        },
        serverCommand: {
          type: 'boolean',
          default: true,
        },
      },
    }
  )
}

class Cli {
  flags: ReturnType<typeof initCli>['flags']
  input: string[]
  devtoolPort?: number
  childPid?: number
  wss: WebSocketServer

  constructor() {
    const { input, flags, showHelp } = initCli()
    this.flags = flags
    this.input = input

    if (this.flags.help) {
      showHelp(0)
      return
    }

    this.init()
  }

  startAndBindServer = async () => {
    if (this.flags.serverCommand) {
      this.wss = startServer()
      this.bindServerCommand()
    }
  }

  async init() {
    const input = this.input

    // Directly start if no input
    if (this.input.length === 0) {
      this.start()
      return
    }

    const finalCmd = input.length > 1 ? input.join(' ') : input[0]

    const { stderr, stdout, pid } = execa.command(finalCmd, {
      env: { FORCE_COLOR: 'true' },
    })

    this.childPid = pid

    // Only start after child process running successfully
    stdout.once('data', async () => {
      this.start()
    })

    stdout?.pipe(process.stdout)
    stderr?.pipe(process.stderr)
  }

  start = () => {
    this.startAndBindServer()
    if (this.flags.chii) {
      this.useChii()
    }
    if (this.flags.qrcode) {
      this.startDevtool()
      openBrowser(LOCALHOST + ':' + this.devtoolPort)
    }
  }

  useChii = async () => {
    try {
      const { wss: chiiWss, onTargetChanged } = mincuChii.start({
        port: DEBUG_CHII_PORT,
      }) as { wss: WebSocketServer; onTargetChanged: (cb: () => void) => void }
      if (chiiWss) {
        chiiWss.on('connection', (res: any) => {
          if (res.type === 'target') {
            if (this.wss) {
              const { id, chiiUrl, title } = res
              this.broadcast(
                JSON.stringify({
                  type: CHII_EVENT.CONNECTED,
                  data: {
                    id,
                    title,
                    chiiUrl,
                  },
                })
              )
            }
          }
        })
      }
      onTargetChanged?.(() => {
        this.broadcast(
          JSON.stringify({
            type: CHII_EVENT.TARGET_CHANGED,
          })
        )
      })
      // openBrowser(`http://localhost:${DEBUG_PORT}`)
    } catch (err) {
      console.log(err)
    }
    return
  }

  openQRCode = (text: string) => {
    if (!this.devtoolPort) return

    let origin = text
    if (origin.match('localhost')) {
      if (!IPV4) {
        rLog(TAG, 'Cannot get Network Host')
        return
      }
      origin = text.replace('localhost', IPV4)
    }
    const url = new URL(origin)
    url.searchParams.set('devSecret', 'iNCUDeveloper++')
    openBrowser(
      `${LOCALHOST}:${this.devtoolPort}/?url=${encodeURIComponent(
        url.toString()
      )}&origin=${origin}`
    )
  }

  startDevtool = async () => {
    this.devtoolPort = DEV_TOOL_PORT

    startDevTool()
  }

  useQrcode = async (stdout) => {
    this.startAndBindServer()

    const stringMatcher = new StringMatcher([
      REGEXP_NETWORK_HOST,
      REGEXP_LOCAL_HOST,
    ])
    stringMatcher.onMatch((matchRes) => {
      this.openQRCode(matchRes[0])
    })
    stdout?.on('data', (data) => {
      const str = stripAnsi(data.toString())
      stringMatcher.put(str)
    })
  }

  broadcast = (data: any, message?: any) => {
    if (message) {
      if (this.wss.clients.size > 0) {
        rLog(TAG, message)
      } else {
        rLog(TAG, 'No client connected')
      }
    }
    this.wss.clients?.forEach((client) => {
      client.send(data)
    })
  }

  bindServerCommand = () => {
    const { stdin, exit, stdout } = process
    readline.emitKeypressEvents(stdin)
    if (stdin.isTTY) stdin.setRawMode(true)

    const exitWithLog = () => {
      rLog(chalk.inverse.cyan.bold(' Mincud '), 'was shutdown')
      exit()
    }

    stdin.on('keypress', (_, data: Key) => {
      const { ctrl, name } = data
      if (ctrl) {
        switch (name) {
          case 'c':
            if (this.childPid >= 0) {
              // @ts-ignore
              terminate(this.childPid, 'SIGINT', { timeout: 0 }, exitWithLog)
            } else {
              exitWithLog()
            }
          case 'z':
            break
        }
      } else if (name === 'r') {
        this.broadcast(CMD_RELOAD, 'Reloading app...')
      } else if (name === 'd') {
        this.broadcast(CMD_DEV_TOOL, 'Toggle Dev Tools...')
      } else if (name === 'return') {
        stdout.write('\r\n')
      } else if (name) {
        stdout.write(name)
      }
    })
  }
}

export const startCli = () => new Cli()

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
import { REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST, CMD_RELOAD, CMD_DEV_TOOL } from './shared'
import { DEV_TOOL_PORT } from 'mincu-debug-tools/server';
import openBrowser from 'react-dev-utils/openBrowser'

const TAG = chalk.inverse.green.bold(' Server ')
let childPid = -1

const rLog = (...args: any[]) => console.log(`\r` + args.join(' '))

const initCli = () => {
  return meow(`
	Usage
	  $ mincud <command> [options]

	Options
	  --no-qrcode, Disable qrcode generation
    --no-server-command, Disable handling server command

	Examples
	  $ mincud 'npm run dev'
`, {
    flags: {
      help: {
        alias: 'h'
      },
      qrcode: {
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

const handleServerCommand = (wss: Server) => {
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
          if (childPid >= 0) {
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

const openQRCode = (text: string) => {
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

  openBrowser(`http://localhost:${DEV_TOOL_PORT}/?url=${encodeURIComponent(url.toString())}&origin=${origin}`)
}

export const startCli = () => {
  const { input, flags, showHelp } = initCli()
  if (flags.help) {
    showHelp(0)
    return
  }

  const wss = startServer()

  if (flags.serverCommand) {
    handleServerCommand(wss)
  }

  if (input.length === 0) return

  const { stderr, stdout, pid } = execa.command(input[0], { env: { FORCE_COLOR: 'true' } })

  childPid = pid

  if (flags.qrcode) {
    const stringMatcher = new StringMatcher([REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST])
    stringMatcher.onMatch(matchRes => {
      openQRCode(matchRes[0])
    })
    stdout?.on('data', data => {
      const str = stripAnsi(data.toString())
      stringMatcher.put(str)
    })
  }

  stdout?.pipe(process.stdout)
  stderr?.pipe(process.stderr)
}
import open from 'open'
import internalIp from 'internal-ip'
import execa from 'execa'
import stripAnsi from 'strip-ansi'
import meow from 'meow'
import readline, { Key } from 'readline'
import type { Server } from 'ws'
import chalk from 'chalk'
import { startServer } from './server'
import { StringMatcher } from './StringMatcher'
import { REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST, CMD_RELOAD, CMD_DEV_TOOL } from './shared'

const TAG = chalk.inverse.green.bold(' Server ')

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
  const { stdin, exit } = process
  readline.emitKeypressEvents(stdin)
  if (stdin.isTTY) stdin.setRawMode(true)

  const broadcast = (data: any, message) => {
    if (wss.clients.size > 0) {
      console.log(TAG, message)
    } else {
      console.log(TAG, 'No client connected')
    }
    wss.clients.forEach(client => {
      client.send(data)
    })
  }

  stdin.on('keypress', (_, data: Key) => {
    const {
      ctrl,
      name
    } = data
    if (ctrl) {
      switch (name) {
        case 'c':
          exit()
        case 'z':
          break
      }
    } else if (name === 'r') {
      broadcast(CMD_RELOAD, 'Reloading app...')
    } else if (name === 'd') {
      broadcast(CMD_DEV_TOOL, 'Toggle Dev Tools...')
    }
  })
}

const openQRCode = (text: string) => {
  let origin = text
  if (origin.match('localhost')) {
    const ipv4 = internalIp.v4.sync()
    if (!ipv4) {
      console.log(TAG, 'Cannot get Network Host')
      return
    }
    origin = text.replace('localhost', ipv4)
  }
  const url = new URL(origin)
  url.searchParams.set('devSecret', 'iNCUDeveloper++')
  const subtitle = "请打开 「南大家园」 - 「生活板块」 - 右上角「扫一扫」，扫描以上二维码，开始调试"

  open(`https://qrcode-function.vercel.app/api?text=${encodeURIComponent(url.toString())}&title=${origin}&subtitle=${subtitle}&type=html`)
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

  const { stderr, stdout } = execa.command(input[0], { env: { FORCE_COLOR: 'true' } })

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
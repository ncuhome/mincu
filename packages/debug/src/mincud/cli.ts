import open from 'open'
import internalIp from 'internal-ip'
import execa from 'execa'
import stripAnsi from 'strip-ansi';
import meow from 'meow'
import { startServer } from './server';
import { StringMatcher } from './StringMatcher';
import { REGEXP_NETWORK_HOST, REGEXP_LOCAL_HOST } from './shared';

const initCli = () => {
  return meow(`
	Usage
	  $ mincud <command> [options]

	Options
	  --no-qrcode Disable qrcode generation

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
      }
    }
  });
}

const openQRCode = (text: string) => {
  let origin = text
  if (origin.match('localhost')) {
    origin = text.replace('localhost', internalIp.v4.sync())
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

  startServer()
  
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
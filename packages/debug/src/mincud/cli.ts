import open from 'open'
import internalIp from 'internal-ip'
import execa from 'execa'
import stripAnsi from 'strip-ansi';
import { startServer } from './server';
import { StringMatcher } from './StringMatcher';
import { REGEXP_INTERNAL_IP, REGEXP_LOCALHOST } from './shared';

const args = process.argv.slice(2)

const openQRCode = (text: string) => {
  let origin = text
  if (origin.match('localhost')) {
    origin = text.replace('localhost', internalIp.v4.sync())
  }
  const url = new URL(origin)
  url.searchParams.set('devSecrect', 'iNCUDeveloper++')
  const subtitle = "请打开 「南大家园」 - 「生活板块」 - 右上角「扫一扫」，扫描以上二维码，开始调试"

  open(`https://qrcode-function.vercel.app/api?text=${encodeURIComponent(url.toString())}&title=${origin}&subtitle=${subtitle}&type=html`)
}

export const startCli = () => {
  startServer()
  if (args.length === 0) return

  const stringMatcher = new StringMatcher([REGEXP_INTERNAL_IP, REGEXP_LOCALHOST])
  stringMatcher.onMatch(matchRes => {
    openQRCode(matchRes[0])
  })

  const { stderr, stdout } = execa.command(args[0], { env: { FORCE_COLOR: 'true' } })

  stdout?.on('data', data => {
    const str = stripAnsi(data.toString())
    stringMatcher.put(str)

    process.stdout.write(data)
  })

  stderr?.pipe(process.stderr)
}
import fs from 'fs'
import path from 'path'
import execa from 'execa'

const KILL_DELAY = 1000

const EXAMPLE_ROOT = path.join(__dirname, '../example')

const SCRIPTS = ['start', 'build', 'dev']


const shouldMincudSilent = (cmd: string) => {
  return cmd.includes('mincud')
}

const shouldSkipCmd = (cmd: string) => {
  return cmd.includes('next start')
}

const runCmd = (cwd: string, name: string, cmdContent: string) => {
  let cmd = `npm run ${name}`

  if (shouldMincudSilent(cmdContent)) {
    cmd += ' -- --no-qrcode'
  }

  console.log(`  Running \`${cmd}\` at ${cwd}
    ${cmdContent}`)

  return new Promise((resolve) => {
    const child = execa.command(cmd, { cwd })
    child.stdout.once('data', _ => {
      setTimeout(() => {
        child.kill()
        resolve(true)
      }, KILL_DELAY)
    })

    child.catch(e => {
      child.kill()
      if (e.signal !== 'SIGTERM') {
        console.log(`
  [${path.basename(cwd)}] \`${cmd}\` failed.
  Retry:
    npm --prefix ${cwd} run ${name}
`)
        process.exit()
      }
    })
  })
}

const runScripts = async (pkgPath: string) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const cwd = path.dirname(pkgPath)

  const { scripts } = pkg
  const targetScripts = Object.keys(scripts).filter(name => SCRIPTS.includes(name))

  for (const name of targetScripts) {
    const cmdContent = scripts[name]
    if (!shouldSkipCmd(cmdContent)) {
      await runCmd(cwd, name, cmdContent)
    }
  }
}

const main = async () => {
  for (const name of fs.readdirSync(EXAMPLE_ROOT)) {
    const pkgPath = path.join(EXAMPLE_ROOT, name, 'package.json')
    await runScripts(pkgPath)
  }

  console.log(`
  Ran example templates scripts done
`)
}

main()
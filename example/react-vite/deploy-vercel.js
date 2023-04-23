// mincu-react-vite
const { execSync } = require('child_process');
const cloneDeep = require('lodash/cloneDeep')

const fs = require('fs');
const path = require('path');

const rewrite = (pkgPath) => {
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  const clonedJson = cloneDeep(pkgJson)
  const { dependencies, devDependencies } = clonedJson

  for (const [key, value] of Object.entries(dependencies)) {
    dependencies[key] = value.replace('workspace:', '')
  }

  for (const [key, value] of Object.entries(devDependencies)) {
    devDependencies[key] = value.replace('workspace:', '')
  }

  fs.writeFileSync(pkgPath, JSON.stringify(clonedJson, null, 2))

  return () => {
    fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2))
  }
}

const pwdPkgPath = path.join(__dirname, './package.json')
const recoverPwdPkg = rewrite(pwdPkgPath)

try {
  execSync('vercel --prod', {
    stdio: 'inherit'
  })
} catch (error) {
  throw error
} finally {
  recoverPwdPkg()
}

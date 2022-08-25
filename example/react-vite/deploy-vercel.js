// mincu-react-vite
const { execSync } = require('child_process');
const pkgJson = require('./package.json')
const cloneDeep = require('lodash/cloneDeep')

const fs = require('fs');
const path = require('path');

const buildJson = cloneDeep(pkgJson)

const { dependencies, devDependencies } = buildJson

const rewrite = (deps) => {
  for (const [key, value] of Object.entries(deps)) {
    deps[key] = value.replace('workspace:', '')
  }
}

rewrite(dependencies)
rewrite(devDependencies)

fs.writeFileSync('./package.json', JSON.stringify(buildJson, null, 2))

try {
  execSync('vercel --prod', {
    stdio: 'inherit'
  })
} catch (error) {
  throw error
} finally {
  fs.writeFileSync(path.join(__dirname, './package.json'), JSON.stringify(pkgJson, null, 2) + '\n')
}

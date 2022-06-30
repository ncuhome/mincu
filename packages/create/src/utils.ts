import fse from 'fs-extra'

export function isEmpty(path: string) {
  return fse.readdirSync(path).length === 0
}

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
export function pkgFromUserAgent(userAgent: string) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

export function logSuccessTips(name: string, pkg: Record<string, any>) {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  const { scripts } = pkg

  let startCmd

  if (scripts?.start) {
    startCmd = 'start'
  } else if (scripts?.dev) {
    startCmd = 'dev'
  }

  console.log(`
  创建完毕，接下来可以: 

  cd ${name}`)

  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      if (startCmd) {
        console.log(`  yarn ${startCmd}`)
      }
      break
    default:
      console.log(`  ${pkgManager} install`)
      if (startCmd) {
        console.log(`  ${pkgManager} run ${startCmd}`)
      }
      break
  }
  console.log()
}

/**
 * transform package.json dependencies and devDependencies
 * with pnpm `workspace:` prefix back to normal npm format
 *
 * @param {Record<string, any>} pkg package.json
 */
export function transformDeps(pkg: Record<string, any>) {
  const { dependencies, devDependencies } = pkg

  const replacePrefix = (dep) => {
    return dep.replace('workspace:', '')
  }

  if (dependencies) {
    Object.keys(dependencies).forEach((key) => {
      dependencies[key] = replacePrefix(dependencies[key])
    })
  }

  if (devDependencies) {
    Object.keys(devDependencies).forEach((key) => {
      devDependencies[key] = replacePrefix(devDependencies[key])
    })
  }
}

export const renameFiles = {
  _gitignore: '.gitignore',
}

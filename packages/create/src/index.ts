import path from 'path'
import minimist from 'minimist'
import { downloadWithCheck } from 'gdl'
import {
  isEmpty,
  isValidPackageName,
  toValidPackageName,
  renameFiles,
  logSuccessTips,
  transformDeps,
} from './utils'
import fse from 'fs-extra'
import prompts from 'prompts'
import { cyan, red, green, lightMagenta, yellow } from 'kolorist'

const cwd = process.cwd()

interface Template {
  name: string
  description: string
  color: (str: string | number) => string
}

interface Result {
  projectName: string
  packageName?: string
  template: string
  overwriteChecker?: any
  overwrite?: boolean
}

const TEMPLATES: Template[] = [
  {
    name: 'react-vite',
    description: '推荐使用',
    color: cyan,
  },
  {
    name: 'ice-example',
    description: '非常好用',
    color: lightMagenta,
  },
  {
    name: 'react-next',
    description: '挺牛的',
    color: green,
  },
  {
    name: 'vanilla-ts',
    description: '纯纯原生',
    color: yellow,
  },
]

const init = async () => {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'mincu-project' : targetDir

  let template = argv.template || argv.t

  let result = {} as Result

  // input
  try {
    result = await prompts<Result>(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: '项目名称:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () => (!fse.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? '当前目录' : `目标目录 "${targetDir}"`) +
            ` 已存在. 删除已经存在的文件还是继续呢?`,
        },
        {
          type: (_, { overwrite } = { overwrite: false }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' 操作已被取消')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: 'package.json 的包名(packageName):',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || '非法的 package.json 名',
        },
        {
          type: template && TEMPLATES.some((item) => template !== item.name) ? null : 'select',
          name: 'template',
          message:
            typeof template === 'string' && !TEMPLATES.some((item) => template !== item.name)
              ? `"${template}" 并不是一个有效的模板. 请选择以上模板: `
              : '选择一个模板:',
          initial: 0,
          choices: TEMPLATES.map((item) => {
            return {
              title: item.color(`${item.name}: ${item.description}`),
              value: item.name,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' 操作已被取消')
        },
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  // Package Path
  const root = path.join(cwd, targetDir)

  // Download template
  await downloadWithCheck(
    `https://github.com/ncuhome/mincu/tree/master/example/${result.template}`,
    root
  )

  // Rename files
  Object.keys(renameFiles).forEach((key) => {
    const oldPath = path.join(root, key)
    const newPath = path.join(root, renameFiles[key])

    if (!fse.existsSync(oldPath)) return
    fse.renameSync(oldPath, newPath)
  })

  // Write package.json
  const pkgPath = path.join(root, `package.json`)
  const pkg = fse.readJSONSync(pkgPath)

  pkg.name = result.packageName || targetDir

  transformDeps(pkg)

  fse.writeJSONSync(pkgPath, pkg, { spaces: 2 })

  logSuccessTips(targetDir, pkg)
}

init().catch((e) => {
  console.error(e)
})

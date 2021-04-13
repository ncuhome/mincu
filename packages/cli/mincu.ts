import program from 'commander'

program
  .version('1.0.0')
  .usage('<command> [项目名称]')
  .command('init', '创建新项目')
  .command('plugin', 'mincu 插件')
  .command('publish', '发布新版本')
  .parse(process.argv)

// .mincurc.js

// plugin
interface ctx {
  projectConfig: any
  version: string
  hooks: Map<string, [() => {}]>
}

// lifecycle

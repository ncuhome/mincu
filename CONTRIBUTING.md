# mincu 贡献指南

mincu 的项目结构为 monorepo，使用 pnpm + workspaces 管理（之前为 yarn workspaces + lerna）。在开发之前，你需要先安装 [pnpm](https://pnpm.io/installation)

## 项目初始化

```cmd
$ git clone https://github.com/ncuhome/mincu # or clone your fork
$ cd mincu
$ pnpm i
$ pnpm dev

# then start coding in packages/*
```

## 如何调试 debug, debug-tools

```cmd
$ pnpm dev
$ pnpm start:debug-tools
# then start coding in packages/debug or packages/debug-tools
```

## 运行示例

```cmd
# example/vanilla-ts
$ pnpm start
```

其他示例见 [example](./example)，也可参考 [使用到的项目](#使用到的项目)

## 添加依赖

根目录下添加：

```cmd
pnpm add -DW <package-name>
```

某个 packages 下添加：

```cmd
pnpm add <package-name> --filter <target-package-name>
```

## 发版（需要 NPM 账号权限）

```cmd
pnpm build
```

```cmd
pnpm release
```
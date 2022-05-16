## Changelog

### 2.4.1

- **fix** mincu-hooks useReady `Error: reject is not a function`

### 2.4.0

- **feat** mincu-react 添加 `ReadySSR` 组件，封装了在 nextjs SSR 环境下使用 useAppReady 判断的逻辑，避免 `Unhandled Runtime Error: Hydration failed……`(参考 [https://github.com/vercel/next.js/discussions/35773]) 用法类似 react 的 Suspense，如：
  
  ```ts
  <ReadySSR fallback={<div>Loading...</div>}>
    <Component {...pageProps} />
  </ReadySSR>
  ```

### 2.0.0

- **breaking** 迁移至 monorepo，原来的 `mincu` 包替换为 `mincu-react`, `mincu-vanilla` 等多个独立包
- **feat** mincu-debug 包，提供调试功能

### 1.0.5

- **fix** 修复 isReady 错误初始值的问题
- **feat** 增加 StatusBar 函数（5.3）

### 1.0.4

- **fix** 修复加载数据失败的问题

### 1.0.3

- **feat** 添加 login 方法

- **feat** 添加 useAppReady、useSafeArea 钩子

- **fix** 添加默认 userData

### 1.0.2

- **fix** 修复端外蜜汁报错

### 1.0.1

- **feat** 提供 api 文档

- **fix** 优化类型定义

- **fix** 修复 `hooks` 失效的问题

### 1.0.0

- **feat** initial

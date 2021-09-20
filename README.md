# Mincu 南大家园 JS API

## 文档地址

https://ncuhome.github.io/mincu/

## 什么是 Mincu？

iNCU 为其内嵌的 WEB 页面提供了丰富的 JS API，用来扩展内嵌页面 JS 的能力，如获取用户信息、操作原生 UI、获取原生 UI 和数据调用能力，以及解决你最头疼的认证系统。

## 为什么要用？

1. 定制属于你的 webview，做最极致的用户体验

2. 无需再为调试客户端头疼，使用 Web 开发技术即可获得和 Native 一样的体验

3. 跨平台调用原生能力

4. 可唤起系统原生的 UI 界面/组件，让 Web App 更 Native 化

5. 使用客户端分享功能，打通用户分享转发链路

## 迭代计划

1. 集成更多原生功能

2. useNativeState 状态缓存

3. 高效调试方案

4. 脚手架能力 (@Dollie)

5. 考虑将原生代码同样集成于本仓库

6. 白名单系统

7. ...

## 使用说明

### 安装依赖


**React**
```cmd
$ npm install mincu-react
# or
$ yarn add mincu
```

**其他 (Vue、Vanilla)**
```cmd
$ npm install mincu-vanilla
# or
$ yarn add mincu-vanilla
```

### 引入

```jsx
import { useLogin } from 'mincu-react' // or mincu-hooks

const App = () => {
  // 使用 App 端登录并获取是否初始化 Web 容器状态
  // useLogin 是一个组合 hook
  // 里面包含 useAppReady 和登录状态获取并存储的逻辑
  const { isReady } = useLogin()

  if (!isReady) {
    return <div>Loading</div>
  }

  return <div>Thank you for using mincu</div>
}
```

### 接收 Native -> Web 通信方法

```jsx
import { useNativeState } from 'mincu-react' // or mincu-hooks

const App = () => {
  // 已初始化
  
  // 使用 Native 对 Web 的通信实现颜色主题状态共享
  // 接收 Native 端已注册的可共享状态的变化
  const colorScheme = useNativeState('colorScheme')

  return <div>Current Theme is {colorScheme}</div>
}
```

### Web -> Native 通信方法

这种方法更加常用一些

```jsx
import { networkModule } from 'mincu-react' // or mincu-network

const App = () => {
  // 已初始化
  
  const refreshToken = async () => {
    // 向 Native 通信，并获取 Native 端的返回值
    const token = await networkModule.refreshToken()
    alert(token)
  }

  return <button onClick={refreshToken}>刷新 token</button>
}
```

### 调试方法

为了方便在移动端 WebView 中调试，我们提供了 `mincu-debug` 来，`mincu-debug` 采用了 Client/Server 模型，实现了各种在 WebView 中打 log，刷新页面，注入/取消注入 Devtool 等功能。（参考 react-native 的 HMRClient/Server）。

- 安装 `mincu-debug`
  ```cmd
  $ npm i --save-dev mincu-debug # or yarn add -D mincu-debug
  ```

- 在前端代码中引入 Client，通过 applyConsole 方法来重写默认的 console 事件，实现打印事件的绑定。建议只在 dev 环境中动态引入，避免增大 bundle 体积。
  ```js
  // 如果你使用 vite，则通过 import.meta.env.DEV 判断 DEV 环境。
  if (process.env.NODE_ENV === 'development') {
    import('mincu-debug').then(({ default: debugModule }) => {
      debugModule.applyConsole()
    })
  }
  ```

- 启动 `mincud` Server，监听来自 Client 的打印事件：
  ```cmd
  $ npx mincud
  ```

  推荐将 `mincud` 与前端 dev server 同时启动，一方面是不需要额外开启另外一个终端，另一方面是将提供打开：
  ```cmd
  $ npx mincud 'npm run dev'
  ```

  ```json
  // package.json
  {
    "scripts": {
      "start": "mincud 'npm run dev'",
      "dev": "vite --host",
      "build": "tsc && vite build",
      "serve": "vite preview"
    }
  }
  ```

- 执行命令 `npm run start` 后，将会启动 mincud，匹配到 dev host 页面后将会打开一个二维码页面，打开南大家园，然后扫描即可跳转到该页面进行开发。
  
- mincud 启动将会捕获终端输入事件，按 `r` 会尝试刷新页面，按 `d` 则会尝试切换（注入/取消注入）Devtool（[eruda](https://github.com/liriliri/eruda)）
  ```cmd
  To reload the client page press "r"
  To toggle the client devtool press "d"
  ```

完整的用法请看 [example/vanilla-ts](./example/vanilla-ts)

## 其他说明

### packages

- mincu-core 
  核心逻辑部分，包含了常用的用户数据，提供 web 和 native 的双向通信、调用来自 App 的接口等功能。
- mincu-data
  数据部分，基本上来自于 core 里的 appData，不过加了一层初始化默认值处理。
- mincu-debug
  调试部分，包含了 mincud 和 debugModule，以方便在 WebView 中进行远程调试。
- mincu-event
  封装了一些原生操作函数，包括 openUrl, setShareConfig, showShare, login。
- mincu-hooks
  封装了一些适用于 react 的 hooks，包括 useAppReady, useNativeState, useSafeArea。
- mincu-lib
  共享库，包含了 constant 及 utils。
- mincu-network
  基于 axios 封装的网络库，主要增加了请求拦截器，刷新 token 等功能。
- mincu-ui
  封装了与原生界面显示有关的调用，包括 Toast, StatusBar Style, Header 标题栏, toScreen 跳转, exit 退出。
  
### presets

- mincu-vanilla
  依赖了 mincu-core,  mincu-data, mincu-event, mincu-network, mincu-ui
- mincu-react
  依赖了 mincu-vanilla, mincu-hooks

它们都可以单独地引入到你的项目中使用。你可以根据你的需求引入所需要的依。

## 贡献指南

### 项目初始化

```cmd
$ git clone https://github.com/ncuhome/mincu # or clone your fork
$ cd mincu
$ yarn # or npm
$ yarn lerna bootstrap # or npx lerna bootstrap
$ yarn start # or npm run start
# then start coding in packages/*
```

### 运行示例

```cmd
$ cd example/vanilla-ts
$ yarn start
```

其他示例见 [example](./example)，也可参考 [使用到的项目](#使用到的项目)

### 添加依赖

```cmd
$ npx lerna add xxx packages/*
```

更详细的用法见 [@lerna/add](https://github.com/lerna/lerna/tree/main/commands/add#readme)

## 使用到的项目

- 返校报到（学生端）- [ncuhome/back-home](https://github.com/ncuhome/back-home) 
- 家园工作室秋季新生招新页面 - [ncuhome/hr2019_fe_to_fresher](https://github.com/ncuhome/hr2019_fe_to_fresher/)
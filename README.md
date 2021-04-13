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

```
npm install mincu
```

或者

```
yarn add mincu
```

### 引入

```typescript
import { useLogin } from 'mincu'

const App = () => {
  // 使用 App 端登录并获取是否初始化 Web 容器状态
  // useLogin 是一个组合 hook
  // 里面包含 useAppReady 和登录状态获取并存储的逻辑
  const { isReady } = useLogin()

  if (isReady) {
    ;<div>Loading</div>
  }

  return <div>Thank you for using mincu</div>
}
```

### 接收 Native -> Web 通信方法

```typescript
import { useNativeState } from 'mincu'

const App = () => {
  // 使用 Native 对 Web 的通信实现颜色主题状态共享
  // 接收 Native 端已注册的可共享状态的变化
  const colorScheme = useNativeState('colorScheme')

  if (isReady) {
    ;<div>Loading</div>
  }

  return <div>Current Theme is {colorScheme}</div>
}
```

### Web -> Native 通信方法

这种方法更加常用一些

```typescript
import { networkModule } from 'mincu'

const App = () => {
  const refreshToken = async () => {
    // 向 Native 通信，并获取 Native 端的返回值
    const token = await networkModule.refreshToken()
    alert(token)
  }

  if (isReady) {
    ;<div>Loading</div>
  }

  return <button onClick={refreshToken}></button>
}
```

## 记录遇到的错误及解决方案

### 无法引入外部 hooks

由于目前 mincu 主包和 next 样例引入的 react 是在不一样的 node_modules 里，所以会报错：

`hooks can only be called inside the body of a function component`

解决方法：https://dev.to/yvonnickfrin/how-to-handle-peer-dependencies-when-developing-modules-18fa

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

6. ...

## 迭代计划

1. 集成更多原生功能

2. vue-spa example

3. 【RFC】基于 lerna.js 将 packages 分包

4. 脚手架能力

5. 考虑将原生代码同样集成于本仓库

6. 白名单系统

7. ...

## 使用说明

等待补充

## 记录遇到的错误及解决方案

### 无法引入外部 hooks

由于目前 mincu 主包和 next 样例引入的 react 是在不一样的 node_modules 里，所以会报错：

`hooks can only be called inside the body of a function component`

解决方法：https://dev.to/yvonnickfrin/how-to-handle-peer-dependencies-when-developing-modules-18fa

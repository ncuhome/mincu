# Changelog

## 2.7.0

- **refactor** `mincu-vanilla` exports `mincu` that include all variables from `mincuCore`, `networkModule`, `uiModule`, `dataModule`, `eventModule`

  ```ts
  interface Mincu
    extends MincuCoreBase,
      DataModule,
      EventModule,
      NetWorkModule,
      UIModule {}

  export const mincu = Object.assign(
    {},
    eventModule,
    dataModule,
    uiModule,
    networkModule,
    mincuCore
  ) as Mincu
  ```

  ```js
  import { mincu } from 'mincu-vanilla'
  // or
  import { mincu } from 'mincu-react'
  ```

- **feat** `mincu-debug` integrated with [mincu-chii](https://github.com/ncuhome/chii) (forked from [chii](https://github.com/liriliri/chii))
  With `connect()`

  ```js
  import debug from 'mincu-debug';
  debug.connect();
  ```

- **feat** `mincu-data` add native storage support

  ```js
  import data from 'mincu-data'
  data.storage.setItem('test', 'mincu v2.7')

  const got = await data.storage.getItem('test')
  console.log(got)
  // mincu v2.7
  ```

  ```ts
  export declare class MincuStorage {
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
    removeItem(key: string): Promise<void>;
    remove(key: string): Promise<void>;
    reset(): Promise<void>;
  }
  ```

- **deprecated** `mincu-network` remove axios as dependency for smaller bundle size, deprecated `networkModule.fetch(...)` instead of `useAxiosInterceptors(...)`

  ```js
  class NetworkModule {
    /**
     * @deprecated
     * networkModule.useAxiosInterceptors is for your need
     */
    fetch: any

    axiosInterceptors = () => ({
      request: (config: AxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = this.getAuthorization(this.token)
        }
        return config
      },
      response: (response: AxiosResponse) => response,
      error: this.handleTokenExpired,
    })

    /**
     * @exmaple
     * const fetcher = axios.create()
     * networkModule.useAxiosInterceptors(fetcher)
     */
    useAxiosInterceptors(axiosInstance: AxiosInstance) {
      const interceptors = this.axiosInterceptors()
      axiosInstance.interceptors.request.use(interceptors.request)
      axiosInstance.interceptors.response.use(
        interceptors.response,
        interceptors.error
      )
    }
  }
  ```

## 2.6.1

- **fix** should build before release

## 2.6.0

- **feat** 新增 `<Ready />` 组件，用法与 `<ReadySSR />` 一致。以及他们的 fallback 参数增加了默认值：

  ```tsx
  export const Fallback = () => (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
      }}
    >
      <span>请在南大家园中打开😊</span>
    </div>
  )
  ```

## 2.5.0

- **chores** 升级依赖，添加 example/* 至 workspace
  
## 2.4.1

- **fix** mincu-hooks useReady `Error: reject is not a function`

## 2.4.0

- **feat** mincu-react 添加 `ReadySSR` 组件，封装了在 nextjs SSR 环境下使用 useAppReady 判断的逻辑，避免 `Unhandled Runtime Error: Hydration failed……`(参考 [https://github.com/vercel/next.js/discussions/35773]) 用法类似 react 的 Suspense，如：
  
  ```tsx
  <ReadySSR fallback={<div>Loading...</div>}>
    <Component {...pageProps} />
  </ReadySSR>
  ```

## 2.0.0

- **breaking** 迁移至 monorepo，原来的 `mincu` 包替换为 `mincu-react`, `mincu-vanilla` 等多个独立包
- **feat** mincu-debug 包，提供调试功能

## 1.0.5

- **fix** 修复 isReady 错误初始值的问题
- **feat** 增加 StatusBar 函数（5.3）

## 1.0.4

- **fix** 修复加载数据失败的问题

## 1.0.3

- **feat** 添加 login 方法

- **feat** 添加 useAppReady、useSafeArea 钩子

- **fix** 添加默认 userData

## 1.0.2

- **fix** 修复端外蜜汁报错

## 1.0.1

- **feat** 提供 api 文档

- **fix** 优化类型定义

- **fix** 修复 `hooks` 失效的问题

## 1.0.0

- **feat** initial

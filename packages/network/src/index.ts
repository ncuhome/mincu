import mincuCore from 'mincu-core'
import dataModule from 'mincu-data'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type failedItem = {
  resolve: (value: unknown) => any
  reject: (value: unknown) => any
}

type ResToken = {
  data: {
    token: string
  }
}

export class NetWorkModule {
  private failedQueue: failedItem[] = []
  private isRefreshing = false

  public token: string = ''
  public fetch = axios.create()

  static Instance() {
    return new NetWorkModule()
  }

  constructor(config?: AxiosRequestConfig) {
    this.token = dataModule.appData.user.token || ''

    this.fetch = axios.create(config)
    this.fetch.defaults.timeout = 7000

    /** 设置 axios 拦截器 */
    const interceptors = {
      request: (config: AxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = this.getAuthorization(this.token)
        }
        return config
      },
      response: (response: AxiosResponse) => response,
      error: this.handleTokenExpired,
    }

    /** 初始化 axios 拦截器 */
    this.fetch.interceptors.request.use(interceptors.request)
    this.fetch.interceptors.response.use(
      interceptors.response,
      interceptors.error
    )
  }

  private setToken = (token: string) => {
    this.token = token
    localStorage.setItem('token', token)
  }

  /**
   * 从浏览器缓存中拿取 token
   *
   * 一般放在该组件挂载 (渲染) 阶段结束后执行
   *
   * @returns 取出缓存中的 token
   */
  public getStoredToken() {
    this.token = localStorage.getItem('token') ?? ''
    return this.token
  }

  private getAuthorization(token: string) {
    return `passport ${token}`
  }

  /** 错误处理方法 */
  private handleTokenExpired = (error: any) => {
    const { response } = error
    const originalRequest = error?.config

    if (response?.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject })
        })
          .then((token: string) => {
            originalRequest.headers['Authorization'] =
              this.getAuthorization(token)
            return this.fetch(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      this.isRefreshing = true

      return new Promise((resolve, reject) => {
        this.refreshToken()
          .then((token) => {
            this.fetch.defaults.headers.common['Authorization'] =
              this.getAuthorization(token)
            originalRequest.headers['Authorization'] =
              this.getAuthorization(token)
            this.processQueue(null, token)
            resolve(this.fetch(originalRequest))
          })
          .catch((err) => {
            this.processQueue(err)
            reject(err)
          })
          .finally(() => {
            this.isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  }

  /** 处理错误请求队列 */
  private processQueue = (error: any, token = null) => {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })

    this.failedQueue = []
  }

  /**
   * 刷新 token 函数
   *
   * @returns 返回一个新 token 的 Promise 对象
   */
  public async refreshToken(): Promise<string> {
    return new Promise((resolve) => {
      mincuCore.call('Auth', 'refreshToken', null, (res: ResToken) => {
        const token = res.data?.token

        /**重新刷新 token 缓存和内存 */
        this.setToken(token)

        /**传出 token */
        resolve(token ?? '')
      })
    })
  }
}

export default NetWorkModule.Instance()

import mincuCore from 'mincu-core'
import dataModule from 'mincu-data'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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

  /**
   * @deprecated
   * networkModule.useAxiosInterceptors is for your need
   */
  public fetch: any

  static Instance() {
    return new NetWorkModule()
  }

  constructor() {
    this.token = dataModule.appData.user.token || ''
  }

  public axiosInterceptors = () => ({
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
  public useAxiosInterceptors(axiosInstance: AxiosInstance) {
    const interceptors = this.axiosInterceptors()
    axiosInstance.interceptors.request.use(interceptors.request)
    axiosInstance.interceptors.response.use(
      interceptors.response,
      interceptors.error
    )
  }

  private setToken = (token: string) => {
    this.token = token
  }

  /**
   * @deprecated should not use
   */
  public getStoredToken() {}

  private getAuthorization(token: string) {
    return `passport ${token}`
  }

  /** 错误处理方法 */
  private handleTokenExpired = (error: any) => {
    const { response } = error
    const originalRequest = error?.config

    const mayExpired = response?.status === 401 || response?.status === 400

    if (mayExpired && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject })
        })
          .then((token: string) => {
            originalRequest.headers['Authorization'] =
              this.getAuthorization(token)
            return originalRequest
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
            originalRequest.headers['Authorization'] =
              this.getAuthorization(token)
            this.processQueue(null, token)
            resolve(originalRequest)
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

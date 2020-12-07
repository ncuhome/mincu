import mincuCore from '../core'
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

  public token: string = localStorage.getItem('token')
  public fetch = axios.create()

  static Instance() {
    return new NetWorkModule()
  }

  constructor(config?: AxiosRequestConfig) {
    this.fetch = axios.create(config)

    /**设置 axios 拦截器 */
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

    /**初始化 axios 拦截器 */
    this.fetch.interceptors.request.use(interceptors.request);
    this.fetch.interceptors.response.use(interceptors.response, interceptors.error);
  }

  private setToken = (token: string) => {
    this.token = token
    localStorage.setItem('token', token)
  }

  private getAuthorization(token: string) {
    return `passport ${token}`
  }

  /**错误处理方法 */
  private handleTokenExpired = (error: any) => {
    const { response: { status } } = error;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers['Authorization'] = `passport ${token}`
          return this.fetch(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true
      this.isRefreshing = true

      return new Promise((resolve, reject) => {
        this.refreshToken()
          .then((token) => {
            this.fetch.defaults.headers.common['Authorization'] = `passport ${token}`;
            originalRequest.headers['Authorization'] = `passport ${token}`;
            this.processQueue(null, token);
            resolve(this.fetch(originalRequest));
          })
          .catch((err) => {
            this.processQueue(err);
            reject(err);
          })
          .finally(() => {
            this.isRefreshing = false
          })
      })
    }

    return Promise.reject(error);
  }

  /**处理错误请求队列 */
  private processQueue = (error: any, token = null) => {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })

    this.failedQueue = [];
  }

  public async refreshToken(): Promise<string> {
    return new Promise((resolve) => {
      mincuCore.call("Auth", "refreshToken", null,
        (res: ResToken) => {
          const token = res.data?.token

          /**重新刷新 token 缓存和内存 */
          this.setToken(token)

          /**传出 token */
          resolve(token ?? '')
        }
      )
    })
  }
}

export default NetWorkModule.Instance()
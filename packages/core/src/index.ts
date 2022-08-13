import { channelGenerator, EventMap } from './channel'
import { FuncNames, INativeFuncs, AppData } from './interface'
import { _window, noop } from 'mincu-lib'
import { EventEmitter } from 'events'

export * from './interface'
export * from './channel'

type ParamType<T> = T extends (...args: infer U) => any ? U : never
type CallReturnType<T> = T extends (...args: any[]) => infer R ? R : T

/**
 * 目前支持 web 和 native 的双向通信
 */
export class MincuCoreBase {
  private eventKey: number
  private eventMap: EventMap

  constructor(eventKey?: number, eventMap?: EventMap) {
    this.eventKey = eventKey
    this.eventMap = eventMap

    channelGenerator(eventMap)
  }

  /**
   * 通过 userAgent 判断是否在 iNCU 环境
   * userAgent: iNCU.*
   */
  get isApp() {
    return _window?.navigator?.userAgent?.indexOf('iNCU') !== -1
  }

  /**
   * 与 App 端通信的消息通道
   */
  get messageChannel(): EventEmitter {
    return _window.RNMessageChannel
  }

  /**
   * 由 iNCU WebView 注入的来自 App 的数据
   */
  get appData(): AppData {
    return _window.appData
  }

  /**
   * App 端的 Webview JavaScriptInterface，用以向 App 端发送信息
   */
  get webview() {
    return _window.ReactNativeWebView
  }

  /**
   * 由 App 端注入的数据段，用以判断是否注入成功
   */
  get isReady() {
    return _window.appReady ?? false
  }

  initial = (
    resolve: (value?: unknown) => any,
    reject?: (value?: unknown) => any
  ) => {
    if (this.isReady) {
      resolve()
      return
    }

    // 轮询是否成功加载
    const scanner = setInterval(() => {
      if (this.isReady) {
        clearInterval(scanner)
        resolve()
        return
      }
    }, 50)

    // 5 秒超时
    setTimeout(() => {
      if (!this.isReady) {
        clearInterval(scanner)
        reject?.()
      }
    }, 5000)
  }

  /**
   * 添加一个原生事件监听器
   * */
  listener = (eventName: string, fn: (data) => any) => {
    return this.messageChannel?.on(`event-${eventName}`, fn)
  }

  /**
   * 添加一个原生事件监听器 (监听一次后立即销毁)
   * */
  once = (eventName: string, fn: (data) => any) => {
    return this.messageChannel?.once(`event-once-${eventName}`, fn)
  }

  /**
   * 移除某个原生事件监听器
   * */
  remove = (eventName: string, fn: (data) => any) => {
    this.messageChannel?.removeListener(`event-${eventName}`, fn)
  }

  /**
   * 主动请求并触发客户端事件
   */
  call = <Class extends FuncNames, Method extends keyof INativeFuncs[Class]>(
    baseClass: Class,
    method: Method,
    params: ParamType<INativeFuncs[Class][Method]>,
    success: (res?: {
      data: CallReturnType<INativeFuncs[Class][Method]>
    }) => any = noop,
    failed: (...args: any[]) => void = noop
  ) => {
    this.eventKey += 1
    this.eventMap[this.eventKey] = { success, failed }

    const data = {
      baseClass,
      method,
      params: params || [],
      key: this.eventKey,
      type: 'call',
    }

    this.webview?.postMessage(JSON.stringify(data))
  }

  callPromise = <
    Class extends FuncNames,
    Method extends keyof INativeFuncs[Class]
  >(
    baseClass: Class,
    method: Method,
    params: ParamType<INativeFuncs[Class][Method]>
  ) => {
    return new Promise<CallReturnType<INativeFuncs[Class][Method]>>(
      (resolve, reject) => {
        mincuCore.call(
          baseClass,
          method,
          params,
          (res) => {
            resolve(res.data)
          },
          reject
        )
      }
    )
  }
}

const mincuCore = new MincuCoreBase(0, {})

export default mincuCore

import { channelGenerator, EventMap } from './channel'
import { FuncNames, INativeFuncs, AppData } from './interface'
import { _window, noop } from 'mincu-lib'
import { EventEmitter } from 'events'

export * from './interface'
export * from './channel'
/**
 * 目前支持 web 和 native 的双向通信
 */
class MincuCoreBase {
  private eventKey: number
  private eventMap: EventMap

  constructor(eventKey?: number, eventMap?: EventMap) {
    this.eventKey = eventKey
    this.eventMap = eventMap

    channelGenerator(eventMap)
  }

  get isApp() {
    return _window?.navigator?.userAgent?.indexOf('iNCU') !== -1
  }

  get messageChannel(): EventEmitter {
    return _window.RNMessageChannel
  }

  get appData(): AppData {
    return _window.appData
  }

  get webview() {
    return _window.ReactNativeWebView
  }

  get isReady() {
    return _window.appReady ?? false
  }

  initial = (resolve: (value?: unknown) => any, reject: (value?: unknown) => any) => {
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

    // 1秒超时
    setTimeout(() => {
      if (!this.isReady) {
        clearInterval(scanner)
        reject()
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
   * */
  call = <T extends FuncNames, B extends keyof INativeFuncs[T]>(
    baseClass: T,
    method: B,
    params = [],
    success: (data?: any) => any = noop,
    failed = noop
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
}

const mincuCore = new MincuCoreBase(0, {})

export default mincuCore

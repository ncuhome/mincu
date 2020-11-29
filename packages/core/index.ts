import { noop } from 'lodash'
import { channelGenerator } from './channel'
import { MincuCoreInstanceType, FuncNames } from './interface'
import { _window } from '../../lib/utils'

/* 目前支持 web 和 native 的双向通信 **/
class MincuCoreBase implements MincuCoreInstanceType {
  constructor(eventKey?: number, eventMap?: object) {
    this.eventKey = eventKey
    this.eventMap = eventMap

    channelGenerator(eventMap)
  }

  private eventKey: number
  private eventMap: object

  get isApp() {
    return _window?.navigator?.userAgent?.indexOf('iNCU') !== -1
  }

  get appData() {
    if (!_window.appReady) {
      console.log('请在 App 数据加载完成后，调用该方法')
    }

    return _window.appData
  }

  // 添加一个原生事件监听器
  listener = (eventName: string, fn: (data) => any) => {
    return _window.RNMessageChannel?.on(`event-${eventName}`, fn)
  }

  // 移除某个原生事件监听器
  remove = (eventName: string, fn: (data) => any) => {
    window.RNMessageChannel?.removeListener(`event-${eventName}`, fn)
  }

  // 请求并触发客户端事件
  call = (
    baseClass: FuncNames,
    method: string,
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
      type: 'call'
    }

    _window.ReactNativeWebView?.postMessage(JSON.stringify(data))
  }
}

const mincuCore = new MincuCoreBase(0, {})

export default mincuCore
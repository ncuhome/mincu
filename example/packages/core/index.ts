import { noop } from 'lodash'
import { channelGenerater } from './channel'
import { MincuCoreInstanceType, FuncNames } from './interface'
import { EventEmitter } from 'events'

/* 目前只支持单项通信（ Web -> Native ） **/
class MincuCoreBase implements MincuCoreInstanceType {
  constructor(eventKey?: number, eventMap?: object) {
    this.eventKey = eventKey
    this.eventMap = eventMap

    channelGenerater(eventMap)
  }

  private eventKey: number
  private eventMap: object

  get isApp() {
    return window?.navigator?.userAgent?.indexOf('iNCU') !== -1
  }

  get appData() {
    if (!window.appReady) {
      console.log('请在 App 数据加载完成后，调用该方法')
    }

    return window.appData
  }

  channelGenerater(eventMap: object) {
    window.RNMessageChannel = new EventEmitter()

    window.RNMessageChannel.on('call', (message) => {
      const {
        key,
        status,
        data
      } = message || {}

      const {
        success,
        failed
      } = eventMap[key]

      if (status === 'success') {
        success(data)
      } else {
        failed(data)
      }
    })
  }

  call = (
    baseClass: FuncNames,
    method: string,
    params: any,
    success: any = noop,
    failed = noop
  ) => {
    this.eventKey += 1
    this.eventMap[this.eventKey] = { success, failed }

    const data = {
      baseClass,
      method,
      params,
      key: this.eventKey,
      type: 'call'
    }

    window?.ReactNativeWebView?.postMessage && window.ReactNativeWebView.postMessage(JSON.stringify(data), '*')
  }
}

const mincuCore = new MincuCoreBase(0, {})

export default mincuCore
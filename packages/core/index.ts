import { noop } from '@lib/utils'
import { channelGenerater } from './channel'
import { MincuCoreInstanceType, FuncNames } from './interface'

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

  onAppReady = (callback = noop) => {
    if (window.appReady === true) {
      callback()
      return
    }

    const scanner = setInterval(() => {
      if (window.appReady === true) {
        clearInterval(scanner)
        callback()
      }
    }, 10)
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

    window?.postMessage(JSON.stringify(data), 'Webview')
  }
}

const mincuCore = new MincuCoreBase(0, {})

export default mincuCore
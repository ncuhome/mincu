import mincuCore from 'mincu-core'
import { NavConfig } from 'mincu-core'
import type { StatusBarStyle } from 'react-native'

export class UIModule {
  static Instance() {
    return new UIModule()
  }

  info(title: string, during: number = 1) {
    mincuCore.call('Toast', 'info', [title, during])
  }

  async loading(title: string, during: number = 1): Promise<() => void> {
    return new Promise((resolve) => {
      mincuCore.call('Toast', 'loading', [title, during], (res) => {
        resolve(() => {
          this.removeToast(res.data)
        })
      })
    })
  }

  success(title: string, during: number = 1) {
    mincuCore.call('Toast', 'success', [title, during])
  }

  fail(title: string, during: number = 1) {
    mincuCore.call('Toast', 'fail', [title, during])
  }

  removeToast(key: number) {
    mincuCore.call('Portal', 'remove', [key])
  }

  setBarStyle(style: StatusBarStyle) {
    mincuCore.call('StatusBar', 'setBarStyle', [style])
  }

  handleShowHeader(value: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      mincuCore.call('Webview', 'handleShowHeader', [value], (res) => {
        resolve(res.data)
      })
    })
  }

  toScreen(config: NavConfig) {
    mincuCore.call('Webview', 'toScreen', [config])
  }

  exit() {
    mincuCore.call('Webview', 'exitWebView', null, () => {
      console.log('退出微应用')
    })
  }

  /**
   * 绑定原生返回事件
   * 目前的限制：只有当 App 的 Header 已显示时才能绑定原生返回事件，才会触发返回回调，防止用户无法退出 WebView 页面
   * const cb = () => {}
   * const unbind = uiModule.bindBackPress(cb)
   * // 取消绑定
   * unbind()
   * // 或者
   * uiModule.unBindBackPress(cb)
   * @param hitCb 触发返回事件时的回调
   * @param bindCb 绑定结果，成功或失败
   */
  bindBackPress(hitCb: () => void, bindCb?: (success: boolean) => void) {
    mincuCore.call(
      'Webview',
      'bindBackPress',
      [true],
      () => {
        bindCb?.(true)
        mincuCore.listener('back-press', hitCb)
      },
      () => {
        console.error('绑定原生返回事件失败， 请先显示 header')
        bindCb?.(false)
      }
    )
    return () => {
      this.unBindBackPress(hitCb)
    }
  }

  bindBackPressPromise(hitCb: () => void): Promise<boolean> {
    return new Promise((resolve) => {
      this.bindBackPress(hitCb, (success) => {
        resolve(success)
      })
    })
  }

  /**
   * 取消绑定原生返回事件
   */
  unBindBackPress(cb: () => void) {
    mincuCore.call('Webview', 'bindBackPress', [false], () => {
      mincuCore.remove('back-press', cb)
    })
  }
}

export default UIModule.Instance()

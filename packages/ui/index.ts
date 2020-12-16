import mincuCore from '@core/index'
import { NavConfig } from '@core/interface'

class UIModule {
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
}

export default UIModule.Instance()

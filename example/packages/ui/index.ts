import mincuCore from '../core'

interface NavConfig {
  screen: string
  params?: object
}

class UIModule {
  static Instance() {
    return new UIModule()
  }

  alert() {

  }

  async handleShowHeader(value: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Webview",
        "handleShowHeader",
        value,
        (res) => {
          resolve(res.data)
        }
      )
    })
  }

  async toScreen(config: NavConfig): Promise<void> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Webview",
        "toScreen",
        config,
        () => {
          resolve()
        }
      )
    })
  }
}

export default UIModule.Instance()
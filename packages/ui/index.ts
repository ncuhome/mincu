import mincuCore from '../core'

interface NavConfig {
  screen: string
  params?: object
}

class UIModule {
  static Instance() {
    return new UIModule()
  }

  info(title: string, during: number = 1) {
    mincuCore.call("Toast", "info", [title, during])
  }

  async loading(title: string, during: number = 1) {
    return new Promise((resolve) => {
      mincuCore.call(
        "Toast",
        "loading",
        [title, during],
        (res) => {
          resolve(res.data)
        }
      )
    })
  }

  success(title: string, during: number = 1) {
    mincuCore.call("Toast", "success", [title, during])
  }

  fail(title: string, during: number = 1) {
    mincuCore.call("Toast", "fail", [title, during])
  }

  handleShowHeader(value: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Webview",
        "handleShowHeader",
        [value],
        (res) => {
          resolve(res.data)
        }
      )
    })
  }

  toScreen(config: NavConfig) {
    mincuCore.call("Webview", "toScreen", [config])
  }
}

export default UIModule.Instance()
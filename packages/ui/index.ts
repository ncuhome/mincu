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
    return new Promise((resolve) => {
      mincuCore.call(
        "Toast",
        "info",
        [title, during],
        (res) => {
          resolve(res.data)
        }
      )
    })
  }

  success(title: string, during: number = 1) {
    return new Promise((resolve) => {
      mincuCore.call(
        "Toast",
        "success",
        [title, during],
        (res) => {
          resolve(res.data)
        }
      )
    })
  }

  fail(title: string, during: number = 1) {
    return new Promise((resolve) => {
      mincuCore.call(
        "Toast",
        "fail",
        [title, during],
        (res) => {
          resolve(res.data)
        }
      )
    })
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
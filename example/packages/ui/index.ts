import mincuCore from '../core'

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
}

export default UIModule.Instance()
import mincuCore from '../core'

class EventModule {
  static Instance() {
    return new EventModule()
  }

  openUrl(url: string) {
    mincuCore.call("Linking", "openURL", url, () => {
      console.log(`${url} 已打开`)
    })
  }

  async refreshToken(): Promise<{ token: string }> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Auth",
        "refreshToken",
        null,
        (res: { data: { token: string } }) => {
          resolve(res.data)
        }
      )
    })
  }

  async exit(): Promise<any> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Webview",
        "exitWebView",
        null,
        () => {
          console.log('退出微应用')
          resolve()
        }
      )
    })
  }

  share() {

  }
}

export default EventModule.Instance()
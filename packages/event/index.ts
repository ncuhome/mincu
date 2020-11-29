import mincuCore from '../core'

interface ShareConfig {
  title?: string
  url?: string
  imageUrl?: string
}

class EventModule {
  static Instance() {
    return new EventModule()
  }

  openUrl(url: string) {
    mincuCore.call("Linking", "openURL", [url], () => {
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

  async setShareConfig(config: ShareConfig): Promise<void> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Share",
        "setShareConfig",
        [config],
        () => {
          console.log('配置分享设置')
          resolve()
        }
      )
    })
  }

  async showShare(): Promise<void> {
    return new Promise((resolve) => {
      mincuCore.call(
        "Share",
        "openShareMenu",
        null,
        () => {
          console.log('打开分享弹框')
          resolve()
        }
      )
    })
  }
}

export default EventModule.Instance()
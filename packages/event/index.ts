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

  // 通过浏览器打开 Web 页面
  openUrl(url: string) {
    mincuCore.call('Linking', 'openURL', [url], () => {
      console.log(`${url} 已打开`)
    })
  }

  exit() {
    mincuCore.call('Webview', 'exitWebView', null, () => {
      console.log('退出微应用')
    })
  }

  setShareConfig(config: ShareConfig) {
    mincuCore.call('Share', 'setShareConfig', [config], () => {
      console.log('配置分享设置')
    })
  }

  showShare() {
    mincuCore.call('Share', 'openShareMenu', null, () => {
      console.log('打开分享弹框')
    })
  }
}

export default EventModule.Instance()

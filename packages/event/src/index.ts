import mincuCore from 'mincu-core'
import { ShareConfig } from 'mincu-core'

class EventModule {
  static Instance() {
    return new EventModule()
  }

  /**
   * 通过系统默认浏览器打开 Web 页面
   *
   * 主要适配一些端内转端外场景和 deeplink
   *
   * @param url - 要跳转的链接
   */
  openUrl(url: string) {
    mincuCore.call('Linking', 'openURL', [url], () => {
      console.log(`${url} 已打开`)
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

  login(username: string, password: string) {
    mincuCore.call('Auth', 'login', [{ username, password }], () => {
      console.log('登录')
    })
  }
}

export default EventModule.Instance()

import mincuCore from '../core'
import { ColorSchemeName, AppData, EdgeInsets } from '../core/interface'

class DataModule {
  static Instance() {
    return new DataModule()
  }

  get colorScheme(): ColorSchemeName {
    return mincuCore.appData.user.colorScheme
  }

  get isDark() {
    return this.colorScheme === 'dark'
  }

  get userInfo(): AppData['user'] {
    return mincuCore.appData.user
  }

  get colors() {
    return mincuCore.appData.user.colors
  }

  get inset(): EdgeInsets {
    return mincuCore.appData.user.inset
  }

  async getVersion(): Promise<string> {
    return new Promise((resolve) => {
      mincuCore.call(
        "DeviceInfo",
        "getVersion",
        null,
        (res) => {
          resolve(res.data)
        }
      )
    })
  }
}

export default DataModule.Instance()
import mincuCore from 'mincu-core'
import { AppData, EdgeInsets } from 'mincu-core'
import { defaultUserData } from 'mincu-lib'

class DataModule {
  static Instance() {
    return new DataModule()
  }

  get isDark() {
    return this.colorScheme === 'dark'
  }

  get appData() {
    if (!mincuCore.appData) {
      return {
        user: defaultUserData,
      } as AppData
    }
    return mincuCore.appData
  }

  get isApp() {
    return mincuCore.isApp
  }

  get userInfo(): AppData['user'] {
    return this.appData.user
  }

  get colors() {
    return this.appData.user.colors
  }

  get colorScheme() {
    return this.appData.user.colorScheme
  }

  get inset(): EdgeInsets {
    return this.appData.user.inset
  }

  async getVersion(): Promise<string> {
    return new Promise((resolve) => {
      mincuCore.call('DeviceInfo', 'getVersion', null, (res) => {
        resolve(res.data)
      })
    })
  }
}

export default DataModule.Instance()

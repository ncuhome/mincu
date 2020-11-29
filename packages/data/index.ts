import mincuCore from '../core'

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

  get version() {
    return '5.0'
  }


}

export default DataModule.Instance()
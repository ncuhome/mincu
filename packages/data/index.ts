// import mincuCore from '../core'

class DataModule {
  static Instance() {
    return new DataModule()
  }

  // TODO
  get isDark() {
    return true
  }

  get userInfo() {
    return {}
  }

  get version () {
    return '5.0'
  }

  
}

export default DataModule.Instance()
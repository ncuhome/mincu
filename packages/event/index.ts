import mincuCore from '@packages/core/index'

class EventModule {
  static Instance() {
    return new EventModule()
  }

  openUrl(url: string) {
    mincuCore.call("Linking", "openURL", url, () => {
      console.log(`${url} 已打开`)
    })
  }

  openScreen<T extends keyof Navigation.StackParamList>(screenName: T, param?: Navigation.StackParamList[T]) {
    let value = `incu://${screenName}`
    if (param && Object.keys(param).length) {
      Object.keys(param).forEach((item, index) => {
        let fi = '&'
        if (index === 0) {
          fi = '?'
        }
        value += fi + `${item}=${param[item]}`
      })
    }
    mincuCore.call("Linking", "openURL", value, () => {
      console.log(`${screenName} 已打开`)
    })
  }

  async fetch(method, url: string, params) {
    
  }

  share() {

  }
}

export default EventModule.Instance()
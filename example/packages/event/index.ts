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

  share() {

  }
}

export default EventModule.Instance()
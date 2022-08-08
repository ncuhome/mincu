import mincuCore from 'mincu-core'

export const backPress = {
  /**
   * 绑定原生返回事件
   * 目前的限制：只有当 App 的 Header 已显示时才能绑定原生返回事件，才会触发返回回调，防止用户无法退出 WebView 页面
   * const cb = () => {}
   * const unbind = uiModule.backPress.bind(cb)
   * // 取消绑定
   * unbind()
   * // 或者
   * uiModule.backPress.unbind(cb)
   * @param cb 触发返回事件时的回调
   * @param onResulst 绑定结果，成功或失败
   */
  bind: (cb: () => void, onResulst?: (success: boolean) => void) => {
    mincuCore.call(
      'Webview',
      'bindBackPress',
      [true],
      () => {
        onResulst?.(true)
        mincuCore.listener('back-press', cb)
      },
      () => {
        console.error('绑定原生返回事件失败， 请先显示 header')
        onResulst?.(false)
      }
    )
    return () => {
      backPress.unbind(cb)
    }
  },
  /**
   * 取消绑定原生返回事件
   */
  unbind: (cb: () => void) => {
    mincuCore.call('Webview', 'bindBackPress', [false], () => {
      mincuCore.remove('back-press', cb)
    })
  },
}

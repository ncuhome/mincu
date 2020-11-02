import { LinkingStatic } from 'react-native'

export type FuncNames = keyof INativeFuncs

export interface INativeFuncs {
  Linking: LinkingStatic,
  NetInfo,
  Auth: {
    refreshToken: () => { token: string }
  },
  DeviceInfo,
  Clipboard,
  Vibration,
  ToastAndroid,
  Toast,
  Share,
  Webview: {
    handleShowHeader: (value?: boolean) => boolean, // TODO:5.5
    disableAutoSetTitle: () => void
  }
}

export interface MincuCoreInstanceType {
  isApp: boolean
  onAppReady: (callback?: () => void) => void
  appData: AppData
  call: (
    baseClass: FuncNames,
    method: any,
    params: any,
    success: () => void,
    failed: () => void
  ) => void
}

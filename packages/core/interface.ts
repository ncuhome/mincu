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
  Webview
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

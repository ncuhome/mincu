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
    handleShowHeader: (value?: boolean) => boolean,
    disableAutoSetTitle: () => void
  }
}

export interface MincuCoreInstanceType {
  isApp: boolean
  appData: AppData
  call: (
    baseClass: FuncNames,
    method: any,
    params: any,
    success: () => void,
    failed: () => void
  ) => void
}

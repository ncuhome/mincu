export * from './types/ncuos'
export * from './types/rn'

import { Base_info } from './types/ncuos'
import {
  RNLinking,
  ToastAndroidStatic,
  StatusBarStyle,
  NetInfo,
  DeviceInfo,
  Clipboard,
  VibrationStatic,
} from './types/rn'

export type FuncNames = keyof INativeFuncs

export type States = {
  colors: any
  colorScheme: ColorSchemeName
}

export interface INativeFuncs {
  Linking: RNLinking
  NetInfo: NetInfo
  Auth: {
    refreshToken: () => { token: string }
    login: (data: { username: string; password: string }) => number
  }
  DeviceInfo: DeviceInfo
  Clipboard: Clipboard
  Vibration: VibrationStatic
  ToastAndroid: ToastAndroidStatic
  Toast: {
    [key: string]: (title: string, during: number) => number
  }
  StatusBar: {
    setBarStyle: (style: StatusBarStyle, animated?: boolean) => void
  }
  Portal: {
    remove: (id: number) => void
  }
  Share: {
    openShareMenu: () => void
    setShareConfig: (config: ShareConfig) => void
  }
  Webview: {
    handleShowHeader: (value?: boolean) => boolean
    disableAutoSetTitle: () => void
    exitWebView: () => void
    toScreen: (e: NavConfig) => void
    bindBackPress: (value: boolean) => void
  }
  Storage: {
    getItem: (key: string) => any
    setItem: (key: string, value: any) => void
    remove: (key: string) => void
    reset: () => void
  }
}

export interface ShareConfig {
  title?: string
  url?: string
  imageUrl?: string
}

export interface NavConfig {
  screen: string
  params?: object
}

export interface AppData {
  user: {
    token: string
    colorScheme: ColorSchemeName
    colors: any
    inset: EdgeInsets
    profile: {
      basicProfile: {
        app_avatar_url: string | null
        department: string
        department_id: string
        head_pic_url: string
        max_role_level: number
        message: string
        name: string
        status: number
      }
      entireProfile: IEntireProfileResponse
    }
  }
}

export interface EdgeInsets {
  top: number
  right: number
  bottom: number
  left: number
}

export type ColorSchemeName = 'light' | 'dark' | null | undefined

export interface EdgeInsets {
  top: number
  right: number
  bottom: number
  left: number
}

interface IEntireProfileResponse {
  base_info: Base_info
  is_teacher: boolean
  message: string
  status: number
}

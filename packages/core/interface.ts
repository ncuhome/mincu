import { LinkingStatic, ToastAndroidStatic } from 'react-native'
import { Base_info } from './base_type'

export type FuncNames = keyof INativeFuncs

export type States = {
  colors: any
  colorScheme: ColorSchemeName
}

export interface INativeFuncs {
  Linking: LinkingStatic
  NetInfo
  Auth: {
    refreshToken: () => { token: string }
  }
  DeviceInfo
  Clipboard
  Vibration
  ToastAndroid: ToastAndroidStatic
  Toast
  Portal: any
  Share
  Webview: {
    handleShowHeader: (value?: boolean) => boolean
    disableAutoSetTitle: () => void
    exitWebView: () => void
    toScreen: (e: NavConfig) => void
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

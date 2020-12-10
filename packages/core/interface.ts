import { LinkingStatic, ToastAndroidStatic } from 'react-native'

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

interface Csd {
  dm: string
  mc: string
}

interface Gb {
  dm: string
  mc: string
}

interface Jg {
  dm: string
  mc: string
}

interface Mz {
  dm: string
  mc: string
}

interface Pyf {
  dm: string
  mc: string
}

interface Xb {
  dm: string
  mc: string
}

interface Xslb {
  dm: string
  mc: string
}

interface Xx {
  dm: string
  mc: string
}

interface Zzmm {
  dm: string
  mc: string
}

interface Base_info {
  csd: Csd
  csrq: string
  dzyx: string
  gb: Gb
  jg: Jg
  jhkh: string
  mz: Mz
  pyfs: Pyf
  qq: string
  qsh: string
  rxny: string
  sfzh: string
  xb: Xb
  xh: string
  xm: string
  xslb: Xslb
  xx: Xx
  yddh: string
  zzmm: Zzmm
}

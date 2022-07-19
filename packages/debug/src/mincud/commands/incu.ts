import { openUrlSimulator } from './simulator'
import { openUrlAdb } from './adb'

export const iNCUScheme = (postfix: string) => `incu://${postfix}`

export const iNCUWebViewScheme = (url: string) =>
  iNCUScheme(`Webview?url=${url}`)

const openUrls = {
  android: openUrlAdb,
  ios: openUrlSimulator,
}

export type Platform = 'android' | 'ios'

/**
 * open url in iNCU Webview
 * @param url
 * @param platform 'android' | 'ios'
 * @returns boolean
 */
export const openUrl = async (url: string, platform: Platform) => {
  try {
    const openUrl = openUrls[platform]
    if (!openUrl) {
      throw new Error(`platform ${platform} not supported`)
    }
    await openUrl(iNCUWebViewScheme(url))
    return true
  } catch (e: any) {
    console.error(e.stderr ?? e)
    return false
  }
}

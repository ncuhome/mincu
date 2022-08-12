export * from './net_info'
export * from './device_info'
export * from './clipboard'

export interface RNLinking {
  /**
   * Try to open the given url with any of the installed apps.
   * You can use other URLs, like a location (e.g. "geo:37.484847,-122.148386"), a contact, or any other URL that can be opened with the installed apps.
   * NOTE: This method will fail if the system doesn't know how to open the specified URL. If you're passing in a non-http(s) URL, it's best to check {@code canOpenURL} first.
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   */
  openURL: (url: string) => Promise<any>

  /**
   * Determine whether or not an installed app can handle a given URL.
   * NOTE: For web URLs, the protocol ("http://", "https://") must be set accordingly!
   * NOTE: As of iOS 9, your app needs to provide the LSApplicationQueriesSchemes key inside Info.plist.
   * @param URL the URL to open
   */
  canOpenURL: (url: string) => Promise<boolean>

  /**
   * If the app launch was triggered by an app link with, it will give the link url, otherwise it will give null
   * NOTE: To support deep linking on Android, refer http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents
   */
  getInitialURL: () => Promise<string | null>

  /**
   * Open the Settings app and displays the app’s custom settings, if it has any.
   */
  openSettings: () => Promise<void>

  /**
   * Sends an Android Intent - a broad surface to express Android functions.  Useful for deep-linking to settings pages,
   * opening an SMS app with a message draft in place, and more.  See https://developer.android.com/reference/kotlin/android/content/Intent?hl=en
   */
  sendIntent(
    action: string,
    extras?: Array<{ key: string; value: string | number | boolean }>
  ): Promise<void>
}

export type StatusBarStyle = 'default' | 'light-content' | 'dark-content'

/**
 * This exposes the native ToastAndroid module as a JS module. This has a function 'show'
 * which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastAndroid.SHORT or ToastAndroid.LONG
 *
 * There is also a function `showWithGravity` to specify the layout gravity. May be
 * ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER
 */
export interface ToastAndroidStatic {
  /**
   * String message: A string with the text to toast
   * int duration: The duration of the toast.
   * May be ToastAndroid.SHORT or ToastAndroid.LONG
   */
  show: (message: string, duration: number) => void
  /** `gravity` may be ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER */
  showWithGravity: (message: string, duration: number, gravity: number) => void

  showWithGravityAndOffset: (
    message: string,
    duration: number,
    gravity: number,
    xOffset: number,
    yOffset: number
  ) => void
  // Toast duration constants
  SHORT: number
  LONG: number
  // Toast gravity constants
  TOP: number
  BOTTOM: number
  CENTER: number
}

export interface VibrationStatic {
  vibrate(pattern?: number | number[] | null, repeat?: boolean | null): void
  /**
   * Stop vibration
   */
  cancel(): void
}

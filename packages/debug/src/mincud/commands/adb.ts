/**
 * @reference https://github.com/expo/expo-cli/blob/master/packages/xdl/src/Android.ts
 */

import execa from 'execa'

const whichADB = () => {
  if (process.env.ANDROID_HOME) {
    return `${process.env.ANDROID_HOME}/platform-tools/adb`;
  }
  return 'adb';
}

export const getAdbOutputAsync = (args: string[]) => {
  const adb = whichADB();
  try {
    return execa(adb, args);
  } catch (e) {
    throw e;
  }
}

export const openUrlAdb = async (url: string) => {
  const args = [
    'shell', 'am', 'start', '-a', 'android.intent.action.VIEW', '-d',
    url
  ]
  try {
    const success = await getAdbOutputAsync(args)
    return !!success
  } catch (e: any) {
    console.error(e)
    return false
  }
}
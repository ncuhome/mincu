import { useEffect } from 'react'
import { useMedia } from 'react-use'
import { setThemeClass } from '../utils'

export const useThemeDark = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)')
  return isDark
}

export const useTheme = () => {
  const isDark = useThemeDark()
  return isDark ? 'dark' : 'light'
}

export const useThemeWatcher = () => {
  const isDark = useThemeDark()
  useEffect(() => {
    setThemeClass(isDark)
  }, [isDark])
}

export const useThemeChange = (cb: (isDark: boolean) => void) => {
  const isDark = useThemeDark()
  useEffect(() => {
    cb(isDark)
  }, [isDark])
}

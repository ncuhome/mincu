import { useSearchParam } from 'react-use'
import { DEBUG_CHII_PORT } from 'mincu-lib/debug'

export const DEFAULT_HINT =
  '请打开 「南大家园」 - 「生活板块」 - 右上角「扫一扫」，扫描以上二维码，开始调试'

export const API_HOST = import.meta.env.DEV
  ? `http://localhost:23333/api`
  : '/api'

export const useDecodeUrl = () => {
  const urlParam = useSearchParam('url') || ''
  return urlParam ? decodeURIComponent(urlParam) : ''
}

export const previewUrl = async (url: string) => {
  const res = await fetch(
    `${API_HOST}/preview?target=${encodeURIComponent(url)}`
  )
  return res.json()
}

export const setThemeClass = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
}

export const CHII_URL = `http://localhost:${DEBUG_CHII_PORT}`

export const chiiFrontUrl = (clientId: string, targetId: string) =>
  `${CHII_URL}/front_end/chii_app.html?ws=localhost:${DEBUG_CHII_PORT}/client/${clientId}?target=${targetId}`

import { useSearchParam } from 'react-use'

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

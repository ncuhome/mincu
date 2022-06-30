import { useSearchParam } from 'react-use'

export const DEFAULT_HINT =
  '请打开 「南大家园」 - 「生活板块」 - 右上角「扫一扫」，扫描以上二维码，开始调试'

const API_HOST = import.meta.env.DEV ? `http://localhost:23333/api` : '/api'

export const DEBUG_URL_KEY = '$DEBUG_URL'

export const useDecodeUrl = () => {
  const urlParam = useSearchParam('url') || ''
  const urlStorage = localStorage.getItem(DEBUG_URL_KEY) || ''
  return urlParam ? decodeURIComponent(urlParam) : urlStorage
}

export const previewUrl = async (url: string) => {
  const res = await fetch(`${API_HOST}/preview?target=${encodeURIComponent(url)}`)
  return res.json()
}

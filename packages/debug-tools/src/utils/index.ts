export const DEFAULT_HINT = '请打开 「南大家园」 - 「生活板块」 - 右上角「扫一扫」，扫描以上二维码，开始调试'

const API_HOST = import.meta.env.DEV ? `http://localhost:23333/api` : '/api'

const getReallyUrl = (url: string) => {
  return url.includes('http://localhost')
    ? url
    : `${API_HOST}/fetch?target=${encodeURIComponent(url)}`
}

export const requestHtml = async (url: string) => {
  const res = await fetch(getReallyUrl(url));
  const html = await res.text();

  if (html.includes('<html')) {
    return html
  } else {
    return false
  }
}

export const getHtmlTitle = (html: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.title
}
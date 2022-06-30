import { makeApi } from './common'
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js'
import { debug } from 'debug'
import { fetch } from 'cross-fetch'

const log = debug('preview')

const cache = new Map()

const getPreviewContent = async (url: string) => {
  if (url.match('http://localhost')) {
    const res = await fetch(url)
    const html = await res.text()
    return getPreviewFromContent({
      data: html,
      headers: res.headers as any,
      url: res.url,
    })
  }
  return getLinkPreview(url)
}

export const preview = makeApi(async (req, res) => {
  if (!req.url) return
  const params = new URLSearchParams(req.url.split('?')[1])
  const target = params.get('target')
  if (target && typeof target === 'string') {
    try {
      let content = cache.get(target)
      if (content) {
        log('hitting cache: ', content, target)
        res.end(JSON.stringify(content))
        return
      }
      content = await getPreviewContent(target)
      log('fresh load: ', content, target)
      cache.set(target, content)
      res.end(JSON.stringify(content))
    } catch (e: any) {
      log('error: ', e)
      res.end(e.message)
    }
  } else {
    log('error: ', 'target is not a string')
    res.end('No target')
  }
})

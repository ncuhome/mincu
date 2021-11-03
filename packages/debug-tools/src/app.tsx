import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { useSearchParam } from 'react-use'
import Button from '@/components/Button'
import { DEFAULT_HINT, DEBUG_URL_KEY, getHtmlTitle, requestHtml, useDecodeUrl } from './utils'
import debug from 'mincu-debug'

export function App() {
  const [imgSrc, setImgSrc] = useState('')
  const [title, setTitle] = useState('')
  const url = useDecodeUrl()
  const origin = useSearchParam('origin')
  const hint = useSearchParam('hint') || DEFAULT_HINT

  useEffect(() => {
    if (url) {
      localStorage.setItem(DEBUG_URL_KEY, url)
    }
  }, [])

  useEffect(() => {
    updateImgSrc()
    checkUsable()
  }, [url])

  const updateImgSrc = async () => {
    if (!url) return
    const nextImgSrc = await QRCode.toDataURL(url, {
      width: 300,
      margin: 1
    })
    setImgSrc(nextImgSrc)
  }
  
  const checkUsable = async () => {
    if (!url) return
    const html = await requestHtml(url)
    if (html) {
      const title = getHtmlTitle(html)
      setTitle(title)
    } else {
      setTitle(url.split('/?')[0])
    }
  }
  
  const openOnDevice = (platform: string) => {
    debug.command('openUrl', [url, platform])
  }
  
  const finalTitle = title == origin
    ? title
    : [title, origin].filter(item => item && item.length > 0).join(' | ')

  return (
    <div class="text-light-600 body-font overflow-hidden bg-dark-900 w-screen h-screen">
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <h1 class="title-font sm:text-2xl text-2xl mb-8 font-medium subpixel-antialiased">
          {finalTitle}
        </h1>
        <img src={imgSrc} alt={origin || url || ''} class="lg:w-1/4 md:w-3/6 w-4/6 mb-8 object-cover object-center rounded-2xl" />
        <div class="text-center lg:w-2/3 w-full">
          <p class="sm:text-1xl text-2xl mb-8 text-gray-300">
            {hint}
          </p>
          <div class="flex flex-col items-center">
            <Button onClick={() => openOnDevice('android')}>
              在 Android 上打开页面
            </Button>
            <Button onClick={() => openOnDevice('ios')}>
              在 iOS 上打开页面
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

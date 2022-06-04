import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { useSearchParam } from 'react-use'
import { DEFAULT_HINT, DEBUG_URL_KEY, getHtmlTitle, requestHtml, useDecodeUrl } from './utils'

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
  
  const finalTitle = title == origin
    ? title
    : [title, origin].filter(item => item && item.length > 0).join(' | ')

  return (
    <div className="text-light-600 body-font overflow-hidden bg-dark-900 w-screen h-screen">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <h1 className="title-font sm:text-2xl text-2xl mb-8 font-medium subpixel-antialiased">
          {finalTitle}
        </h1>
        <img src={imgSrc} alt={origin || url || ''} className="lg:w-1/4 md:w-3/6 w-4/6 mb-8 object-cover object-center rounded-2xl" />
        <div className="text-center lg:w-2/3 w-full">
          <p className="sm:text-1xl text-2xl mb-8 text-gray-300">
            {hint}
          </p>
        </div>
      </div>
    </div>
  )
}

import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useSearchParam } from 'react-use'
import { DEFAULT_HINT, DEBUG_URL_KEY, useDecodeUrl, previewUrl } from './utils'
import Tooltip from './components/Tooltip'
import type { SitePreview } from './vite-env'
import SiteInfo from './components/SiteInfo'

export function App() {
  const url = useDecodeUrl()
  const hint = useSearchParam('hint') || DEFAULT_HINT
  const [preview, setPreview] = useState<SitePreview>()

  useEffect(() => {
    if (url) {
      localStorage.setItem(DEBUG_URL_KEY, url)
    }
  }, [])

  useEffect(() => {
    checkUsable()
  }, [url])

  const checkUsable = async () => {
    if (!url) return
    const res = await previewUrl(url)
    console.log(res)
    setPreview(res)
  }

  const finalTitle = preview?.title || ''

  return (
    <div className="text-light-600 body-font overflow-hidden bg-dark-900 w-screen h-screen flex flex-col items-center justify-center">
      <Tooltip label={<SiteInfo preview={preview} />}>
        <h1
          className="title-font sm:text-2xl text-2xl mb-8 font-medium subpixel-antialiased cursor-pointer hover:underline"
          onClick={() => {
            window.open(url)
          }}
        >
          {finalTitle}
        </h1>
      </Tooltip>
      <QRCodeSVG
        value={url}
        className="mb-8 object-cover object-center rounded-2xl border-6"
        size={250}
      />
      <div className="text-center lg:w-2/3 w-full">
        <p className="sm:text-1xl text-2xl mb-8 text-gray-300">{hint}</p>
      </div>
      <iframe className="w-full h-full bg-white" src="http://localhost:2333/" />
    </div>
  )
}

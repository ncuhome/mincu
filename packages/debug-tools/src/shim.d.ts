import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}

import type { getLinkPreview } from 'link-preview-js'

type SitePreview = Partial<{
  url: string
  title: string
  siteName: string | undefined
  description: string | undefined
  mediaType: string
  contentType: string | undefined
  images: string[]
  videos: {
    url: string | undefined
    secureUrl: string | null | undefined
    type: string | null | undefined
    width: string | undefined
    height: string | undefined
  }[]
  favicons: string[]
}>

type DebugTarget = {
  url: string
  id: string
  title: string
}

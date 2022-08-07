import clsx from 'clsx'
import { FC } from 'react'
import type { SitePreview } from '../shim'
import Space from './Space'

const SiteInfo: FC<{
  preview?: SitePreview
}> = ({ preview }) => {
  if (!preview) return <div>oops</div>
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        'max-w-100 p-3 rounded-xl border shadow',
        'dark:bg-black bg-white'
      )}
    >
      <div className="flex items-center justify-center">
        <Space />
        <img
          className="w-8 h-8 mr-2 bg-white rounded-full border"
          src={preview.favicons?.[0]}
        />
        <div>
          <p className="text-xl mr-10">
            {preview.title}
            {preview.siteName ? ` | ${preview.siteName}` : ''}
          </p>
          <p className="dark:text-white/60 text-sm">
            {preview.mediaType},{preview.contentType}
          </p>
        </div>
      </div>
      {preview.description && <p>{preview.description}</p>}
      <Space y={2} />
      <img
        className="w-full h-full rounded-lg shadow-lg"
        src={preview.images?.[0]}
      />
    </div>
  )
}

export default SiteInfo

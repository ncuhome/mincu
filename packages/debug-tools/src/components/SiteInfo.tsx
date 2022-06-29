import { FC } from 'react'
import type { SitePreview } from '../vite-env'

const SiteInfo: FC<{
  preview?: SitePreview
}> = ({
  preview
}) => {
    if (!preview) return <div>oops</div>
    return (
      <div className='flex flex-col items-center justify-center bg-black w-100 p-3 rounded-xl border'>
        <div className='flex items-center justify-center mb-2'>
          <img
            className='w-8 h-8 mr-2 bg-white rounded-full border'
            src={preview.favicons?.[0]}
          />
          <div>
            <p className='text-xl mr-10'>
              {preview.title}
              {preview.siteName ? ` | ${preview.siteName}` : ''}  
            </p>
            <p className='text-white/60 text-sm'>
              {preview.mediaType},
              {preview.contentType}
            </p>
          </div>
        </div>
        <p className='mb-4'>
          {preview.description}
        </p>
        <img
          className='w-full h-full rounded-lg shadow-lg'
          src={preview.images?.[0]}
        />
      </div>
    )
  }

export default SiteInfo
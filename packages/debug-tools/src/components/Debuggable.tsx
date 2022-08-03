import { FC, useEffect, useState } from 'react'
import { previewUrl } from '../utils'
import type { SitePreview, DebugTarget } from '../shim'
import clsx from 'clsx'

const Debuggable: FC<{
  data: DebugTarget
  onClick: () => void
  active?: boolean
}> = ({ data, onClick, active }) => {
  const { url } = data
  const [preview, setPreview] = useState<SitePreview>()
  const finalTitle = preview?.title || ''

  useEffect(() => {
    checkUsable()
  }, [data])

  const checkUsable = async () => {
    if (!url) return
    const res = await previewUrl(url)
    setPreview(res)
  }

  return (
    <button
      className={clsx(
        'w-full transition duration-300 rounded p-2 px-4 cursor-pointer',
        'hover:bg-gray-200 hover:dark:bg-gray-700',
        'focus:outline-none focus:ring-2 block',
        active && 'bg-gray-100 dark:bg-gray-600'
      )}
      onClick={onClick}
    >
      <div className={'font-medium text-start'}>
        <h1 className="title-font text-xl">{finalTitle}</h1>
        <p className="opacity-60">id: {data.id}</p>
      </div>
    </button>
  )
}

export default Debuggable

import { FC, useEffect, useState } from 'react'
import { previewUrl } from '../utils'
import Tooltip from './Tooltip'
import type { SitePreview, DebugTarget } from '../shim'
import SiteInfo from './SiteInfo'
import Modal from './Modal'
import Inspector from './Inspector'
import clsx from 'clsx'

const Debuggable: FC<{
  data: DebugTarget
}> = ({ data }) => {
  const { url } = data
  const [preview, setPreview] = useState<SitePreview>()
  const finalTitle = preview?.title || ''
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    checkUsable()
  }, [data])

  const checkUsable = async () => {
    if (!url) return
    const res = await previewUrl(url)
    setPreview(res)
  }

  return (
    <>
      <Modal render={() => <Inspector data={data} />} keepAlive>
        <button className="outline-none">
          <Tooltip label={<SiteInfo preview={preview} />}>
            <div
              className={clsx(
                'mb-8 font-medium text-center',
                'cursor-pointer border-2 rounded-lg px-8 py-4',
                'transition duration-300',
                'hover:opacity-60'
              )}
            >
              <h1 className="title-font sm:text-2xl text-2xl">{finalTitle}</h1>
              <p className="opacity-60">id: {data.id}</p>
            </div>
          </Tooltip>
        </button>
      </Modal>
    </>
  )
}

export default Debuggable

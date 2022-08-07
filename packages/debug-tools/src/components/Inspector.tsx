import React, { FC, useRef, useCallback } from 'react'
import { DebugTarget } from '@/shim'
import { chiiFrontUrl } from '@/utils'
import { useThemeChange } from '@/hooks'

const Inspector: FC<{
  data: DebugTarget
}> = ({ data }) => {
  const ref = useRef<HTMLIFrameElement>(null)

  useThemeChange(() => {
    if (ref.current) {
      ref.current.src = chiiFrontUrl(data.id, data.id)
    }
  })

  const getUrl = useCallback(() => {
    return chiiFrontUrl(data.id, data.id)
  }, [data.id])

  return <iframe className={'w-full h-full'} src={getUrl()} ref={ref} />
}

export default Inspector

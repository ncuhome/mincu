import React, { FC, useCallback, useRef } from 'react'
import { nanoid } from 'nanoid'
import { DebugTarget } from '@/shim'
import clsx from 'clsx'

const Inspector: FC<{
  data: DebugTarget
}> = ({ data }) => {
  const clientIdRef = useRef(nanoid(6))
  const getUrl = useCallback(() => {
    return `http://localhost:8080/front_end/chii_app.html?ws=localhost:8080/client/${clientIdRef.current}?target=${data.id}`
  }, [])

  return (
    <iframe
      className={clsx(
        'w-[85vw] h-[85vh] rounded-lg border-2',
        'border-black dark:border-white'
      )}
      src={getUrl()}
    />
  )
}

export default Inspector

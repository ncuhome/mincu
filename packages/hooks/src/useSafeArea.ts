import { useState } from 'react'
import { EdgeInsets } from 'mincu-core'
import useReady from './useReady'
import dataModule from 'mincu-data'

export default () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useReady(() => {
    setInset(dataModule.inset)
  }, [])

  return inset
}

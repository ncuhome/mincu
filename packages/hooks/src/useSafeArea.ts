import { useEffect, useState } from 'react'
import { EdgeInsets } from 'mincu-core'
import dataModule from 'mincu-data'

export default () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useEffect(() => {
    setInset(dataModule.inset)
  }, [])

  return inset
}

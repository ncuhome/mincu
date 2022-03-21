import { useEffect, useState } from 'react'
import { EdgeInsets } from 'mincu-core'
import dataModule from 'mincu-data'
import mincuCore from 'mincu-core'

export default () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useEffect(() => {
    mincuCore.initial(() => {
      setInset(dataModule.inset)
    })
  }, [])

  return inset
}

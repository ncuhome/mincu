import { useEffect, useState } from 'react'
import dataModule from '@data/index'
import { EdgeInsets } from '@core/interface'

export default () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useEffect(() => {
    setInset(dataModule.inset)
  }, [])

  return inset
}

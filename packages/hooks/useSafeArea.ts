import { useEffect, useState } from 'react'
import { EdgeInsets } from '@core/interface'
import dataModule from '@data/index'

export default () => {
  const [inset, setInset] = useState<EdgeInsets>({} as EdgeInsets)

  useEffect(() => {
    setInset(dataModule.inset)
  }, [])

  return inset
}

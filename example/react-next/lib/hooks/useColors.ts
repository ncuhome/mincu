import { useEffect, useState } from 'react'
import { dataModule, mincuCore } from 'mincu'

export const useColors = (): any => {
  const [colors, setColors] = useState<any>({})

  const handle = (res: any) => {
    setColors(res)
  }

  useEffect(() => {
    setColors(dataModule.colors)
    mincuCore.listener('colors', handle)

    return () => {
      mincuCore.remove('colors', handle)
    }
  }, [])

  return colors
}
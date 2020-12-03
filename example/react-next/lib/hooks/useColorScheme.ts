import { useEffect, useState } from 'react'
import { dataModule, mincuCore } from 'mincu'

export const useColorScheme = (): ColorSchemeName => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(null)

  const handle = (res: ColorSchemeName) => {
    setColorScheme(res)
  }

  useEffect(() => {
    setColorScheme(dataModule.colorScheme)
    mincuCore.listener('colorScheme', handle)
    
    return () => {
      mincuCore.remove('colorScheme', handle)
    }
  }, [])

  return colorScheme
}
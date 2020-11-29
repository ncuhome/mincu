import { useEffect, useState } from 'react'
import { useCommonState } from '../../store/index'
import { dataModule, mincuCore } from 'mincu'

export const useColorScheme = (): ColorSchemeName => {
  const isReady = useCommonState(state => state.isReady)
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(null)

  const handle = (res: ColorSchemeName) => {
    setColorScheme(res)
  }

  useEffect(() => {
    if (isReady) {
      setColorScheme(dataModule.colorScheme)
      mincuCore.listener('colorScheme', handle)
    }

    return () => {
      mincuCore.remove('colorScheme', handle)
    }
  }, [isReady])

  return colorScheme
}
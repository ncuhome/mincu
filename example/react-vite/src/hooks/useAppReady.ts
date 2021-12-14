import { useEffect, useState } from 'react'
import { mincuCore } from 'mincu-react'

export const useAppReady = (): boolean => {
  const [isReady, setIsReady] = useState(mincuCore.isApp)

  useEffect(() => {
    mincuCore.initial(
      () => setIsReady(true),
      () => alert('应用外')
    )
  }, [])

  return isReady
}

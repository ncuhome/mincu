import { useEffect, useState } from 'react'
import mincuCore from '@core/index'

export default (reject: (err: unknown) => void): boolean => {
  const [isReady, setIsReady] = useState(mincuCore.isApp)

  useEffect(() => {
    mincuCore.initial(() => setIsReady(true), reject)
  }, [])

  return isReady
}

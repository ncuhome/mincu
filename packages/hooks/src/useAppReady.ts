import { useEffect, useState } from 'react'
import mincuCore from 'mincu-core'

export default (reject = () => {}): boolean => {
  const [isReady, setIsReady] = useState(mincuCore.isReady && mincuCore.isApp)

  useEffect(() => {
    mincuCore.initial(() => setIsReady(true), reject)
  }, [])

  return isReady
}

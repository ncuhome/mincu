import { useState } from 'react'
import mincuCore from 'mincu-core'
import useReady from './useReady'

export default (reject = () => {}): boolean => {
  const [isReady, setIsReady] = useState(mincuCore.isReady && mincuCore.isApp)

  useReady(() => setIsReady(true), reject, [])

  return isReady
}

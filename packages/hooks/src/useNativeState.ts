import { useState, useCallback } from 'react'
import { States } from 'mincu-core'
import mincuCore from 'mincu-core'
import dataModule from 'mincu-data'
import useReady from './useReady'

/**
 * 返回 app 的状态
 */
export default <T extends keyof States>(key: T): States[T] => {
  const [value, setValue] = useState<States[T]>({})

  const handle = useCallback((res: States[T]) => {
    setValue(res)
  }, [])

  useReady(() => {
    setValue(dataModule?.[key] ?? {})
    mincuCore.listener(key, handle)

    return () => {
      mincuCore.remove(key, handle)
    }
  }, [])

  return value
}

import { useState, useCallback } from 'react'
import { States } from 'mincu-core'
import mincuCore from 'mincu-core'
import dataModule from 'mincu-data'
import useReady from './useReady'

/**
 * 返回当前所监听的客户端状态
 * 如果要在其他项目中使用，建议直接复制
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

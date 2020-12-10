import { useEffect, useState, useCallback } from 'react'
import { States, dataModule, mincuCore } from 'mincu'

/**
 * 返回当前所监听的客户端状态
 */
export const useNativeState = <T extends keyof States>(key: T): States[T] => {
  const [value, setValue] = useState<States[T]>({})

  const handle = useCallback((res: States[T]) => {
    setValue(res)
  }, [])

  useEffect(() => {
    setValue(dataModule[key])
    mincuCore.listener(key, handle)

    return () => {
      mincuCore.remove(key, handle)
    }
  }, [])

  return value
}

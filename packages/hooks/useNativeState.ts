import { useEffect, useState, useCallback } from 'react'
import { States } from '@core/interface'
import mincuCore from '@core/index'

interface Params<D extends keyof States> {
  initialState: States[D]
  key: D
}

/**
 * 返回当前所监听的客户端状态
 */
export const useNativeState = <T extends keyof States>(params: Params<T>): States[T] => {
  const { initialState = null, key } = params
  const [value, setValue] = useState<States[T]>(null)

  const handle = useCallback((res: States[T]) => {
    setValue(res)
  }, [])

  useEffect(() => {
    setValue(initialState)
    mincuCore.listener(key, handle)

    return () => {
      mincuCore.remove(key, handle)
    }
  }, [])

  return value
}

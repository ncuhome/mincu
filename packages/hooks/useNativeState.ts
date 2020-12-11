import { useEffect, useState, useCallback } from 'react'
import { States } from '@core/interface'
import mincuCore from '@core/index'
import dataModule from '@data/index'

/**
 * 返回当前所监听的客户端状态
 * 如果要在其他项目中使用，建议直接复制
 */
export default <T extends keyof States>(key: T): States[T] => {
  const [value, setValue] = useState<States[T]>({})

  const handle = useCallback((res: States[T]) => {
    setValue(res)
  }, [])

  useEffect(() => {
    setValue(dataModule?.[key] ?? {})
    mincuCore.listener(key, handle)

    return () => {
      mincuCore.remove(key, handle)
    }
  }, [])

  return value
}

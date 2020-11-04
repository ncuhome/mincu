import { useEffect } from 'react'
import { useCommonState } from '../../store/index'

export const useSafeArea = () => {
  const [isReady, inset, handleValue] = useCommonState(state =>
    [state.isReady, state.inset, state.handleValue]
  )

  useEffect(() => {
    if (isReady) {
      handleValue("inset", window.appData?.user?.inset)
    }
  }, [isReady])

  return inset
}
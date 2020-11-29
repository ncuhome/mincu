import { useEffect } from 'react'
import { dataModule } from 'mincu'
import { useCommonState } from '../../store/index'

export const useSafeArea = () => {
  const [inset, handleValue] = useCommonState(state =>
    [state.inset, state.handleValue]
  )

  useEffect(() => {
    handleValue("inset", dataModule.inset)
  }, [])

  return inset
}
import { dataModule, useNativeState } from 'mincu'

export const useColors = useNativeState({
  initialState: dataModule.colors,
  key: 'colors',
})
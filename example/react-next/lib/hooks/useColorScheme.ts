import { dataModule, useNativeState } from 'mincu'

export const useColorScheme = useNativeState({
  initialState: dataModule.colorScheme,
  key: 'colorScheme'
})
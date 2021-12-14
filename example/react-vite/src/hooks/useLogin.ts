import { useEffect } from 'react'
import { useAppReady } from './useAppReady'
import { dataModule } from 'mincu-react'

export const useLogin = () => {
  const isReady = useAppReady()

  useEffect(() => {
    if (isReady) {
      const data = dataModule.appData

      if (!data) return

      localStorage.setItem('username', data.user?.profile?.basicProfile?.name)
      localStorage.setItem('studentID', data.user?.profile?.entireProfile?.base_info?.xh)
    }
  }, [isReady])

  return { isReady }
}

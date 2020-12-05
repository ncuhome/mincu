import { useEffect } from 'react';
import { useAppReady } from './useAppReady'
import { useInfoState } from '../../store/index'

export const useLogin = () => {
  const isReady = useAppReady()
  const handleValue = useInfoState(state => state.handleValue)

  useEffect(() => {
    if (isReady) {
      const data = window.appData

      handleValue('username', data.user.profile.basicProfile.name)
      handleValue('avatar', data.user.profile.basicProfile.app_avatar_url)
      handleValue('studentID', data.user.profile.entireProfile.base_info.xh)
    }
  }, [isReady])

  return { isReady }
}
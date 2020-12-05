import { useEffect, useState } from 'react'
import { mincuCore } from 'mincu'
import Router from 'next/router'

export const useAppReady = () => {
  const [isReady, setIsReady] = useState(mincuCore.appData)

  useEffect(() => {
    mincuCore.initial(
      () => setIsReady(true),
      () => Router.push('/outside')
    )
  }, [])

  return isReady
}
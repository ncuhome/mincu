import React, { FC, Fragment, useEffect, useState } from 'react'
import { useAppReady } from 'mincu-hooks'
import { Fallback } from './Fallback'

export interface Props {
  fallback?: React.ReactNode
  children?: React.ReactNode
}

export const ReadySSR: FC<Props> = ({ fallback = (<Fallback />) as any, children }) => {
  const [isSSR, setIsSSR] = useState(true)
  const isReady = useAppReady()

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const content = isReady ? children : fallback

  return <Fragment>{!isSSR && content}</Fragment>
}

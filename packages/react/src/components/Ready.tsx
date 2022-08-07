import React, { FC } from 'react'
import { useAppReady } from 'mincu-hooks'
import { Fallback } from './Fallback'

export interface Props {
  fallback?: React.ReactNode
  children?: React.ReactNode
}

export const Ready: FC<Props> = ({
  fallback = (<Fallback />) as any,
  children,
}) => {
  const isReady = useAppReady()

  return isReady ? children : fallback
}

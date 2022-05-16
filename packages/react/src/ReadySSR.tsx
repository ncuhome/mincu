import React, { FC, Fragment, useEffect, useState } from 'react'
import { useAppReady } from 'mincu-hooks'

interface Props {
  fallback?: React.ReactNode
  children?: React.ReactNode
}

const ReadySSR: FC<Props> = ({ fallback, children }) => {
  const [isSSR, setIsSSR] = useState(true);
  const isReady = useAppReady()

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const content = isReady ? children : fallback;

  return <Fragment>{!isSSR && content}</Fragment>
}

export default ReadySSR
import { useState, useEffect } from 'react'
import Router from 'next/router';

export const useAppReady = () => {
  const [isReady, setIsReady] = useState(
    () => typeof window !== 'undefined' && window.appReady
  )

  useEffect(() => {
    isReady && Router.push('/home')
  }, [isReady])

  useEffect(() => {
    if (window.appReady === true) {
      setIsReady(true)
      return
    }

    // 轮询是否成功加载
    const scanner = setInterval(() => {
      if (window.appReady === true) {
        clearInterval(scanner)
        setIsReady(true)
      }
    }, 10)

    // 3秒超时
    setTimeout(() => {
      if (!window.appReady) {
        clearInterval(scanner)
        Router.push('/nope')
      }
    }, 3000)
  }, [])

  return isReady
}
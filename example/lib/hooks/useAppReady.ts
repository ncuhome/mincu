import { useState, useEffect } from 'react'

export const useAppReady = () => {
  const [isReady, setIsReady] = useState(
    () => typeof window !== 'undefined' && window.appReady
  )

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
      if (window.appReady === false) {
        clearInterval(scanner)
        setIsReady(false)
      }
    }, 3000)
  }, [])

  return isReady
}
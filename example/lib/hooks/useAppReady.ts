import { useEffect } from 'react'
import Router from 'next/router';
import { useCommonState } from '../../store/index'

export const useAppReady = () => {
  const [isReady, handleValue] = useCommonState(state => [state.isReady, state.handleValue])

  useEffect(() => {
    handleValue("isReady", typeof window !== 'undefined' && window.appReady)
  }, [])

  useEffect(() => {
    if (window.appReady === true) {
      handleValue("isReady", true)
      return
    }

    // 轮询是否成功加载
    const scanner = setInterval(() => {
      if (window.appReady === true) {
        clearInterval(scanner)
        handleValue("isReady", true)
      }
    }, 10)

    // 1秒超时
    setTimeout(() => {
      if (!window.appReady) {
        clearInterval(scanner)
        Router.push('/nope')
      }
    }, 1000)
  }, [])

  return isReady
}
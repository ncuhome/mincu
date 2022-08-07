import { useEffect } from 'react'
import isFunction from 'lodash/isFunction'
import mincuCore from 'mincu-core'

function useIsReady(resolve: () => void, deps?: any[]): void
function useIsReady(resolve: () => void, reject: () => void, deps?: any[]): void

function useIsReady(...args: any[]) {
  const [resolve, rejectOrDeps, deps] = args
  let _deps: any[]

  const hasReject = isFunction(rejectOrDeps)

  if (hasReject) {
    _deps = deps
  } else {
    _deps = rejectOrDeps
  }

  useEffect(() => {
    mincuCore.initial(resolve, hasReject ? rejectOrDeps : undefined)
  }, _deps)
}

export default useIsReady

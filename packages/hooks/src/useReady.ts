import { useEffect } from 'react'
import { isFunction } from 'lodash'
import mincuCore from 'mincu-core'

function useIsReady(resolve: () => void, deps?: any[]): void
function useIsReady(resolve: () => void, reject: () => void, deps?: any[]): void

function useIsReady(...args: any[]) {
  let _deps: any[]

  if (isFunction(args[1])) {
    _deps = args[2]
  } else {
    _deps = args[1]
  }

  useEffect(() => {
    mincuCore.initial(args[0], args[1])
  }, _deps)
}

export default useIsReady

import create, { SetState, State } from 'zustand'
import { persist } from "./middware/persist"
import { immer } from "./middware/immer"

export const stateFactory = <T extends State, K extends State>(
  state: T,
  events: (set: SetState<T>) => K
) => {
  return create(immer<T & K>(set => ({
    ...state,
    ...events(set)
  })))
}

export const statePersistFactory = <T extends State, K extends State>(
  state: T,
  events: (set: SetState<T>) => K
) => {
  // 内 -> 外
  const middwares = [immer, persist]
  
  const initialItem = middwares[0]<T & K>(set => ({
    ...state,
    ...events(set)
  }))
  
  const funcs = middwares.reduce((acc, cur, idx) =>
    idx === 0 ? acc : cur(acc),
    initialItem
  )

  return create(funcs)
}

import { SetState, GetState, StoreApi, StateCreator, State } from 'zustand'
import produce from "immer"

export const immer = <T extends State>(config: StateCreator<T>): StateCreator<T> => (
  set: SetState<T>, get: GetState<T>, api: StoreApi<T>
) => config((fn: any) => set(produce(fn)), get, api)
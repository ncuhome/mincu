import { statePersistFactory } from "../factory"

type Info = {
  studentID: string
  username: string
  token: string
  avatar: string
}

export const useInfoState = statePersistFactory({} as Info, set => ({
  handleValue: <T extends keyof Info>(key: T, value: Info[T]) => set((state) => {
    state[key] = value
    return state
  })
}))
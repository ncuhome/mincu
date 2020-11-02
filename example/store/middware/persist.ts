import {
  SetState,
  GetState,
  StoreApi,
  StateCreator,
  State
} from 'zustand'

export const persist = <T extends State>(config: StateCreator<T>): StateCreator<T> => (
  set: SetState<T>, get: GetState<T>, api: StoreApi<T>
) => {
  const initialState = config(
    args => {
      set(args);
      window.localStorage.setItem('state', JSON.stringify(get()));
    },
    get,
    api,
  );

  const restoredState =
    typeof window === 'undefined'
      ? {}
      : JSON.parse(localStorage.getItem('state'));

  return {
    ...initialState,
    ...restoredState,
  };
};
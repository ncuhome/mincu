import mincuCore from 'mincu-core'

export const toast = {
  info: (title: string, during: number = 1) => {
    return mincuCore.callPromise('Toast', 'info', [title, during])
  },

  loading: async (title: string, during: number = 1) => {
    const key = await mincuCore.callPromise('Toast', 'loading', [title, during])
    return () => {
      toast.remove(key)
    }
  },

  success: (title: string, during: number = 1) => {
    return mincuCore.callPromise('Toast', 'success', [title, during])
  },

  fail: (title: string, during: number = 1) => {
    return mincuCore.callPromise('Toast', 'fail', [title, during])
  },

  remove: (key: number) => {
    return mincuCore.callPromise('Portal', 'remove', [key])
  },
}

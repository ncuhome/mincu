import mincuCore from 'mincu-core'

export class MincuStorage {
  async getItem(key: string) {
    return mincuCore.callPromise('Storage', 'getItem', [key])
  }

  async setItem(key: string, value: any) {
    return mincuCore.callPromise('Storage', 'setItem', [key, value])
  }

  async removeItem(key: string) {
    return this.remove(key)
  }

  async remove(key: string) {
    return mincuCore.callPromise('Storage', 'remove', [key])
  }

  async reset() {
    return mincuCore.callPromise('Storage', 'reset', null)
  }
}

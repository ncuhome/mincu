import { createModule, mutation } from 'vuex-class-component'
import { EdgeInsets } from 'mincu'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
})

export class UserStore extends VuexModule {
  isReady = false
  insets = {} as EdgeInsets

  @mutation changeReady(payload: { value: boolean }) {
    const { value } = payload
    this.isReady = value
  }
}

import { createModule, mutation } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
})

export class UserStore extends VuexModule {
  isReady = false

  @mutation changeReady(payload: { value: boolean }) {
    const { value } = payload
    this.isReady = value
  }
}

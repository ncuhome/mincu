import { extractVuexModule } from 'vuex-class-component'
import { UserStore } from './user'
import Vuex from 'vuex'

const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
  },
})

export default store

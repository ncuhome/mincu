<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { mincuCore } from 'mincu'
import { namespace } from 'vuex-class'
import 'vue-router'

const userModule = namespace('user')
export default class App extends Vue {
  @userModule.State isReady!: boolean
  @userModule.Mutation changeReady!: (payload: { value: boolean }) => void

  created() {
    mincuCore.initial(
      () => {
        this.changeReady({ value: true })
        this.$router.push('/home')
      },
      () => this.$router.push('/outside')
    )
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 60px 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

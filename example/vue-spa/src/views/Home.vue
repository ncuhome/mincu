<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>{{ isReady }}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'

const userModule = namespace('user')

export default class Home extends Vue {
  @userModule.State isReady!: boolean
}
</script>

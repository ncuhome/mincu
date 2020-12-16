<template>
  <div class="home">
    <div class="block" :style="square">
      <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <div>colorScheme: {{ colorScheme }}</div>
      <button @click="toCourse">周课表</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { uiModule } from 'mincu'
import useNativeState from '../hooks/useNativeState'

export default {
  setup() {
    const colorScheme = useNativeState('colorScheme')
    const colors = useNativeState('colors')

    const square = computed(
      () => `background: ${colors.value?.white};border: 3px solid ${colors.value?.black};`
    )

    const toCourse = () => uiModule.toScreen({ screen: '周课表' })

    return {
      colorScheme,
      square,
      toCourse,
    }
  },
}
</script>

<style scoped>
.block {
  display: flex;
  width: 120px;
  height: 120px;
  margin: 50px auto;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 85px;
  height: 85px;
}
</style>

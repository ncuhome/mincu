<template>
  <div className="home">
    <div className="block" :style="square">
      <img className="logo" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div>
      <div>colorScheme: {{ colorScheme }}</div>
      <button @click="toCourse">周课表</button>
      <button @click="fetchSchoolLife">校园生活接口测试</button>
      <button @click="toExit">退出</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { uiModule, networkModule } from 'mincu-vanilla'
import useNativeState from '../hooks/useNativeState'

export default {
  setup() {
    const colorScheme = useNativeState('colorScheme')
    const colors = useNativeState('colors')

    const square = computed(
      () => ({
        background: `${colors.value?.white}`,
        border: `3px solid ${colors.value?.black}`
      })
    )

    const toCourse = () => uiModule.toScreen({ screen: '周课表' })

    const toExit = () => uiModule.exit()

    const fetchSchoolLife = async () => {
      const loadingTip = await uiModule.loading('加载中', 0)
      const { status } = await networkModule.fetch.get(
        'https://incu-api.ncuos.com/v2/api/schoolLife'
      )
      loadingTip()
      alert(status)
    }

    return {
      colorScheme,
      square,
      toCourse,
      fetchSchoolLife,
      toExit,
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

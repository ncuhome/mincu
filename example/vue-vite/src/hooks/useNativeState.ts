import { ref, onBeforeUnmount, onMounted } from 'vue'
import { States, mincuCore, dataModule } from 'mincu-vanilla'

export default <T extends keyof States>(key: T, defaultVal?: any) => {
  const state = ref<States[T]>(defaultVal)

  const handle = (res: States[T]) => {
    state.value = res
  }

  onMounted(() => {
    handle(dataModule?.[key] ?? {})
    mincuCore.listener(key, handle)
  })

  onBeforeUnmount(() => {
    mincuCore.remove(key, handle)
  })

  return state
}

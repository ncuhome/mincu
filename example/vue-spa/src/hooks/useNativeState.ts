import { ref, onBeforeUnmount, onMounted } from 'vue'
import { States, mincuCore, dataModule } from 'mincu'

export default <T extends keyof States>(key: T) => {
  const state = ref<States[T]>(null)

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

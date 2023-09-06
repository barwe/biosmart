import { UnwrapRef } from 'vue'

export function computableRef<T>(
  callback: () => UnwrapRef<T>,
  defaultValue: T,
  options?: {
    deep?: boolean
    immediate?: boolean
  }
) {
  const readonlyRef = computed(callback)
  const data = ref<T>(defaultValue)
  watch(readonlyRef, v => (data.value = v), { immediate: true, ...options })
  return data
}

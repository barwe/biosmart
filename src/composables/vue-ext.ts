import { UnwrapRef } from 'vue'

/**
 * 如果你想在定义一个 ref 响应式变量的同时给它一个初始值，
 * 并且这个初始值本身也依赖于其他的响应式变量，而且它需要一个稍微复杂的计算过程。
 * 默认情况下，我们可以定义一个 computed 变量，然后监测其变化，将值赋给 ref 变量。
 * 这个函数简化了这个过程，返回的 ref 变量不仅会随着依赖的变化而变化，
 * 还能自助修改其中的值。对修改不满意还可以 reset 到依赖计算得结果（需配合 cloneDeep 使用）
 */
export function computableRef<T>(
  callback: () => UnwrapRef<T>,
  defaultValue: T,
  options?: {
    deep?: boolean
    immediate?: boolean
    cloneDeep?: boolean
  }
) {
  const readonlyRef = computed(callback)
  const data = ref<T>(defaultValue)
  watch(readonlyRef, v => (data.value = options?.cloneDeep ? cloneDeep(v) : v), { immediate: true, ...options })
  const reset = () => {
    data.value = options?.cloneDeep ? cloneDeep(readonlyRef.value) : readonlyRef.value
  }
  return { data, reset }
}

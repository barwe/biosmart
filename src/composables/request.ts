import { UnwrapRef } from 'vue'
import { useRequest } from 'vue-request'

/** 与 useRequest 类似，但是返回的 data 是可读写的；同时支持设置默认值 */
export function useRequestRef<R>(callback: () => Promise<UnwrapRef<R>>, defaultValue: R, options?: any) {
  const data = ref(defaultValue)
  const rd = useRequest(async () => {
    data.value = await callback()
  }, options)
  return { ...rd, data }
}

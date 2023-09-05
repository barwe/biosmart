import { MessageApi } from 'naive-ui'

export {}
declare global {
  /** 重新挂载 Vue 实例 */
  const reload: () => void
  const $message: MessageApi
  interface Window {
    $message: MessageApi
    reload: () => void
  }
}

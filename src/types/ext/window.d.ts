import { MessageApi } from 'naive-ui'

export {}
declare global {
  type Reload = () => void
  const $message: MessageApi
  interface Window {
    $message: MessageApi
  }
}

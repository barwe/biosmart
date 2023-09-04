/// <reference types="vite/client" />

declare module 'pinia-plugin-persist' {
  import type PiniaPersist from 'node_modules/pinia-plugin-persist'
  const piniaPersist: PiniaPersist
  export default piniaPersist
}

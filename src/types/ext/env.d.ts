export {}
declare global {
  interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_PORT: number
    readonly VITE_BASE_API: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
declare global {
  import type { Ref as Ref$0, Component, CSSProperties } from 'vue'

  type Ref<T> = Ref$0<T>
  type VueComponent = Component
  type StyleData = CSSProperties
  type StyleDataSet = Record<string, StyleData>
}

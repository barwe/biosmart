export {}
declare global {
  type VueRef<T> = import('vue').Ref
  type VueComponent = import('vue').Component
  type StyleData = import('vue').CSSProperties
  type StyleDataSet = Record<string, StyleData>
}

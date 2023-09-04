import { defineStore } from 'pinia'

/** expanding width of left sider */
export const LSIDER_EX_W = 220
/** collapsing width of left sider */
export const LSIDER_CO_W = 56

export const TOPBAR_H0 = 56
export const TOPBAR_H = 44
export const TOPBAR_ML = 8
export const TOPBAR_MR = 2

export const BODY_P = 4

export const px = (n: number | string | undefined) => {
  if (n === undefined || n === null) return undefined
  return typeof n === 'number' ? `${n}px` : n
}

export const mcalc = (base: string, n: number) => `calc(${base} - ${px(n)})`

export const useLayoutStore = defineStore('site-layout', () => {
  const topboxMx = TOPBAR_ML + TOPBAR_MR

  const isSiderCollapsed = ref(false)
  // 左侧边栏宽度
  const siderWidth = computed(() => (isSiderCollapsed.value ? LSIDER_CO_W : LSIDER_EX_W))
  // 右侧顶部工具栏宽度
  const topboxWidth = computed(() => mcalc('100vw', siderWidth.value + topboxMx))
  // 右侧主体内容区域宽度
  const borderX = 2
  const contentWidth = computed(() => mcalc('100vw', siderWidth.value + topboxMx + BODY_P * 2 + borderX))

  return { isSiderCollapsed, siderWidth, topboxWidth, contentWidth }
})

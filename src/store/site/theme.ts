import { defineStore } from 'pinia'
import { darkTheme, lightTheme, GlobalThemeOverrides } from 'naive-ui'

const lightThemeOverrides: GlobalThemeOverrides = {
  common: { primaryColor: '#7e72f2' },
}

const darkThemeOverrides: GlobalThemeOverrides = {
  common: { primaryColor: '#7e72f2' },
}

export const useThemeStore = defineStore('site-theme', () => {
  const dark = ref(false)
  const theme = computed(() => (dark.value ? darkTheme : lightTheme))
  const themeOverrides = computed(() => (dark.value ? darkThemeOverrides : lightThemeOverrides))
  return { dark, theme, themeOverrides }
})

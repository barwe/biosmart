import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useThemeStore = defineStore('site-theme', () => {
  const dark = ref(false)
  const theme = computed(() => (dark.value ? 'dark' : 'light'))
  return { dark, theme }
})

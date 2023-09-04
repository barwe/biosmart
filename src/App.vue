<template>
  <n-config-provider :theme="themeStore.theme" :theme-overrides="themeStore.themeOverrides">
    <n-back-top :right="20" :bottom="20" />
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NBackTop } from 'naive-ui'
import { useThemeStore } from '@/store/site/theme'

const themeStore = useThemeStore()

const alive = ref(true)
const reload = () => {
  alive.value = false
  nextTick(() => (alive.value = true))
}
provide('reload', reload)
</script>
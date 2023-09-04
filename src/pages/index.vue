<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import { useThemeStore } from '@/store/site/theme'

const themeStore = useThemeStore()
</script>

<template>
  <n-switch v-model:value="themeStore.dark" />
</template>


<script setup lang="ts">
import { useThemeStore } from '@/store/site/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <n-switch v-model:value="themeStore.dark" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import { useThemeStore } from '@/store/site/theme'

const count = ref(0)
const themeStore = useThemeStore()
</script>

<template>
  <div>
    <n-button @click="count++">count is {{ count }}</n-button>
    <div>{{ themeStore.theme }}</div>
  </div>
</template>


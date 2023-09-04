<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/store/site/theme'

const count = ref(0)
const themeStore = useThemeStore()
</script>

<template>
  <div>
    <button type="button" @click="count++">count is {{ count }}</button>
    <div>{{ themeStore.theme }}</div>
  </div>
</template>


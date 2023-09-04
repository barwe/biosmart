<script setup lang="ts">
import { useThemeStore } from '@/store/site/theme'

const themeStore = useThemeStore()

const click = () => $message.info('666')
</script>

<template>
  <div class="fy-c sx-1">
    <n-switch v-model:value="themeStore.dark" />
    <n-button @click="click">INFO</n-button>
    <i-mdi-ab-testing />
  </div>
</template>


<template>
  <template v-if="store.dark">
    <n-button text @click="store.switchTheme()">
      <i-clarity-moon-solid color="#eee" class="square-6" />
    </n-button>
  </template>
  <template v-else>
    <n-button text @click="store.switchTheme()">
      <i-clarity-sun-solid color="#666" class="square-6" />
    </n-button>
  </template>
</template>

<script setup lang="ts">
import { useThemeStore } from '$/site/theme'
const store = useThemeStore()
</script>

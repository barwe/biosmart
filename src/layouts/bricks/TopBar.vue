<template>
  <n-card :content-style="style.cardContent" :theme-overrides="themeOverrides" :style="style.card">
    <div class="fx-l space-x-2">
      <FavorListPopover />
      <BreadcrumbList />
    </div>
    <div class="flex items-center space-x-4">
      <ThemeButton />
      <n-divider vertical :style="style.divider" />
      <UserButton />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import FavorListPopover from './topbar/FavorListPopover.vue'
import BreadcrumbList from './topbar/BreadcrumbList.vue'
import UserButton from './topbar/UserButton.vue'
import ThemeButton from './topbar/ThemeButton.vue'
import { TOPBAR_H, px } from '$/site/layout'

const style = {
  card: {
    height: px(TOPBAR_H),
    boxShadow: '1px 1px 2px var(--n-border-color)',
  },
  cardContent: {
    padding: '0 1rem 0 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: { height: px(TOPBAR_H) },
} as StyleDataSet

const themeOverrides = { borderRadius: '2px' }
</script>

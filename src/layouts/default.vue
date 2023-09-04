<template>
  <n-layout has-sider>
    <LeftSider class="h-screen fixed" />
    <n-layout :style="rightStyle">
      <n-layout-header>
        <TopBar :style="headerStyle" />
      </n-layout-header>
      <n-layout-content :style="contentStyle">
        <n-card :content-style="{ padding: `${BODY_P}px` }" :style="bodyStyle">
          <router-view />
        </n-card>
      </n-layout-content>
    </n-layout>
    <!-- <RightSider /> -->
  </n-layout>
</template>

<script setup lang="ts">
import TopBar from './bricks/TopBar.vue'
import LeftSider from './bricks/LeftSider.vue'
import { useLayoutStore, px, mcalc, TOPBAR_H, TOPBAR_H0, TOPBAR_ML, TOPBAR_MR, BODY_P } from '$/site/layout'

const layoutStore = useLayoutStore()

const rightStyle = computed<StyleData>(() => ({
  marginLeft: px(TOPBAR_ML + layoutStore.siderWidth),
  marginRight: px(TOPBAR_MR),
  transition: 'margin-left 250ms',
}))

const headerStyle = computed<StyleData>(() => ({
  width: layoutStore.topboxWidth,
  height: px(TOPBAR_H),
  marginTop: px((TOPBAR_H0 - TOPBAR_H) / 2),
  transition: 'width 250ms',
  position: 'fixed',
  top: 0,
}))

const contentStyle: StyleData = { marginTop: px(TOPBAR_H0) }
const bodyStyle: StyleData = {
  height: mcalc('100vh', TOPBAR_H0),
  overflowY: 'auto',
}
</script>

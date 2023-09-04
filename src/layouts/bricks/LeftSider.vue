<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="COLLAPSE"
    :width="EXPAND"
    :collapsed="layoutStore.isSiderCollapsed"
    show-trigger
    @collapse="setCollapsed(true)"
    @expand="setCollapsed(false)"
    :native-scrollbar="false"
  >
    <n-card content-style="padding:0" header-style="padding: 0" class="h-full rounded-none">
      <template #header>
        <div class="fx-l cursor-pointer" @click="clickSiteLogo">
          <div :style="styled.logoWrapper" class="ccflex p-8px" hover="p-6px">
            <img :src="LogoImg" />
          </div>
          <div v-show="showTitle" :style="styled.titleWrapper" class="fx-l duration-300 p-2">
            <span class="text-18px">病原体数据库平台</span>
          </div>
        </div>
        <n-divider :style="{ marginTop: 0, marginBottom: 0 }" />
      </template>
      <n-menu :options="options" default-expand-all :indent="16" />
    </n-card>
  </n-layout-sider>
</template>

<script setup lang="ts">
import LogoImg from '@/assets/images/logo.png'
import { useOptions } from './LeftSider'
import { px, useLayoutStore, LSIDER_CO_W as COLLAPSE, LSIDER_EX_W as EXPAND } from '$/site/layout'

const layoutStore = useLayoutStore()

const showTitle = ref(!layoutStore.isSiderCollapsed)
const setCollapsed = (v: boolean) => {
  if (v) {
    showTitle.value = false
    setTimeout(() => (layoutStore.isSiderCollapsed = true), 1)
  } else {
    layoutStore.isSiderCollapsed = false
    setTimeout(() => (showTitle.value = true), 250)
  }
}

const styled = computed<StyleDataSet>(() => ({
  logoWrapper: {
    width: px(COLLAPSE - 2),
    height: px(COLLAPSE),
  },
  titleWrapper: {
    width: layoutStore.isSiderCollapsed ? 0 : px(EXPAND - COLLAPSE),
    height: px(COLLAPSE),
    opacity: layoutStore.isSiderCollapsed ? 0 : 1,
  },
}))

const { options } = useOptions()

const router = useRouter()
const clickSiteLogo = () => router.push('/')
</script>

<style lang="scss" scoped>
/* 侧边栏折叠按钮 */
.n-layout-sider:deep(.n-layout-toggle-button) {
  /* 按钮置于底部 */
  top: 97%;
  right: 50%;
  width: 32px;
  height: 32px;

  /* 按钮置于顶部 */
  // $size: 20px;
  // top: 56px;
  // right: 0;
  // width: $size;
  // height: $size;
  // border-radius: 0;
  // opacity: 0.5;
}
</style>

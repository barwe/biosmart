<template>
  <n-config-provider :theme="themeStore.theme" :theme-overrides="themeStore.themeOverrides">
    <n-message-provider>
      <api-message />
    </n-message-provider>
    <router-view v-if="alive" />
    <n-back-top :right="20" :bottom="20" />
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NBackTop, NMessageProvider, useMessage } from 'naive-ui'
import { useThemeStore } from '@/store/site/theme'

const ApiMessage = defineComponent({
  render: () => h('div'),
  mounted() {
    window.$message = useMessage()
  }
})

const themeStore = useThemeStore()

const alive = ref(true)
const reload = () => {
  alive.value = false
  nextTick(() => (alive.value = true))
}
provide('reload', reload)
</script>
<script setup lang="ts">
import { isEmpty, omit } from 'lodash'

interface Props {
  content?: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), { width: 500 })
const nprops = computed(() => omit(props, ['content', 'width']))
const style = computed(() => ({ maxWidth: `${props.width}px` }))
</script>

<template>
  <n-tooltip v-bind="nprops" :disabled="isEmpty(content)">
    <template #trigger>
      <slot></slot>
    </template>
    <div :style="style" v-html="content"></div>
  </n-tooltip>
</template>

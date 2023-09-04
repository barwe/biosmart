<script setup lang="ts">
const props = defineProps<{ value: string; change: (v: string) => void }>()
const emit = defineEmits(['update:value'])

let raw: string | null = null
if (!raw) raw = props.value

const text = ref(props.value)
const show = ref(false)

const theme = computed(() => (text.value === raw ? undefined : 'warning'))

const update = (v: string) => {
  text.value = v
}
const cancel = () => {
  text.value = raw!
  show.value = false
}
const reset = () => {
  text.value = raw!
}
const confirm = () => {
  props.change(text.value)
  emit('update:value', text.value)
  show.value = false
}

// FIXME 所有实例的回车事件都会被触发，需要检测当前打开实例
onKeyStroke('Enter', () => {})
</script>

<template>
  <div>
    <n-button text :type="theme" class="fx-l" @click="show = true">
      <span>{{ value }}</span>
      <span class="text-10px text-gray-500 ml-1">
        <i-ep-edit />
      </span>
    </n-button>
    <n-modal v-model:show="show" closable>
      <n-card class="w-[640px]" header-style="padding:12px" title="编辑文本">
        <slot :value="text" :update="update">
          <n-input v-model:value="text" />
        </slot>
        <template #footer>
          <div class="fx-c sx-2">
            <n-button type="default" @click="cancel">取消</n-button>
            <n-button type="warning" @click="reset">重置</n-button>
            <n-button type="primary" @click="confirm">确定</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

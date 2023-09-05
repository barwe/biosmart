<script setup lang="ts">
interface Props {
  value: number[]
  userOptions?: LVRecord<number>[]
}
const props = defineProps<Props>()
const emit = defineEmits(['submit'])

const show = ref(false)
const users = ref<number[]>(cloneDeep(props.value))
const submit = () => {
  emit('submit', cloneDeep(users.value))
  show.value = false
}
</script>

<template>
  <div>
    <n-button type="success" size="small" @click="show = true">用户</n-button>
    <n-modal v-model:show="show">
      <n-card title="关联用户" class="w-640px">
        <n-select
          v-model:value="users"
          :options="userOptions"
          multiple
          clearable
          filterable
          placeholder="（可选）选择关联此角色的用户"
        />
        <template #footer>
          <div class="fx-c">
            <n-button type="primary" @click="submit">提交</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

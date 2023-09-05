<script setup lang="ts">
import { isInvalidForm } from '@/utils/form'

defineProps<{ userOptions?: LVRecord<number>[] }>()
const emit = defineEmits(['submit'])

const show = ref(false)
const formRef = ref<FormInst>()
const form = ref({ name: '', description: '', users: [] as number[] })
const rules: FormRules = { name: { required: true, message: '角色名称不能为空' } }
const submit = async () => {
  if (await isInvalidForm(formRef)) return
  emit('submit', cloneDeep(form.value))
  show.value = false
}
</script>

<template>
  <div>
    <n-button type="primary" @click="show = true">新建角色</n-button>
    <n-modal v-model:show="show">
      <n-card title="新建角色" class="w-640px">
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" :label-width="120">
          <n-form-item label="角色名称" path="name">
            <n-input v-model:value="form.name" placeholder="请输入角色名称" />
          </n-form-item>
          <n-form-item label="描述信息">
            <n-input type="textarea" v-model:value="form.description" placeholder="请输入描述信息" />
          </n-form-item>
          <n-form-item label="关联用户">
            <n-select
              v-model:value="form.users"
              :options="userOptions"
              multiple
              clearable
              filterable
              placeholder="（可选）选择关联此角色的用户"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="fx-c">
            <n-button type="primary" @click="submit">提交</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

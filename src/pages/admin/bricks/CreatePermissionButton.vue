<script setup lang="ts">
import { permissionApi } from '@/api'
import { ResourceListItem } from '@/api/permission'
import { isInvalidForm } from '@/utils/form'

interface Props {
  roleId: number
  defaultModel?: number
  resourceList?: ResourceListItem[]
}
const props = defineProps<Props>()

const getDefaultValue = () => ({
  content_type: props.defaultModel,
  object_id: null as number | null,
  can_view: true,
  can_edit: false,
  can_delete: false,
})

const show = ref(false)
const formRef = ref<FormInst>()
const form = ref(getDefaultValue())
const rules: FormRules = {
  content_type: { required: true, message: '必须选择一个模型' },
  object_id: { required: true, message: '必须选择一个对象' },
}

const modelOptions = computed(() => {
  return props.resourceList?.map(d => ({ label: d.model, value: d.id }))
})

const objectOptions = computed(() => {
  if (!form.value.content_type) return []
  return props.resourceList?.find(d => d.id === form.value.content_type)!.options
})

const open = () => {
  form.value = getDefaultValue()
  show.value = true
}

const submit = async () => {
  if (await isInvalidForm(formRef)) return
  try {
    const req = { ...form.value, role: props.roleId }
    await permissionApi.create(req, '创建成功')
    // show.value = false
    reload()
  } catch {
    form.value = getDefaultValue()
  }
}
</script>

<template>
  <div>
    <div class="fx-r">
      <n-button type="primary" @click="open">添加</n-button>
    </div>
    <n-modal v-model:show="show">
      <n-card title="添加角色权限" class="w-640px">
        <n-form ref="formRef" :model="form" :rules="rules">
          <n-form-item label="模型" path="content_type">
            <n-select
              v-model:value="form.content_type"
              :options="modelOptions"
              filterable
              placeholder="请选择一个模型"
            />
          </n-form-item>
          <n-form-item label="对象" path="object_id">
            <n-select v-model:value="form.object_id" :options="objectOptions" filterable placeholder="请选择一个对象" />
          </n-form-item>
          <n-form-item label="设置权限">
            <div class="fx-l sx-4">
              <n-checkbox v-model:checked="form.can_view" />
              <span>允许查看</span>
              <n-checkbox v-model:checked="form.can_edit" />
              <span>允许编辑</span>
              <n-checkbox v-model:checked="form.can_delete" />
              <span>允许删除</span>
            </div>
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

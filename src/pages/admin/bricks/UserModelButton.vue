<script setup lang="ts">
import { adminApi } from '@/api'
import { DataTableColumn, NCheckbox } from 'naive-ui'

interface Props {
  user: DrfUser
  models: DrfModel[]
}
const props = defineProps<Props>()
const show = ref(false)

const defaults = { can_add: false, can_delete: false, can_edit: false, can_view: false }
const { data } = computableRef(() => {
  return props.models.map(d => {
    const mp = props.user.model_permissions[d.id]
    return { ...d, ...defaults, ...mp }
  })
}, [])

const getRender = (op: DrfOpType) => {
  const k = `can_${op}` as keyof DrfDrfModelOp
  const render = (row: DrfDrfModelOp) =>
    h(NCheckbox, {
      checked: row[k],
      focusable: false,
      onUpdateChecked: v => adminApi.updateUserModel(props.user.id, row.id, op, v).then(() => (row[k] = v)),
    })
  return render
}
const columns: DataTableColumn<DrfDrfModelOp>[] = [
  { title: '模型', key: 'model', align: 'center' },
  { title: '允许查看', key: 'can_view', align: 'center', render: getRender('view') },
  { title: '允许修改', key: 'can_edit', align: 'center', render: getRender('edit') },
  { title: '允许创建', key: 'can_add', align: 'center', render: getRender('add') },
  { title: '允许删除', key: 'can_delete', align: 'center', render: getRender('delete') },
]
</script>

<template>
  <div>
    <n-button type="success" size="small" @click="show = true">模型权限</n-button>
    <n-modal v-model:show="show">
      <n-card title="模型权限管理" class="w-[640px]">
        <n-data-table :columns="columns" :data="data" :pagination="false" :bordered="false" />
      </n-card>
    </n-modal>
  </div>
</template>

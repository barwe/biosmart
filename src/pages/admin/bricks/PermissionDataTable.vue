<script setup lang="ts">
import { DataTableColumn, NButton, NPopconfirm } from 'naive-ui'
import { renderCheckbox } from '@/components/db-render/bool'
// import { renderDatetimeText } from '@/components/db-render/datetime'
import { permissionApi } from '@/api'

interface Props {
  dataList: PermissionRecord[]
}
const props = withDefaults(defineProps<Props>(), { dataList: () => [] })

const { data, reset } = computableRef(() => props.dataList, [], { cloneDeep: true })

const update = async (obj: PermissionRecord, field: string, value: any) => {
  const updated = { [field]: value }
  assign(obj, updated)
  try {
    await permissionApi.update(obj.id, updated)
  } catch {
    reset()
  }
}

const canView = (row: PermissionRecord) => renderCheckbox(row, 'can_view', update)
const canEdit = (row: PermissionRecord) => renderCheckbox(row, 'can_edit', update)
const canDelete = (row: PermissionRecord) => renderCheckbox(row, 'can_delete', update)

const destroy = (row: PermissionRecord) => {
  permissionApi.destroy(row.id).then(reload)
}

const columns: DataTableColumn<PermissionRecord>[] = [
  // { title: 'ID', key: 'object_id', align: 'center' },
  { title: '名称', key: 'object_name', align: 'center' },
  { title: '允许查看', key: 'can_view', align: 'center', render: canView },
  { title: '允许编辑', key: 'can_edit', align: 'center', render: canEdit },
  { title: '允许删除', key: 'can_delete', align: 'center', render: canDelete },
  // { title: '创建时间', key: 'created_at', align: 'center', render: row => renderDatetimeText(row, 'created_at') },
  // { title: '更新时间', key: 'updated_at', align: 'center', render: row => renderDatetimeText(row, 'updated_at') },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        h(
          NPopconfirm,
          {
            positiveText: '确认',
            negativeText: '取消',
            onPositiveClick: () => destroy(row),
          },
          {
            trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
            default: () => '确定删除吗？',
          }
        ),
      ]),
  },
]
</script>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="false" :bordered="false" />
</template>

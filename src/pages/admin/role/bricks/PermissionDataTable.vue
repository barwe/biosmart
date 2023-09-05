<script setup lang="ts">
import { DataTableColumn, NCheckbox, NTime, NButton, NPopconfirm } from 'naive-ui'

interface Props {
  dataList: PermissionRecord[]
}
withDefaults(defineProps<Props>(), { dataList: () => [] })
const emit = defineEmits(['save', 'destroy'])

const columns: DataTableColumn<PermissionRecord>[] = [
  { title: 'ID', key: 'object_id', align: 'center' },
  { title: '名称', key: 'object_name', align: 'center' },
  {
    title: '允许查看',
    key: 'can_view',
    align: 'center',
    render: row => h(NCheckbox, { checked: row.can_view, onUpdateChecked: v => (row.can_view = v) }),
  },
  {
    title: '允许编辑',
    key: 'can_edit',
    align: 'center',
    render: row => h(NCheckbox, { checked: row.can_edit, onUpdateChecked: v => (row.can_edit = v) }),
  },
  {
    title: '允许删除',
    key: 'can_delete',
    align: 'center',
    render: row => h(NCheckbox, { checked: row.can_delete, onUpdateChecked: v => (row.can_delete = v) }),
  },
  {
    title: '创建时间',
    key: 'created_at',
    align: 'center',
    render: row => h(NTime, { time: new Date(row.created_at) }),
  },
  {
    title: '更新时间',
    key: 'updated_at',
    align: 'center',
    render: row => h(NTime, { time: new Date(row.updated_at) }),
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        h(
          NButton,
          {
            type: 'info',
            size: 'small',
            onClick: () => emit('save', { ...row }),
          },
          () => '保存'
        ),
        h(
          NPopconfirm,
          {
            positiveText: '确认',
            negativeText: '取消',
            onPositiveClick: () => emit('destroy', { ...row }),
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
  <n-data-table :columns="columns" :data="dataList" :pagination="false" :bordered="false" />
</template>

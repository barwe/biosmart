<script setup lang="ts">
import { NButton, NTime, DataTableColumn, NTag, NPopconfirm } from 'naive-ui'
import BrEditableText from '@/components/BrEditableText.vue'
import BrTooltip from '@/components/BrTooltip.vue'
import RoleUserList from './RoleUserList.vue'

interface Props {
  dataList: RoleRecord[]
  userOptions?: LVRecord<number>[]
}
const props = withDefaults(defineProps<Props>(), { dataList: () => [] })
const emit = defineEmits(['save', 'users', 'permission', 'destroy'])

const router = useRouter()
const columns: DataTableColumn<RoleRecord>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  {
    title: '角色名',
    key: 'name',
    render: row =>
      h(
        BrTooltip,
        { content: '点击修改角色名' },
        { default: () => h(BrEditableText, { key: row.id, value: row.name, change: v => (row.name = v) }) }
      ),
  },
  {
    title: '描述信息',
    key: 'description',
    render: row =>
      h(
        BrTooltip,
        { content: '点击修改描述信息' },
        {
          default: () => h(BrEditableText, { key: row.id, value: row.description, change: v => (row.description = v) }),
        }
      ),
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
    title: '关联用户',
    key: 'users',
    align: 'center',
    render: row =>
      h(
        'div',
        { class: 'fx-c sx-1' },
        row.users.map(id =>
          h(
            NTag,
            { type: 'info', size: 'small', class: 'rounded-6px' },
            () => props.userOptions?.find(d => d.value === id)?.label
          )
        )
      ),
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        h(NButton, { type: 'primary', size: 'small', onClick: () => emit('save', { ...row }) }, () => '保存'),
        h(RoleUserList, {
          value: row.users,
          userOptions: props.userOptions,
          onSubmit: v => emit('users', row, v),
        }),
        h(NButton, { type: 'info', size: 'small', onClick: () => router.push(`roles/${row.id}`) }, () => '权限'),
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

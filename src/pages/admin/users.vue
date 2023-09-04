<script setup lang="ts">
import { breadcrumb } from '$/site/breadcrumb'
breadcrumb.set([{ title: '权限管理', route: '' }, '用户列表'])

import { userApi } from '@/api'
const dataList = ref<UserRecord[]>([])
useRequest(async () => {
  dataList.value = await userApi.list()
})

import BrTooltip from '@/components/BrTooltip.vue'
import BrEditableText from '@/components/BrEditableText.vue'
import { NButton, NTime, NSwitch, DataTableColumn } from 'naive-ui'
const columns: DataTableColumn<UserRecord>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  {
    title: '用户名',
    key: 'username',
    render: row =>
      h(
        BrTooltip,
        { content: '点击修改用户名' },
        { default: () => h(BrEditableText, { key: row.id, value: row.username, change: v => (row.username = v) }) }
      ),
  },
  {
    title: '邮箱',
    key: 'email',
    render: row =>
      h(
        BrTooltip,
        { content: '点击修改邮箱' },
        { default: () => h(BrEditableText, { value: row.email, change: v => (row.email = v) }) }
      ),
  },
  {
    title: '最近登录',
    key: 'last_login',
    align: 'center',
    render: row => h(NTime, { time: new Date(row.last_login) }),
  },
  {
    title: '注册时间',
    key: 'date_joined',
    align: 'center',
    render: row => h(NTime, { time: new Date(row.date_joined) }),
  },
  {
    title: '启用账户',
    key: 'is_active',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_active, onUpdateValue: v => (row.is_active = v) }),
  },
  {
    title: '管理员',
    key: 'is_superuser',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_superuser, onUpdateValue: v => (row.is_superuser = v) }),
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: () =>
      h('div', { class: 'fx-c sx-2' }, [
        h(NButton, { type: 'primary', size: 'small', onClick: () => {} }, () => '保存'),
        h(NButton, { type: 'warning', size: 'small', onClick: () => {} }, () => '密码'),
        h(NButton, { type: 'info', size: 'small', onClick: () => {} }, () => '权限'),
        h(NButton, { size: 'small', type: 'error', disabled: true, onClick: () => {} }, () => '删除'),
      ]),
  },
]
</script>

<template>
  <n-data-table :columns="columns" :data="dataList" :pagination="false" :bordered="false" />
</template>

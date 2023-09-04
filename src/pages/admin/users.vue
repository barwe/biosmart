<script setup lang="ts">
import { breadcrumb } from '$/site/breadcrumb'
breadcrumb.set([{ title: '管理员', route: '' }, '用户列表'])

import { userApi } from '@/api'
const { data: dataList } = useRequest(userApi.list)

import { NButton, NTime, NSwitch, NInput, DataTableColumn } from 'naive-ui'
const saveUser = (user: UserRecord) => {
  $message.info(`未实现的功能 ${user}`)
}
const columns: DataTableColumn<UserRecord>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  {
    title: '用户名',
    key: 'username',
    render: row =>
      h(NInput, {
        value: row.username,
        onUpdateValue: v => (row.username = v),
        placeholder: '',
        size: 'small',
      }),
  },
  {
    title: '邮箱',
    key: 'email',
    render: row =>
      h(NInput, {
        value: row.email,
        onUpdateValue: v => (row.email = v),
        placeholder: '',
        size: 'small',
      }),
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
    title: '启用',
    key: 'is_active',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_active, onUpdateValue: v => (row.is_active = v) }),
  },
  {
    title: '管理员',
    key: 'is_stuff',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_stuff, onUpdateValue: v => (row.is_stuff = v) }),
  },
  {
    title: '超级管理员',
    key: 'is_superuser',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_superuser, onUpdateValue: v => (row.is_superuser = v) }),
  },
  {
    title: '设置密码',
    key: 'actions',
    render: row =>
      h(NInput, {
        value: row.password,
        onUpdateValue: v => (row.password = v),
        placeholder: '',
        size: 'small',
        type: 'password',
        showPasswordOn: 'click',
      }),
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row => [
      h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          class: 'mr-2',
          onClick: () => saveUser(row),
        },
        () => '保存'
      ),
      h(
        NButton,
        {
          size: 'small',
          type: 'error',
          disabled: true,
          onClick: () => {},
        },
        () => '删除'
      ),
    ],
  },
]
</script>

<template>
  <n-data-table :columns="columns" :data="dataList" :pagination="false" :bordered="false" />
</template>

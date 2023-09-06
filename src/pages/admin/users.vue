<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '用户'])
import { NButton, NTime, NSwitch, DataTableColumn, NPopconfirm } from 'naive-ui'
import BrEditableText from '@/components/BrEditableText.vue'
import BrTooltip from '@/components/BrTooltip.vue'
import CreateUser from './bricks/CreateUser.vue'
import UserModelButton from './bricks/UserModelButton.vue'
import UserRoleButton from './bricks/UserRoleButton.vue'
import { userApi, userPermissionApi } from '@/api'

const { data: rawdata } = useRequest(userPermissionApi.list)
const userList = computableRef(() => rawdata.value?.users, [])
const models = computed(() => rawdata.value?.models ?? [])
const roles = computed(() => rawdata.value?.roles ?? [])

const create = (data: Partial<DrfUser>) => {
  userApi.register(data).then(() => {
    $message.success(`成功创建用户 ${data.username}`)
    reload()
  })
}
const resetPassword = (user: DrfUser) => console.log(user)
const destroy = (row: DrfUser) => {
  userApi.destroy(row.id, `用户 ${row.username} 已删除`).then(reload)
}
const update = (row: DrfUser, k: string, v: string | number | boolean) => {
  const d = { [k]: v }
  userApi.update(row.id, d).then(() => {
    assign(row, d)
  })
}

const PermissionButton = (row: DrfUser) => {
  return h(
    BrTooltip,
    { content: '修改用户对模型的操作权限' },
    { default: () => h(UserModelButton, { user: row, models: models.value }) }
  )
}

const ResetPasswordButton = (row: DrfUser) => {
  return h(
    BrTooltip,
    { content: '重置用户密码' },
    {
      default: () =>
        h(NButton, { type: 'warning', size: 'small', disabled: true, onClick: () => resetPassword(row) }, () => '密码'),
    }
  )
}

const ChangeUsername = (row: DrfUser) => {
  return h(
    BrTooltip,
    { content: '点击修改用户名' },
    {
      default: () => h(BrEditableText, { key: row.id, value: row.username, change: v => update(row, 'username', v) }),
    }
  )
}

const ChangeEmail = (row: DrfUser) => {
  return h(
    BrTooltip,
    { content: '点击修改邮箱' },
    { default: () => h(BrEditableText, { value: row.email, change: v => update(row, 'email', v) }) }
  )
}

const ChangeUserRoleButton = (row: DrfUser) => {
  return h(
    BrTooltip,
    { content: '修改用户角色（数据操作权限）' },
    { default: () => h(UserRoleButton, { user: row, roles: roles.value }) }
  )
}

const DeleteButton = (row: DrfUser) => {
  return h(
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
  )
}

const columns: DataTableColumn<DrfUser>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: '用户名', key: 'username', render: ChangeUsername },
  { title: '邮箱', key: 'email', render: ChangeEmail },
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
    render: row => h(NSwitch, { value: row.is_active, onUpdateValue: v => update(row, 'is_active', v) }),
  },
  {
    title: '管理员',
    key: 'is_staff',
    align: 'center',
    render: row => h(NSwitch, { value: row.is_staff, onUpdateValue: v => update(row, 'is_staff', v) }),
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        ResetPasswordButton(row),
        PermissionButton(row),
        ChangeUserRoleButton(row),
        DeleteButton(row),
      ]),
  },
]
</script>

<template>
  <div>
    <div class="fx-l mb-2">
      <CreateUser @submit="create" />
    </div>
    <n-data-table :columns="columns" :data="userList" :pagination="false" :bordered="false" />
  </div>
</template>

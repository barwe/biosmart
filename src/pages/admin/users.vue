<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '用户'])
import { DataTableColumn } from 'naive-ui'
import CreateUserButton from './bricks/CreateUserButton.vue'
import { renderInput } from '@/components/db-render/text'
import { renderSwitch } from '@/components/db-render/bool'
import { renderDatetimeText } from '@/components/db-render/datetime'

import {
  useDataPrepare,
  renderUserPermissionButton,
  renderResetPasswordButton,
  renderUserRoleButton,
  renderUserDeleteButton,
} from './users'
import { userApi } from '@/api'

const { userList, models, roles } = useDataPrepare()

/** 更新用户信息 */
const updateUser = async (user: DrfUser, field: string, value: string | number | boolean) => {
  const updated = { [field]: value }
  await userApi.update(user.id, updated)
  assign(user, updated)
}

const renderUserUsername = (user: DrfUser) =>
  renderInput(user, 'username', updateUser, { tooltip: true, translation: '用户名' })
const renderUserEmail = (user: DrfUser) =>
  renderInput(user, 'email', updateUser, { tooltip: true, translation: '邮箱' })
const renderUserIsActive = (user: DrfUser) => renderSwitch(user, 'is_active', updateUser)
const renderUserIsStaff = (user: DrfUser) => renderSwitch(user, 'is_staff', updateUser)

const columns: DataTableColumn<DrfUser>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: '用户名', key: 'username', align: 'center', render: renderUserUsername },
  { title: '邮箱', key: 'email', align: 'center', render: renderUserEmail },
  { title: '最近登录', key: 'last_login', align: 'center', render: row => renderDatetimeText(row, 'last_login') },
  { title: '注册时间', key: 'date_joined', align: 'center', render: row => renderDatetimeText(row, 'date_joined') },
  { title: '启用账户', key: 'is_active', align: 'center', render: renderUserIsActive },
  { title: '管理员', key: 'is_staff', align: 'center', render: renderUserIsStaff },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        renderResetPasswordButton(row),
        renderUserPermissionButton(row, models.value),
        renderUserRoleButton(row, roles.value),
        renderUserDeleteButton(row),
      ]),
  },
]
</script>

<template>
  <div>
    <div class="fx-l mb-2">
      <CreateUserButton />
    </div>
    <n-data-table :columns="columns" :data="userList" :pagination="false" :bordered="false" />
  </div>
</template>

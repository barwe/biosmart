<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '角色'])
import { DataTableColumn, NButton, NPopconfirm } from 'naive-ui'
import { renderInput } from '@/components/db-render/text'
import { renderDatetimeText } from '@/components/db-render/datetime'
import CreateRoleButton from './bricks/CreateRoleButton.vue'
import RoleUserButton from './bricks/RoleUserButton.vue'
import RoleDataPermissions from './bricks/RoleDataPermissions.vue'
import { roleApi, adminApi } from '@/api'

const { data: rawdata } = useRequest(adminApi.listRoles)
const { data: dataList } = computableRef(() => rawdata.value?.roles, [])
const userOptions = computed(() => rawdata.value?.users.map(d => ({ label: d.username, value: d.id })))

const renderDeleteButton = (role: RoleRecord) => {
  return h(
    NPopconfirm,
    {
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick: () => roleApi.destroy(role.id, `角色 ${role.name} 已删除`).then(reload),
    },
    {
      trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
      default: () => '确定删除吗？',
    }
  )
}

const updateRole = async (role: RoleRecord, field: string, value: string | number | boolean) => {
  const updated = { [field]: value }
  await roleApi.update(role.id, updated)
  assign(role, updated)
}
const renderRoleName = (role: RoleRecord) =>
  renderInput(role, 'name', updateRole, { tooltip: true, translation: '角色名' })
const renderRoleDescription = (role: RoleRecord) =>
  renderInput(role, 'description', updateRole, { tooltip: true, translation: '描述信息' })
const renderRoleUsersButton = (row: RoleRecord) => {
  return h(RoleUserButton, { role: row, users: rawdata.value?.users ?? [] })
}
// const router = useRouter()
// const renderRolePermsButton = (row: RoleRecord) => {
//   return h(
//     NButton,
//     {
//       type: 'success',
//       size: 'small',
//       onClick: () => router.push(`roles/${row.id}`),
//     },
//     () => '数据权限'
//   )
// }
const renderDataPermission = (row: RoleRecord) => {
  return h(RoleDataPermissions, { roleId: row.id })
}

const columns: DataTableColumn<RoleRecord>[] = [
  { title: 'ID', key: 'id', align: 'center' },
  { title: '角色名', key: 'name', align: 'center', render: renderRoleName },
  { title: '描述信息', key: 'description', align: 'center', render: renderRoleDescription },
  { title: '创建时间', key: 'created_at', align: 'center', render: row => renderDatetimeText(row, 'created_at') },
  { title: '更新时间', key: 'updated_at', align: 'center', render: row => renderDatetimeText(row, 'updated_at') },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        renderRoleUsersButton(row),
        // renderRolePermsButton(row),
        renderDataPermission(row),
        renderDeleteButton(row),
      ]),
  },
]
</script>

<template>
  <div>
    <div class="fx-l mb-2">
      <CreateRoleButton :user-options="userOptions" />
    </div>
    <n-data-table :columns="columns" :data="dataList" :pagination="false" :bordered="false" />
  </div>
</template>

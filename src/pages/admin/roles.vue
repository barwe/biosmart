<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '角色'])

import RoleDataTable from './bricks/RoleDataTable.vue'
import CreateRole from './bricks/CreateRole.vue'
import { getUpdatedSubObject } from '@/utils/object'

import { roleApi, userApi } from '@/api'
const dataList = ref<RoleRecord[]>([])
useRequest(async () => {
  const list = await roleApi.list()
  list.forEach(d => (d._raw = cloneDeep(d)))
  dataList.value = list
})
const { data: userList } = useRequest(() => userApi.list({ fields: ['id', 'username'] }))
const userOptions = computed(() => userList.value?.map(d => ({ label: d.username, value: d.id })))

const create = (data: Partial<RoleRecord>) => {
  roleApi.create(data, `成功创建角色 ${data.name}`).then(reload)
}

const changeInfo = (row: RoleRecord) => {
  // 允许更新的字段
  const allowed = ['name', 'description']
  // 发生更新的字段及其字段值
  const updated = getUpdatedSubObject(pick(row, allowed), pick(row._raw, allowed))
  // 没有任何需要更新的数据
  if (isEmpty(updated)) return
  // 执行更新，然后重载页面
  roleApi.update(row.id, updated, `更新角色 ${row.name} 成功`).then(reload)
}

const changeUsers = (role: RoleRecord, users: number[]) => {
  roleApi.update(role.id, { users }, `成功更新角色 ${role.name} 关联的用户`).then(reload)
}

const changePermissions = (user: RoleRecord) => console.log(user)

const destroy = (row: RoleRecord) => {
  roleApi.destroy(row.id, `角色 ${row.name} 已删除`).then(reload)
}
</script>

<template>
  <div>
    <div class="fx-l mb-2">
      <CreateRole :user-options="userOptions" @submit="create" />
    </div>
    <RoleDataTable
      :data-list="dataList"
      :user-options="userOptions"
      @save="changeInfo"
      @users="changeUsers"
      @permission="changePermissions"
      @destroy="destroy"
    />
  </div>
</template>

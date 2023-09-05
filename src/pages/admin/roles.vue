<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '角色'])

import RoleDataTable from './bricks/RoleDataTable.vue'
import CreateRole from './bricks/CreateRole.vue'

import { roleApi, userApi } from '@/api'
const dataList = ref<RoleRecord[]>([])
useRequest(async () => {
  dataList.value = await roleApi.list()
})
const { data: userList } = useRequest(() => userApi.list({ fields: ['id', 'username'] }))
const userOptions = computed(() => userList.value?.map(d => ({ label: d.username, value: d.id })))

const create = (data: Partial<RoleRecord>) => {
  roleApi.create(data, `成功创建角色 ${data.name}`).then(reload)
}
const changeInfo = (user: UserRecord) => console.log(user)
const changeUsers = (role: RoleRecord, users: number[]) => {
  roleApi.update(role.id, { users }, `成功更新角色 ${role.name} 关联的用户`).then(reload)
}
const changePermissions = (user: UserRecord) => console.log(user)
const destroy = (user: UserRecord) => console.log(user)
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

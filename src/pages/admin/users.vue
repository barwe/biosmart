<script setup lang="ts">
import UserDataTable from './bricks/UserDataTable.vue'
import CreateUser from './bricks/CreateUser.vue'

import { breadcrumb } from '$/site/breadcrumb'
breadcrumb.set([{ title: '权限管理', route: '' }, '用户列表'])

import { userApi } from '@/api'
const dataList = ref<UserRecord[]>([])
useRequest(async () => {
  dataList.value = await userApi.list()
})

const create = (data: Partial<UserRecord>) => {
  userApi.create(data, `成功创建用户 ${data.username}`).then(reload)
}

const changeInfo = (user: UserRecord) => console.log(user)
const changePassword = (user: UserRecord) => console.log(user)
const changePermission = (user: UserRecord) => console.log(user)
const destroy = (user: UserRecord) => console.log(user)
</script>

<template>
  <div>
    <div class="fx-l mb-2">
      <CreateUser @submit="create" />
    </div>
    <UserDataTable
      :data-list="dataList"
      @save="changeInfo"
      @password="changePassword"
      @permission="changePermission"
      @destroy="destroy"
    />
  </div>
</template>

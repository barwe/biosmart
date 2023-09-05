<script setup lang="ts">
import UserDataTable from './bricks/UserDataTable.vue'

import { breadcrumb } from '$/site/breadcrumb'
breadcrumb.set([{ title: '权限管理', route: '' }, '用户列表'])

import { userApi } from '@/api'
const dataList = ref<UserRecord[]>([])
useRequest(async () => {
  dataList.value = await userApi.list()
})

const changeInfo = (user: UserRecord) => console.log(user)
const changePassword = (user: UserRecord) => console.log(user)
const changePermission = (user: UserRecord) => console.log(user)
const destroy = (user: UserRecord) => console.log(user)
</script>

<template>
  <UserDataTable
    :data-list="dataList"
    @save="changeInfo"
    @password="changePassword"
    @permission="changePermission"
    @destroy="destroy"
  />
</template>

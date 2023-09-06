<script setup lang="ts">
breadcrumb.set([{ title: '权限', route: '' }, '用户'])
import { NButton, NTime, NSwitch, DataTableColumn, NPopconfirm } from 'naive-ui'
import BrEditableText from '@/components/BrEditableText.vue'
import BrTooltip from '@/components/BrTooltip.vue'
import CreateUser from './bricks/CreateUser.vue'
import UserModelButton from './bricks/UserModelButton.vue'
import { userApi, userPermissionApi } from '@/api'

const { data: rawdata } = useRequest(userPermissionApi.list)
const userList = computableRef(() => rawdata.value?.users, [])
const models = computed(() => rawdata.value?.models ?? [])

const create = (data: Partial<DrfUser>) => {
  userApi.register(data).then(() => {
    $message.success(`成功创建用户 ${data.username}`)
    reload()
  })
}
const saveBaseInfo = (user: DrfUser) => console.log(user)
const resetPassword = (user: DrfUser) => console.log(user)
const changeRoles = (user: DrfUser) => console.log(user)
const destroy = (row: DrfUser) => {
  userApi.destroy(row.id, `用户 ${row.username} 已删除`).then(reload)
}

const columns: DataTableColumn<DrfUser>[] = [
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
    render: row =>
      h('div', { class: 'fx-c sx-2' }, [
        h(
          BrTooltip,
          { content: '保存用户基本信息' },
          {
            default: () =>
              h(
                NButton,
                {
                  type: 'primary',
                  size: 'small',
                  onClick: () => saveBaseInfo(row),
                },
                () => '保存'
              ),
          }
        ),
        h(
          BrTooltip,
          { content: '重置用户密码' },
          {
            default: () =>
              h(
                NButton,
                {
                  type: 'warning',
                  size: 'small',
                  onClick: () => resetPassword(row),
                },
                () => '密码'
              ),
          }
        ),
        h(
          BrTooltip,
          { content: '修改用户对模型的操作权限' },
          {
            default: () =>
              h(UserModelButton, {
                user: row,
                models: models.value,
              }),
          }
        ),
        h(
          BrTooltip,
          { content: '修改用户角色（数据操作权限）' },
          {
            default: () =>
              h(
                NButton,
                {
                  type: 'info',
                  size: 'small',
                  onClick: () => changeRoles(row),
                },
                () => '角色'
              ),
          }
        ),
        h(
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
        ),
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

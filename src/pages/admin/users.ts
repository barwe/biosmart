import { NButton, NPopconfirm } from 'naive-ui'
import { adminApi, userApi } from '@/api'
import BrTooltip from '@/components/BrTooltip.vue'
import UserModelButton from './bricks/UserModelButton.vue'
import UserRoleButton from './bricks/UserRoleButton.vue'
import ResetPasswordButton from './bricks/ResetPasswordButton.vue'

/** 准备数据 */
export const useDataPrepare = () => {
  const { data: rawdata } = useRequest(adminApi.listUsers)
  const { data: userList } = computableRef(() => rawdata.value?.users, [])
  const models = computed(() => rawdata.value?.models ?? [])
  const roles = computed(() => rawdata.value?.roles ?? [])
  return { userList, models, roles }
}

/** 用户（模型）权限按钮 */
export const renderUserPermissionButton = (user: DrfUser, models: DrfModel[]) => {
  return h(
    BrTooltip,
    { content: '修改用户对模型的操作权限' },
    { default: () => h(UserModelButton, { user, models: models }) }
  )
}

/** 密码重置按钮 */
export const renderResetPasswordButton = (user: DrfUser) => {
  const reset = (v: string) => adminApi.updateUserPassword(user.id, v)

  // const Button = h(NButton, { type: 'warning', size: 'small', onClick: reset }, () => '密码')
  const Button = h(ResetPasswordButton, { onSubmit: v => reset(v) })
  return h(BrTooltip, { content: '重置用户密码' }, { default: () => Button })
}

/** 用户角色按钮 */
export const renderUserRoleButton = (user: DrfUser, roles: RoleRecord[]) => {
  return h(
    BrTooltip,
    { content: '修改用户角色（数据操作权限）' },
    { default: () => h(UserRoleButton, { user, roles }) }
  )
}

/** 删除用户按钮 */
export const renderUserDeleteButton = (user: DrfUser) => {
  return h(
    NPopconfirm,
    {
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick: () => userApi.destroy(user.id, `用户 ${user.username} 已删除`).then(reload),
    },
    {
      trigger: () => h(NButton, { size: 'small', type: 'error' }, () => '删除'),
      default: () => '确定删除吗？',
    }
  )
}

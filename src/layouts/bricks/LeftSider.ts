import { NIcon, MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
// import { useUserStore } from '$/site/user'
import IUser from '~icons/ph/folder-simple-user-thin'

export const renderIcon = (icon: VueComponent) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/** 将文本渲染成链接 */
const renderLabelRouter = (label: string, to: string) => {
  return () => h(RouterLink, { to }, { default: () => label })
}

const baseOptions: MenuOption[] = []

const adminOptions: MenuOption[] = [
  {
    key: 'admin',
    icon: renderIcon(IUser),
    label: renderLabelRouter('权限管理', ''),
    children: [
      { key: 'admin-users', icon: renderIcon(IUser), label: renderLabelRouter('用户', '/admin/users') },
      { key: 'admin-roles', icon: renderIcon(IUser), label: renderLabelRouter('角色', '/admin/roles') },
    ],
  },
]

export function useOptions() {
  // const userStore = useUserStore()
  const options = computed(() => {
    // return userStore.profile?.is_superuser ? [...baseOptions, ...adminOptions] : baseOptions
    return [...baseOptions, ...adminOptions]
  })
  return { options }
}

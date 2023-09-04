<template>
  <div class="fx-l pl-4">
    <div class="fy-r mr-3">
      <span class="text-1rem">{{ user?.username }}</span>
      <span class="text-[0.5rem]">{{ user?.email }}</span>
    </div>
    <n-popover trigger="hover" placement="bottom-end" :show-arrow="false">
      <template #trigger>
        <n-avatar round size="small" :src="DefaultAvatar" class="cursor-pointer" />
      </template>
      <n-card :bordered="false" content-style="padding:4px;padding-top:16px" :style="userCardStyle" class="rounded-md">
        <div class="fy-c sy-2">
          <n-avatar round :size="80" :src="DefaultAvatar" class="cursor-pointer" />
          <div class="fx-l sx-2">
            <span text="1.2rem">{{ user?.username }}</span>
            <n-button text @click="updateUserData">
              <i-material-symbols-refresh-rounded />
            </n-button>
          </div>
          <span text="0.8rem">{{ user?.email }}</span>
        </div>
        <n-divider style="margin-bottom: 16px" />
        <div class="w-full fy-l">
          <n-menu :options="menuOptions" class="w-full" />
        </div>
      </n-card>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { NIcon, MenuOption } from 'naive-ui'
import IconSettings from '~icons/ep/setting'
import IconLogout from '~icons/ri/logout-circle-r-line'
import { useUserStore } from '$/site/user'
import DefaultAvatar from '@/assets/images/avatar.png'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const renderIcon = (icon: VueComponent) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const router = useRouter()

const userCardStyle = { width: '200px' }

const gotoUserProfile = () => router.push(`/users/${user.value?.id}`)

const menuOptions: MenuOption[] = [
  {
    label: () => h('a', { onClick: gotoUserProfile }, '用户中心'),
    key: 'Profile',
    icon: renderIcon(IconSettings),
  },
  {
    label: () =>
      h(
        'a',
        {
          onClick: async () => {
            userStore.logout()
            setTimeout(() => router.push('/login'), 100)
          },
        },
        '退出登录'
      ),
    key: 'Logout',
    icon: renderIcon(IconLogout),
  },
]

const updateUserData = () => userStore.update({}, '更新用户资料成功')
</script>

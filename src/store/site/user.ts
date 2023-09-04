import { defineStore } from 'pinia'
import { userApi } from '@/api'

interface FavoriteItem {
  title: string
  url: string
}

export const useUserStore = defineStore(
  'site-user',
  () => {
    const token = ref('')
    const isLogin = computed(() => token.value)

    const user = ref<UserRecord>()
    const userId = computed(() => user.value?.id)

    const favorites = ref<FavoriteItem[]>([])
    const setFavorites = (list: FavoriteItem[]) => {
      favorites.value = list
    }

    const login = async (data: { username: string; password: string }) => {
      const rd = await userApi.login(data)
      token.value = rd.token
      user.value = rd.user
    }

    const logout = () => {
      token.value = ''
      user.value = undefined
    }

    const update = async (data: Partial<UserRecord>, log?: string) => {
      if (!user.value?.id) return undefined
      user.value = await userApi.update(user.value.id, data, log)
      return user
    }

    return { token, user, userId, favorites, setFavorites, login, logout, isLogin, update }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ key: 'biosmart-userdata', storage: localStorage, paths: ['token', 'user'] }],
    },
  }
)

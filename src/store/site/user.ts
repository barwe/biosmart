import { defineStore } from 'pinia'

interface FavoriteItem {
  title: string
  url: string
}

export const useUserStore = defineStore('site-user', () => {
  const token = ref('')

  const profile = ref<UserRecord>()
  const userId = computed(() => profile.value?.id)

  const favorites = ref<FavoriteItem[]>([])
  const setFavorites = (list: FavoriteItem[]) => {
    favorites.value = list
  }

  const logout = () => {}

  return { token, profile, userId, favorites, setFavorites, logout }
})

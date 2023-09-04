<script setup lang="ts">
import FavorList from './FavorList.vue'
import { useUserStore } from '$/site/user'
import { useBreadcrumbStore } from '$/site/breadcrumb'

const route = useRoute()
const userStore = useUserStore()
const breadcrumbStore = useBreadcrumbStore()
// const site = useSiteStore()

// const title = computed(() => site.breadcrumbs.map(d => d.title).join(' / '))
const list = ref([...userStore.favorites])
const stared = ref<boolean>()
const shown = ref(false)

watch(
  () => breadcrumbStore.title,
  t => {
    stared.value = !!list.value.find(d => d.title === t)
  },
  { immediate: true }
)

const star = () => {
  stared.value = !stared.value
  if (stared.value) {
    const item = { title: breadcrumbStore.title, url: route.fullPath }
    if (!list.value.find(d => d.title === item.title)) {
      list.value = [...list.value, item]
    }
  } else {
    list.value = list.value.filter(d => d.title !== breadcrumbStore.title)
  }
  userStore.setFavorites(list.value)
}

// 通过右侧书签面板移除书签时更新星星的状态
watch(
  () => userStore.favorites,
  arr => {
    stared.value = arr.map(d => d.title).includes(breadcrumbStore.title)
  }
)
</script>

<template>
  <n-popover v-model:show="shown" trigger="hover" placement="bottom-start">
    <template #trigger>
      <n-button text @click="star">
        <i-ic-outline-star v-if="stared" class="square-5 text-pink-400" />
        <i-ic-outline-star-border v-else class="square-5 text-gray-500" />
      </n-button>
    </template>
    <div class="space-y-2">
      <FavorList />
    </div>
  </n-popover>
</template>

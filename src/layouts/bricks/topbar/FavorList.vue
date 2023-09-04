<script setup lang="ts">
import { useBreadcrumbStore } from '$/site/breadcrumb'
import { useUserStore } from '$/site/user'

const breadcrumbStore = useBreadcrumbStore()
const userStore = useUserStore()

const theme = (t: string) => (t === breadcrumbStore.title ? 'primary' : undefined)

const list = ref<{ title: string; url: string }[]>([])
watch(
  () => userStore.favorites,
  ls => (list.value = [...(ls ?? [])]),
  { immediate: true }
)

const stared = ref<boolean>()
watch(
  () => breadcrumbStore.title,
  t => {
    stared.value = !!list.value.find(d => d.title === t)
  },
  { immediate: true }
)

const router = useRouter()
const clickItem = (url: string) => router.push(url)

const removeItem = (t: string) => {
  list.value = list.value.filter(d => d.title !== t)
  userStore.setFavorites(list.value)
  if (t === breadcrumbStore.title) stared.value = false
}

const moveCard = (dragIndex: number, hoverIndex: number) => {
  const item = list.value[dragIndex]
  list.value.splice(dragIndex, 1)
  list.value.splice(hoverIndex, 0, item)
  userStore.setFavorites(list.value)
}
</script>

<template>
  <div class="sy-2">
    <BrOrderableListItem v-for="(d, i) in list" :key="d.title" :id="d.title" :index="i" :move-card="moveCard">
      <div class="fx-l sx-2">
        <n-button text type="error" @click="removeItem(d.title)">
          <i-icon-park-outline-reduce-one />
        </n-button>
        <n-button text :type="theme(d.title)" @click="clickItem(d.url)">
          <span class="text-14px">{{ d.title }}</span>
        </n-button>
      </div>
    </BrOrderableListItem>
  </div>
</template>

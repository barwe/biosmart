<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import { useBreadcrumbStore } from '$/site/breadcrumb'

const router = useRouter()
const store = useBreadcrumbStore()

const go = (route: RouteLocationRaw) => router.push(route)
</script>

<template>
  <div class="fx-l">
    <template v-for="(d, i) in store.breadcrumbs" :key="i">
      <div v-if="d">
        <n-button v-if="d.route" text @click="go(d.route)">{{ d.title }}</n-button>
        <span v-else class="select-none text-gray-400">{{ d.title }}</span>
        <span v-if="i < store.breadcrumbs.length - 1" class="px-2">/</span>
      </div>
      <div v-else>[Error]</div>
    </template>
    <n-spin v-show="store.loading" class="w-16px h-16px ml-2" />
  </div>
</template>

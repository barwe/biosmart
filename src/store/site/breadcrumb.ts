import type { RouteLocationRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { isString } from 'lodash'

export interface BreadcrumbItem {
  title: string
  route: RouteLocationRaw
}

export const useBreadcrumbStore = defineStore('site-breadcrumb', () => {
  const loading = ref(false)
  const breadcrumbs = ref<BreadcrumbItem[]>([])
  const setBreadcrumbs = (list: (string | BreadcrumbItem)[]) => {
    breadcrumbs.value = list.map(v => (isString(v) ? { title: v, route: '' } : v))
  }
  const title = computed(() => breadcrumbs.value.map(d => d.title).join(' / '))
  return { loading, breadcrumbs, setBreadcrumbs, title }
})

export const breadcrumb = {
  set(list: (string | BreadcrumbItem)[]) {
    const store = useBreadcrumbStore()
    store.setBreadcrumbs(list)
  },
  /** 资源列表页，例如 /users */
  list(title: string) {
    const store = useBreadcrumbStore()
    store.setBreadcrumbs([title])
  },
  /** 资源详情页，例如 /users/1 */
  detail(listTitle: string, listRoute: string, title: string) {
    const store = useBreadcrumbStore()
    store.setBreadcrumbs([{ title: listTitle, route: listRoute }, title])
  },
  editPage(listTitle: string, listRoute: string, detailTitle: string, detailRoute: string, editTitle?: string) {
    const store = useBreadcrumbStore()
    store.setBreadcrumbs([
      { title: listTitle, route: listRoute },
      { title: detailTitle, route: detailRoute },
      editTitle ?? '编辑',
    ])
  },
  /** 资源创建页，形如 /users/create */
  create(listTitle: string, listRoute: string, title = '新建') {
    const store = useBreadcrumbStore()
    store.setBreadcrumbs([{ title: listTitle, route: listRoute }, title])
  },
}

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [{ path: 'admin/users', component: () => import('#/admin/users.vue') }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

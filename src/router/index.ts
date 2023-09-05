import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { name: 'login', path: '/login', component: () => import('#/login.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      { path: 'admin/users', component: () => import('#/admin/users.vue') },
      { path: 'admin/roles', component: () => import('#/admin/roles.vue') },
      { path: 'admin/roles/:id', component: () => import('#/admin/role/detail.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

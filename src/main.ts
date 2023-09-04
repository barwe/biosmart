import 'virtual:windi.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from './router'
import { useUserStore } from '$/site/user'
router.beforeEach((to, _, next) => {
  const store = useUserStore()
  if (store.isLogin) {
    if (to.name === 'login') {
      $message.info('您已登录, 无需重复登录。如需切换用户, 请先退出登录')
      next('/')
    } else if (to.name === 'register') {
      $message.info('注册新账号请先退出登录')
      next('/')
    } else {
      next()
    }
  } else if (to.meta.public) next()
  else {
    $message.info('访问此页面需要您登录')
    next(`/login?goto=${to.path}`)
  }
})
app.use(router)

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')

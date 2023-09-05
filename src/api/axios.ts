import axios, { AxiosRequestHeaders } from 'axios'
import { useUserStore } from '@/store/site/user'

const instance = axios.create({ baseURL: '/api' })

instance.interceptors.request.use(async config => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders
  const store = useUserStore()
  if (store.isLogin) {
    config.headers.Authorization = `Token ${store.token}`
  }
  return config
})

instance.interceptors.response.use(
  response => {
    const status = response.status.toString()
    if (status.startsWith('2')) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error.response.data)
    const { message } = error.response.data ?? {}
    $message.error(message, { duration: 10000, closable: true })
    return Promise.resolve(undefined)
  }
)

export default instance

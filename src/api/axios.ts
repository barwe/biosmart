import axios, { AxiosRequestHeaders } from 'axios'
import { useUserStore } from '@/store/site/user'
import { isString } from 'lodash'

const instance = axios.create({ baseURL: '/api' })

instance.interceptors.request.use(async config => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders
  const store = useUserStore()
  if (store.isLogin) {
    config.headers.Authorization = `Token ${store.token}`
  }
  return config
})

const showErrorMessage = (msg: string) => {
  $message.error(msg, { duration: 10000, closable: true })
}

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
    // 后端返回的错误提示一般位于 message 或者 detail 中
    const { message, detail } = error.response.data
    if (message) showErrorMessage(message)
    if (detail) {
      if (isString(detail)) showErrorMessage(detail)
      else showErrorMessage(JSON.stringify(detail))
    }
    if (!message && !detail) {
      showErrorMessage(JSON.stringify(error.response.data))
    }
    return Promise.reject(undefined)
  }
)

export default instance

import axios, { AxiosRequestHeaders } from 'axios'

const instance = axios.create({ baseURL: '/api' })

instance.interceptors.request.use(async config => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders
  // const site = useSiteStore()
  // if (site.userToken) {
  //   config.headers.Authorization = `Token ${site.userToken}`
  // }
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
    const { message } = error.response.data ?? {}
    $message.error(message, { duration: 10000, closable: true })
    return Promise.resolve(undefined)
  }
)

export default instance

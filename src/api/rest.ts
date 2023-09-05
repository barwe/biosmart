import type { AxiosInstance } from 'axios'

type PagedResponseData<T> = {
  page: number
  pages: number
  total: number
  rows: T[]
}

interface QueryParams {
  fields?: string[]
}

export function getRest<T extends { id: number }>(
  api: AxiosInstance,
  resources: string,
  url?: (resources: string) => string
) {
  const prefix = url ? url(resources) : resources

  const list = async (params?: QueryParams) => {
    const r = await api.get<T[]>(`${prefix}/`, { params })
    return r.data
  }

  const predata = async <R = SARecord>(keys?: string[]) => {
    const params = { keys }
    const r = await api.get<R>(`${prefix}/predata/`, { params })
    return r.data
  }

  const listPage = async (page?: number, pageSize?: number, QueryParams?: QueryParams) => {
    const params = { page: page ?? 0, page_size: pageSize ?? 10, ...QueryParams }
    const r = await api.get<PagedResponseData<T>>(`${prefix}/`, { params })
    return r.data
  }

  const retrieve = async (id: number | string, params?: QueryParams) => {
    const r = await api.get<T>(`${prefix}/${id}/`, { params })
    return r.data
  }

  const destroy = async (id: number | string, log?: string) => {
    const r = await api.delete(`${prefix}/${id}/`)
    const success = r && r.status === 204
    if (success && log) $message.success(log)
    return success
  }

  const create = async <D = SARecord>(data: D, log?: string) => {
    const r = await api.post<T>(`${prefix}/`, data)
    const success = r.data.id
    if (success && log) $message.success(log)
    return r.data
  }

  const update = async (id: number | string, data: Partial<T> | FormData, log?: string) => {
    const r = await api.patch<T>(`${prefix}/${id}/`, data)
    const success = r.data.id
    if (success && log) $message.success(log)
    return r.data
  }

  return {
    prefix,
    axios: api,
    detailUrl: (id: number | string) => `${prefix}/${id}/`,
    customUrl: (action?: string) => `${prefix}/${action}/`,
    apiset: {
      /** 一次性获取所有数据 */
      list,
      /** 用于获取列表页搜索或者表单页需要的其他数据 */
      predata,
      /** 分页获取数据列表 */
      listPage,
      /** 取回单个数据 */
      retrieve,
      /** 删除单个数据 */
      destroy,
      /** 创建单个数据 */
      create,
      /** 更新单个资源 */
      update,
    },
  }
}

import axios from './axios'
import { getRest } from './rest'

export type ResourceListItem = { id: number; model: string; options: LVRecord<number>[] }

const { apiset, customUrl } = getRest<PermissionRecord>(axios, 'permissions')

export default {
  ...apiset,
  async getResourceOptions() {
    const rd = await axios.get(customUrl('get_resource_options'))
    return rd.data as ResourceListItem[]
  },
}

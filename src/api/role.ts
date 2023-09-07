import axios from './axios'
import { getRest } from './rest'

const { apiset, customUrl } = getRest<RoleRecord>(axios, 'roles')

export default {
  ...apiset,
  async listDataPermissions(role: number) {
    const rd = await axios.get(customUrl(`${role}/list_permissions`))
    return rd.data as {
      role: RoleRecord
      permissions: PermissionRecord[]
      resources: { id: number; model: string; options: LVRecord<number>[] }[]
    }
  },
}

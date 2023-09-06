import axios from './axios'
import { getRest } from './rest'

const { customUrl } = getRest<RoleRecord>(axios, 'user-permissions')

export default {
  async list() {
    const rd = await axios.get(customUrl('list'))
    return rd.data as {
      users: DrfUser[]
      models: DrfModel[]
    }
  },

  async update(user: number, model: number, operation: DrfOpType, value: DrfOpValue) {
    const data = { user, model, operation, value }
    await axios.patch(customUrl('update'), data)
  },
}

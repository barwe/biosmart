import axios from './axios'
import { getRest } from './rest'

interface AuthResult {
  token: string
  user: DrfUser
}

const { apiset, customUrl } = getRest<DrfUser>(axios, 'users')

export default {
  ...apiset,
  async login(data: Pick<DrfUser, 'username' | 'password'>) {
    const rd = await axios.post(customUrl('login'), data)
    return rd.data as AuthResult
  },
  async register(data: Partial<DrfUser>) {
    const rd = await axios.post(customUrl('register'), data)
    return rd.data as AuthResult
  },
}

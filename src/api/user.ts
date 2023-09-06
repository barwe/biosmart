import axios from './axios'
import { getRest } from './rest'

interface AuthResult {
  token: string
  user: DrfUser
}

const { apiset, customUrl } = getRest<DrfUser>(axios, 'users')

const login = async (data: Pick<DrfUser, 'username' | 'password'>) => {
  const r = await axios.post(customUrl('login'), data)
  return r?.data as AuthResult
}

const register = async (data: Partial<DrfUser>) => {
  const r = await axios.post(customUrl('register'), data)
  return r?.data as AuthResult
}

export default { ...apiset, login, register }

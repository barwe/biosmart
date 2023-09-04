import axios from './axios'
import { getRest } from './rest'

interface AuthResult {
  token: string
  profile: UserRecord
}

const { apiset, customUrl } = getRest(axios, 'users')

const login = async (data: Pick<UserRecord, 'username' | 'password'>) => {
  const r = await axios.post(customUrl('login'), data)
  return r?.data as AuthResult | undefined
}

const register = async (data: Pick<UserRecord, 'username' | 'password' | 'email'>) => {
  const r = await axios.post(customUrl('register'), data)
  return r?.data as AuthResult | undefined
}

export default { ...apiset, login, register }

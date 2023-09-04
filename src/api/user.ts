import axios from './axios'
import { getRest } from './rest'

interface AuthResult {
  token: string
  user: UserRecord
}

const { apiset, customUrl } = getRest<UserRecord>(axios, 'users')

const login = async (data: Pick<UserRecord, 'username' | 'password'>) => {
  // const r = await axios.post(customUrl('login'), data)
  const r = await axios.post('login/', data)
  return r?.data as AuthResult
}

const register = async (data: Pick<UserRecord, 'username' | 'password' | 'email'>) => {
  const r = await axios.post(customUrl('register'), data)
  return r?.data as AuthResult
}

export default { ...apiset, login, register }

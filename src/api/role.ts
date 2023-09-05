import axios from './axios'
import { getRest } from './rest'

const { apiset } = getRest<RoleRecord>(axios, 'roles')

export default apiset

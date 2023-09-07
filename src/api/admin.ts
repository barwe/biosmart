import axios from './axios'

interface ListUsersResult {
  users: DrfUser[]
  models: DrfModel[]
  roles: RoleRecord[]
}

export default {
  /** 用户列表 */
  async listUsers() {
    const rd = await axios.get('admin/list_users/')
    return rd.data as ListUsersResult
  },
  /** 更新用户密码 */
  async updateUserPassword(user: number, password: string) {
    axios.patch('admin/update_user_password/', { user, password })
  },
  /** 更新用户的模型权限 */
  async updateUserModel(user: number, model: number, operation: DrfOpType, value: boolean) {
    const data = { user, model, operation, value: value ? 'enabled' : 'disabled' }
    await axios.patch('admin/update_user_model/', data)
  },
  /** 更新用户的角色列表（数据权限） */
  async updateUserRoles(user: number, roles: number[]) {
    const data = { user, roles }
    await axios.patch('admin/update_user_roles/', data)
  },
  /** 角色列表 */
  async listRoles() {
    const rd = await axios.get('admin/list_roles/')
    return rd.data as ListUsersResult
  },
  /** 更新角色的用户列表 */
  async updateRoleUsers(role: number, users: number[]) {
    const data = { role, users }
    await axios.patch('admin/update_role_users/', data)
  },
}

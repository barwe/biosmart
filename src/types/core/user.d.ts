/** 用户对模型的操作权限种类 */
declare interface DrfUserPermission {
  id: number
  name: string
  content_type: number
  codename: string
}

/** 用户 */
declare interface DrfUser {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  date_joined: string
  last_login: string

  model_permissions: {
    [model_id: number]: {
      [can_op: string]: boolean
    }
  }

  user_roles: RoleRecord[]
}

/** 模型 */
declare interface DrfModel {
  id: number
  app_label: string
  model: string
}

/** 某用户对模型的操作状态 */
declare interface DrfDrfModelOp extends DrfModel {
  can_add: boolean
  can_delete: boolean
  can_view: boolean
  can_edit: boolean
}

declare type DrfOpType = 'view' | 'add' | 'edit' | 'delete'
declare type DrfOpValue = 'enabled' | 'disabled'

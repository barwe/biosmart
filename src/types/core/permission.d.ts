declare interface PermissionRecord {
  id: number
  role: number
  model_id: number
  model_name: string
  object_id: number
  object_name: string
  can_view: boolean
  can_edit: boolean
  can_delete: boolean
  created_at: string
  updated_at: string
}

declare interface PermissionRecord extends BaseRecord<PermissionRecord> {
  role: number
  model_id: number
  model_name: string
  object_id: number
  object_name: string
  can_view: boolean
  can_edit: boolean
  can_delete: boolean
}

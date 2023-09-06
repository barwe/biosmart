declare interface RoleRecord extends BaseRecord<RoleRecord> {
  name: string
  description: string
  users: number[]
}

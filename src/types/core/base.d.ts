declare interface BaseRecord<T> {
  id: number
  created_at: string
  updated_at: string
  _raw: T
}

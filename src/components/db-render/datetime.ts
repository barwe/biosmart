import { get } from 'lodash'
import { NTime } from 'naive-ui'

export const renderDatetimeText = <T, D = unknown>(
  data: T,
  field: string,
  _update?: (data: T, field: string, value: string) => Promise<D>
) => {
  return h(NTime, { time: new Date(get(data, field)) })
}

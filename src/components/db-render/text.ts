import { get, isString } from 'lodash'
import BrTooltip from '@/components/BrTooltip.vue'
import BrEditableText from '@/components/BrEditableText.vue'

/**
 * 修改模型数据的 CharField 字段值，然后同步到数据库。
 * @param data 数据对象
 * @param field 需要更新的字段
 * @param update 更新回调
 * @param options.tooltip 是否带弹出提示或者直接指定显示的文本
 * @param options.translation 弹出提示中的字段翻译
 */
export const renderInput = <T, D = unknown>(
  data: T,
  field: string,
  update?: (data: T, field: string, value: string) => Promise<D>,
  options?: {
    tooltip?: boolean | string
    translation?: string
  }
) => {
  const EditText = h(BrEditableText, {
    value: get(data, field),
    change: v => {
      if (!update) return undefined
      return update(data, field, v)
    },
  })

  if (!options || !options.tooltip) return EditText

  const { tooltip, translation } = options
  const content = isString(tooltip) ? tooltip : `点击修改${translation ?? field}`
  return h(BrTooltip, { content }, { default: () => EditText })
}

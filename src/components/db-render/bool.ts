import { get, isString } from 'lodash'
import { NCheckbox, NSwitch } from 'naive-ui'
import BrTooltip from '@/components/BrTooltip.vue'

export const renderSwitch = <T, D = unknown>(
  data: T,
  field: string,
  update?: (data: T, field: string, value: boolean) => Promise<D>,
  options?: {
    tooltip?: boolean | string
    translation?: string
  }
) => {
  const Switch = h(NSwitch, {
    value: get(data, field),
    onUpdateValue: v => {
      if (!update) return undefined
      return update(data, field, v)
    },
  })
  if (!options || !options.tooltip) return Switch
  const { tooltip, translation } = options
  const content = isString(tooltip) ? tooltip : `点击修改${translation ?? field}`
  return h(BrTooltip, { content }, { default: () => Switch })
}

export const renderCheckbox = <T, D = unknown>(
  data: T,
  field: string,
  update?: (data: T, field: string, value: boolean) => Promise<D>,
  options?: {
    tooltip?: boolean | string
    translation?: string
  }
) => {
  const Checkbox = h(NCheckbox, {
    checked: get(data, field),
    onUpdateChecked: v => {
      if (!update) return undefined
      return update(data, field, v)
    },
  })
  if (!options || !options.tooltip) return Checkbox
  const { tooltip, translation } = options
  const content = isString(tooltip) ? tooltip : `点击修改${translation ?? field}`
  return h(BrTooltip, { content }, { default: () => Checkbox })
}

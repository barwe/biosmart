import { keys, pick } from 'lodash'

/** 对象的哪些属性的字面值发生更新了 */
export const getUpdatedSubObject = <T extends SARecord>(newObj: T, oldObj: T) => {
  const ks = keys(newObj).filter(k => newObj[k] !== oldObj[k])
  return pick(newObj, ks)
}

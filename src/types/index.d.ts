declare type SRecord<T> = Record<string, T>
declare type SARecord = SRecord<any>
declare type SBRecord = SRecord<boolean>
declare type SNRecord = SRecord<number>
declare type SSRecord = SRecord<string>

declare type NRecord<T> = Record<number, T>
declare type NBRecord<T> = Record<number, boolean>
declare type NSRecord<T> = Record<number, string>

/** 包含 label 属性和 value 属性的对象，常用于声明需传递给 select 组件 options 属性的数据 */
declare type LVRecord<V = string | number> = { label: string; value: V }

import fs from 'fs'
import path from 'path'
import { MockMethod } from 'vite-plugin-mock'

let INTERCEPTS: Set<string>

const loadList = (filepath: string) => {
  const content = fs.readFileSync(filepath, { encoding: 'utf-8' })
  const lines = content.trim().split('\n')
  const data: string[] = []
  lines.forEach(line => {
    let lin = line.trim()
    if (lin.startsWith('#')) return
    if (!lin.endsWith('/')) lin = `${lin}/`
    if (lin.includes('?')) lin = lin.split('?')[0]
    data.push(lin)
  })
  return data
}

const loadIntercepts = () => {
  if (INTERCEPTS === undefined) {
    INTERCEPTS = new Set<string>()
    const fp1 = path.resolve(process.cwd(), '.mock')
    if (fs.existsSync(fp1)) loadList(fp1).forEach(k => INTERCEPTS.add(k))
    const fp2 = path.resolve(process.cwd(), '.mock.local')
    if (fs.existsSync(fp2)) loadList(fp2).forEach(k => INTERCEPTS.add(k))
  }
  return INTERCEPTS
}

export const mock = (data: MockMethod[]) => {
  const intercepts = loadIntercepts()
  return data.filter(d => intercepts.has(d.url))
}

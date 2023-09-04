import { MockMethod } from 'vite-plugin-mock'

const list: MockMethod[] = [
  {
    url: '/api/users',
    method: 'get',
    response: () => ({
      token: 'xxxxxxxxxxxxxx',
      profile: {
        username: 'barwe',
        email: 'barwechin@163.com',
      },
    }),
  },
]

export default list

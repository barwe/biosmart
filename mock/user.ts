import { mock } from './utils'

export default mock([
  {
    url: '/api/users/',
    method: 'get',
    response: () => ({
      token: 'xxxxxxxxxxxxxx',
      profile: {
        username: 'barwe',
        email: 'barwechin@163.com',
      },
    }),
  },
])

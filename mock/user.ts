import { mock } from './utils'

export default mock([
  {
    url: '/api/users/',
    method: 'get',
    response: () => [
      { username: 'admin', email: 'admin@qq.com', is_superuser: true },
      { username: 'zhangsan', email: 'zhangsan@qq.com', is_superuser: false },
      { username: 'wangwu', email: 'wangwu@qq.com', is_superuser: false },
      { username: 'zhaoliu', email: 'zhaoliu@qq.com', is_superuser: false },
      { username: 'qianwangba', email: 'qianwangba@qq.com', is_superuser: false },
    ],
  },
])

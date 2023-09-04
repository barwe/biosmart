开发服务器启用了 mockjs 服务，但是默认情景下 mockjs 不会拦截任何客户端请求。

如果需要测试请求请在 mock 目录下新建测试用例，并在 .mock.local 文件中添加对应的 url。

mockjs 将读取 .mock 文件和 .mock.local 文件并拦截其中声明的 url 的请求。

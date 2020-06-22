/**
 *  封装axios请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在非组件模块中获取 store 必须通过这种方式
//这里单独加载 store 和在组件中this.$store 一个东西

import store from '@/store'
import router from '@/router'

// axios.create
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
/**
 *  配置处理后端返回数据中超出js安全整数范围问题
 */
request.defaults.transformResponse = [
  function(data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {}
    }
  }
]
// 请求拦截器
// add a  request interceptors
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 处理完后一定要把config 返回 否则请求就会在这里停止
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  // 响应成功进入第一个函数
  // 该函数的参数是响应对象
  function(response) {
    return response
  },
  //响应失败进入第二个函数,该函数的参数是错误对象
  async function(error) {
    // 响应拦截器中error 就是那个响应的错误对象
    // 如果响应码是401 则请求获取最新的token
    console.dir(error)
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user
      if (!user || !user.refresh_token) {
        // 若没有则跳转路由
        router.push('/login')
        // 代码后面就不再执行了
        return
      }

      //如果有refresh_token 则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 如果获取成功， 则把新的token 更新到容器中
        console.log('刷新成功', res)
        store.commit('sendUser', {
          token: res.data.data.token, // 获取最新可用的token
          refresh_token: user.refresh_token // 仍然是原来的token
        })

        // 把之前用户失败的请求继续发送出去
        // config 是一个对象， 包含了多种配置 url method 等等
        // return  是把request请求结果继续返回给发请求的具体位置
        return error.config
      } catch (error) {
        // 如果获取失败， 直接跳转到登录页面
        console.log('请求刷新 token 失败', error)
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default request

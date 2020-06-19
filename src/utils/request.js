/**
 *  封装axios请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
// import store from '@/store'
// import router from '@/router'

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

export default request

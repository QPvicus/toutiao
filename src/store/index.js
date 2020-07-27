import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import jwtCode from 'jwt-decode'

// 这样做的可以目的可以避免访问和获取数据的名字不一致导致的问题
const USER_KEY = 'TOUTIAO_USER'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录信息
    user: getItem(USER_KEY) // 当前用户的登录状态(Token等数据)
    // uesr: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    setUser(state, data) {
      if (data && data.token) {
        // 解析 jwt中的数据， (需要使用id)
        data.id = jwtCode(data.token).user_id
      }

      state.user = data
      // 为了防止页面刷新数据丢失， 我们还需要把数据放到本地存储中， 持久化数据
      setItem(USER_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})

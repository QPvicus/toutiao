import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativetime from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间插件
dayjs.extend(relativetime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器，处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})

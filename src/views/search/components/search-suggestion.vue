<template>
  <van-cell-group>
    <van-cell icon="search" v-for="(item, index) in suggestions" :key="index">
      <div slot="title" v-html="hightlight(item)"></div>
    </van-cell>
  </van-cell-group>
</template>

<script>
// 防抖处理  按需加载 有利于打包结果优化
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search'
export default {
  name: 'searchSuggestion',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    q: {
      handler: debounce(async function() {
        const q = this.q
        if (!q) return
        const { data } = await getSuggestions(q)
        this.suggestions = data.data.options
      }, 200),
      // 在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：
      immediate: true
    }
  },
  methods: {
    hightlight(str) {
      return str
        .toLowerCase()
        .replace(
          this.q.toLowerCase(),
          `<span style="color:red">${this.q}</span>`
        )
    }
  }
}
</script>

<style></style>

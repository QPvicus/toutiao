<template>
  <!-- 只有 在list  在可视范围内才会检查滚动位置触发 onload  -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已展示所有评论"
    :error="error"
    error-text="加载失败，请稍后重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <commend-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @click-reply="$emit('click-reply', $event)"
    />
  </van-list>
</template>

<script>
import CommendItem from './commend-item'
import { getComments } from '@/api/comment'

export default {
  name: 'CommendList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 prop 验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  components: {
    CommendItem
  },
  created() {
    // 当手动初始onload 的话，它不会自动开始初始的loading状态
    // 因此 我们需要手动开启初始 的loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      // 2， 讲数据添加到列表中
      // 3. 有loading 设置为 false
      // 4. 有数据就 更新下一个数据
      // 没有 就 finished 为true
      // this.loading = true
      // a  文章得评论  c  评论得回复
      // source  文章得评论  传递文章 ID
      //          评论的回复  传递评论的id
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)

        this.$emit('onload-success', data.data)

        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }

      // this.loading = false
    }
  }
}
</script>

<style></style>

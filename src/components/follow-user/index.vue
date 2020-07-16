<template>
  <van-button
    class="follow-btn"
    :type="value ? 'defalut' : 'info'"
    size="small"
    round
    :loading="loading"
    @click.stop="onFollow"
  >
    <slot>{{ value ? '已关注' : '关注' }}</slot>
  </van-button>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
export default {
  name: 'followUser',
  props: {
    userId: {
      type: [Object, String, Number],
      required: true
    },
    // 父组件 article.is_followed"  自定义v -model
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      //   开启加载
      this.loading = true
      try {
        if (this.value) {
          // 如果关注了 则取消关注
          await unFollowUser(this.userId)
        } else {
          // 如果没关注 则关注
          await followUser(this.userId)
        }
        // input 跟 v-model 有关
        this.$emit('input', !this.value)
      } catch (err) {
        if (err.response?.status === 400) {
          this.$toast('你不能关注你自己')
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.van-button--info {
  background-color: #f85959;
  border: none;
}
.van-button--defalut {
  background-color: #fff;
  border: none;
}
</style>

<template>
  <div class="commend-post">
    <van-field
      class="post-field"
      autosize
      v-model.trim="message"
      rows="2"
      type="textarea"
      placeholder="请输入留言"
      maxlength="50"
      show-word-limit
    ></van-field>
    <van-button class="post-btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: '',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })

        // 关闭弹出层
        // 讲发布内容显示到列表顶部
        //清空 文本框
        this.messagea = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.commend-post {
  display: flex;
  align-items: center;
  padding: 12px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 112.5px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>

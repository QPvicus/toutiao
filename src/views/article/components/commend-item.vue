<template>
  <van-cell class="commend-item">
    <van-image
      slot="icon"
      width="30px"
      height="30px"
      fit="cover"
      round
      :src="comment.aut_photo"
      style="margin-right:10px"
    />
    <span style="color:#466b9d" slot="title">{{ comment.aut_name }}</span>
    <div slot="label">
      <p style="color:#363636">{{ comment.content }}</p>
      <p>
        <span style="margin-right:10px">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          size="mini"
          type="default"
          plain
          round
          @click="$emit('click-reply', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
      </p>
    </div>
    <div slot="right-icon" class="like-container">
      <van-icon
        :name="comment.is_liking ? 'good-job' : 'good-job-o'"
        :color="comment.is_liking ? '#e5645f' : ''"
        :loading="commentLoading"
        @click="onCommentLike"
        >{{ comment.like_count > 0 ? comment.like_count : ' 赞' }}</van-icon
      >
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'

export default {
  name: 'CommendItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentLoading: false
    }
  },
  methods: {
    async onCommentLike() {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)
        } else {
          await addCommentLike(this.comment.com_id)
        }

        // 更新视图
        this.comment.is_liking = !this.is_liking
        this.comment.like_count += this.comment.is_liking ? 1 : -1
      } catch (err) {
        this.$toast.fail('操作失败，稍后重试')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.commend-item {
  display: flex;
  align-items: flex-start;
}
.like-container {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
</style>

<template>
  <div class="footer">
    <van-button round plain type="default" style="width:160px" size="small"
      >写评论</van-button
    >
    <van-icon name="comment-o" class="icon-comment" badge="0"></van-icon>
    <van-icon
      class-prefix="toutiao"
      name="shoucang"
      :color="article.is_collected ? 'orange' : ''"
      @click="onCollect"
    ></van-icon>
    <van-icon
      class-prefix="toutiao"
      name="dianzan"
      @click="onLike"
      :color="article.attitude === 1 ? 'red' : ''"
    ></van-icon>
  </div>
</template>

<script>
import {
  addCollect,
  deleteCollect,
  addDisLike,
  deleteDislike
} from '@/api/article'
export default {
  name: 'articleFooter',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    async onCollect() {
      try {
        const article = this.article
        if (article.is_collected) {
          await deleteCollect(article.art_id.toString())
        } else {
          await addCollect(article.art_id.toString())
        }
        article.is_collected = !article.is_collected
        this.$toast.success(article.is_collected ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },

    async onLike() {
      try {
        const article = this.article
        if (article.attitude === 1) {
          await deleteDislike(article.art_id.toString())
        } else {
          await addDisLike(article.art_id.toString())
        }
        article.attitude = article.attitude === -1 ? 1 : -1
        this.$toast.success(article.attitude === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #fff;
  background-color: #fff;
  .icon-comment {
    font-size: 16px;
  }
}
</style>

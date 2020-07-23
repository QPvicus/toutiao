<template>
  <div class="commend-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <commend-item :comment="comment" />
      <!-- 当前评论项 -->
      <!-- 评论回复得列表 -->
      <van-cell title="全部回复" />
      <commend-list :source="comment.com_id" type="c" :list="commentList" />
      <!-- 评论回复得列表 -->
    </div>
    <!-- 发布评论  -->
    <div class="post-wrap">
      <van-button class="post-btn" round size="small" @click="isPostShow = true"
        >发布</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <commend-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
    <!-- 发布评论  -->
  </div>
</template>

<script>
import CommendItem from './commend-item'
import CommendList from './commend-list'
import CommendPost from './commend-post'

export default {
  name: '',
  components: {
    CommendItem,
    CommendList,
    CommendPost
  },
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: [] // 评论回复列表
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      // 评论回复数量
      this.comment.reply_count++
      // 关闭弹出层
      this.isPostShow = false
      // 评论追加到顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>

<template>
  <div class="atricle-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" fixed>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 加载中 -->
    <article-page v-if="loading" />
    <!-- 加载中 -->
    <!-- 加载完成， 文章详情 -->
    <template v-else-if="article.title">
      <div class="detail">
        <h3 class="title">{{ article.title }}</h3>
        <article-auth :article="article" />
        <div
          class="markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 文章评论列表 -->
      <van-cell title="全部评论" :border="false"></van-cell>
      <commend-list
        :source="article.art_id"
        @onload-success="totalCommentCount = $event.total_count"
        :list="commendList"
        @click-reply="onReplyShow"
      />
      <!-- 文章评论列表 -->
      <!-- 底部区域 -->
      <article-footer
        :article="article"
        :total-commend-count="totalCommentCount"
        @click-write="isPostShow = true"
      />
      <!-- 底部区域 -->

      <!-- 发布评论 -->
      <van-popup
        v-model="isPostShow"
        position="bottom"
        custom-style="height: 30%;"
      >
        <commend-post :target="article.art_id" @post-success="onPostSuccess" />
      </van-popup>
      <!-- 发布评论 -->
    </template>
    <!-- 加载失败： 错误页面 -->
    <error-page v-else @click="loadArticle" />
    <!-- 加载失败： 错误页面 -->

    <!-- 加载完成， 文章详情 -->

    <!-- 评论回复弹出层 -->
    <!-- v-if  true  渲染元素节点  false  不渲染 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%;">
      <commend-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- 评论回复弹出层 -->
  </div>
</template>

<script>
import articlePage from '@/components/loading-page'
import articleAuth from '@/components/article-auth'
import commendList from './components/commend-list'
import articleFooter from './components/article-footer'
import errorPage from '@/components/error-page'
import commendPost from './components/commend-post'
import commendReply from './components/commend-reply'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
export default {
  name: 'articleIndex',
  data() {
    return {
      loading: true, // 控制加载中状态
      article: {}, //文章详情
      totalCommentCount: 0,
      isPostShow: false, // 控制发布状态的显示状态
      commendList: [], // 评论列表
      isReplyShow: false,
      currentComment: {} // 当前点击回复得评论项
    }
  },
  //  给所有后代组件提供数据
  // 不要滥用
  provide: function() {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    articlePage,
    articleAuth,
    commendList,
    articleFooter,
    errorPage,
    commendPost,
    commendReply
  },
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      // 开始请求数据 加载中
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        //  给文章的内容的图片添加图片预览功能
        setTimeout(() => {
          this.addImagePreview()
        }, 0)
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
      this.loading = false
      // 获取到 后 加载结束
    },

    addImagePreview() {
      const imgs = this.$refs['article-content'].querySelectorAll('img')
      const imgPaths = Array.from(imgs).map(item => item.src)
      imgs.forEach((item, index) => {
        item.addEventListener('click', () =>
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        )
      })
    },
    onPostSuccess(data) {
      this.isPostShow = false
      // 将 发布的内容显示到列表上
      this.commendList.unshift(data.new_obj)
    },
    onReplyShow(comment) {
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./github-markdown.css');
.atricle-container {
  height: 100%;
  overflow: scroll;
  background: #fff;
  /deep/ .van-nav-bar {
    background-color: #3196fa;
    .van-nav-bar__title,
    .van-icon,
    .van-nav-bar__text {
      color: #fff;
    }
  }
}

.detail {
  padding: 0 20px;
  .title {
    padding: 46px 0 0px;
    font-size: 14px;
  }
}

.markdown-body {
  padding-bottom: 50px;
}
</style>

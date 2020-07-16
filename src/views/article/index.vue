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
    </template>
    <!-- 加载失败： 错误页面 -->
    <error-page v-else @click="loadArticle" />
    <!-- 加载失败： 错误页面 -->
    <!-- 文章评论列表 -->
    <van-cell title="全部评论" :border="false"></van-cell>
    <commend-list />
    <!-- 文章评论列表 -->
    <!-- 底部区域 -->
    <article-footer />
    <!-- 底部区域 -->
    <!-- 加载完成， 文章详情 -->
  </div>
</template>

<script>
import articlePage from '@/components/loading-page'
import articleAuth from '@/components/article-auth'
import commendList from './components/commend-list'
import articleFooter from './components/article-footer'
import errorPage from '@/components/error-page'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
export default {
  name: 'articleIndex',
  data() {
    return {
      loading: true, // 控制加载中状态
      article: {} //文章详情
    }
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    articlePage,
    articleAuth,
    commendList,
    articleFooter,
    errorPage
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

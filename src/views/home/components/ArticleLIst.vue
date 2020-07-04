<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item/index'
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [], // 数据列表
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页的时间戳
      isRefreshLoading: false, //下拉刷新的状态
      refreshSuccessText: '' // 下拉刷新成功的文本
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐指定的时间戳,timestamp相当于
        // 页码，请求最新数据用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const { results } = data.data
      this.articles.push(...results)

      // 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远停在这里,
      this.loading = false
      if (results.length) {
        // 更新获取下一页数据的页码，
        this.timestamp = data.data.pre_timestamp
      } else {
        //没有数据 ，不再加载
        this.finished = true
      }
    },
    async onRefresh() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 往顶部追加
      const { results } = data.data
      this.articles.unshift(...results)
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>

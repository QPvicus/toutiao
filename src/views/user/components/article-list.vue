<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      class="article-list"
      v-for="(article, index) in list"
      :key="index"
      @click="
        $router.push({
          name: 'article',
          params: {
            articleId: article.art_id.toString()
          }
        })
      "
    >
      <div class="article-info">
        <div class="author">
          <van-image round class="avatar" fit="cover" :src="user.photo" />
          <div class="base-info">
            <p class="name">{{ article.aut_name }}</p>
            <p class="time">{{ article.pubdata | relativeTime }}</p>
          </div>
        </div>
      </div>
      <div class="article-context" v-if="article.cover.type">
        <div class="title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
        <van-image class="img" fit="cover" :src="article.cover.images[0]" />
      </div>
      <div v-else class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <div class="action">
        <div class="action-item">
          <van-icon name="comment-o"></van-icon>
          <span>{{ article.comm_count }}</span>
        </div>
        <div class="action-item">
          <van-icon name="good-job-o"></van-icon>
          <span>{{ article.like_count }}</span>
        </div>
        <div class="action-item">
          <van-icon name="star-o"></van-icon>
          <span>{{ article.collect_count }}</span>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
import { getArticleByUser } from '@/api/article'

export default {
  name: 'articleList',
  components: {},
  props: {
    userId: {
      type: [String, Number, Object],
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleByUser(this.userId, {
          page: this.page,
          per_page: this.per_page
        })
        const results = data.data.results
        this.list.push(...results)

        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  padding: 12px 12px 0;
  background-color: #fff;
  .article-info {
    margin-bottom: 6px;
    .author {
      display: flex;
      align-items: center;
      .avatar {
        width: 36px;
        height: 36px;
        margin-right: 8px;
      }
      .base-info {
        .name {
          margin: 0;
          font-size: 14px;
          color: #222;
        }
        .time {
          margin: 0;
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
  .article-context {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    .title {
      width: 65%;
      padding: 14px 0;
      color: #3a3a3a;
      font-size: 15px;
    }
    .img {
      width: 117px;
      height: 74px;
    }
  }
  .title {
    padding: 14px 0;
    color: #3a3a3a;
    font-size: 15px;
  }
  .action {
    display: flex;
    height: 46px;
    justify-content: space-around;
    align-items: center;
    .action-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .van-icon {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>

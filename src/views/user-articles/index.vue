<template>
  <div class="user-articles">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      class="page-navbar"
      fixed
    />
    <van-tabs v-model="active" class="nav-tabs">
      <van-tab title="我的收藏" to="/my-article/collect" replace>
        <collect-article />
      </van-tab>
      <van-tab title="我的历史" to="/my-article/history" replace>
        <history-article />
      </van-tab>
      <van-tab title="我的作品" to="/my-article" replace>
        <user-article />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import userArticle from './components/article'
import collectArticle from './components/collect'
import historyArticle from './components/history'

export default {
  name: 'UserArticles',
  components: {
    userArticle,
    collectArticle,
    historyArticle
  },
  props: {
    type: {
      type: String
    }
  },
  data() {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.user-articles {
  padding-top: 46px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}
</style>

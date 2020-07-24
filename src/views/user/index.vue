<template>
  <div class="user-container page-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-navbar"
      fixed
      :title="user.name"
      @click-left="$router.back()"
      left-arrow
    ></van-nav-bar>
    <!-- 导航栏 -->
    <!-- 用户信息 -->
    <user-info :user="user" />
    <!-- 用户信息 -->
    <!-- 文章列表 -->
    <article-list :userId="userId" :user="user" />
    <!-- 文章列表 -->
  </div>
</template>

<script>
import userInfo from './components/user-info'
import articleList from './components/article-list'
import { getUserById } from '@/api/user'

export default {
  name: 'userIndex',
  components: {
    userInfo,
    articleList
  },
  props: {
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      user: {} // 用户资料
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUser()
  },
  mounted() {},
  methods: {
    async getUser() {
      try {
        const { data } = await getUserById(this.userId)
        this.user = data.data
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
}
</style>

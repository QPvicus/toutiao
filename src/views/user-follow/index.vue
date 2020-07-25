<template>
  <div class="user-follow">
    <van-nav-bar class="page-navbar" left-arrow @click-left="$router.back()">
      <van-tabs v-model="active" slot="title" background="#3296fa">
        <van-tab title="关注" :to="`/user/${userId}/follow`" replace>
          <follow-list />
        </van-tab>
        <van-tab
          title="粉丝"
          :to="`/user/${userId}/follow?tab=followers`"
          replace
        >
          <follow-list followers />
        </van-tab>
      </van-tabs>
    </van-nav-bar>
  </div>
</template>

<script>
import followList from './components/follow-list'

export default {
  name: 'userFollow',
  components: {
    followList
  },
  props: {
    userId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data() {
    return {
      active: this.$route.query.tab === 'followers' ? 1 : 0
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
.user-follow {
  .page-navbar {
    height: 46px;
    /deep/ .van-tab__text {
      color: #ffffff;
    }
    /deep/ .van-tabs__line {
      background-color: #fff !important;
    }
  }
}
</style>

<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <div class="app-nav-bar">
      <div class="logo"></div>
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >
        搜索</van-button
      >
    </div>
    <!-- 导航栏 -->
    <!-- 文章频道列表 -->
    <van-tabs
      ref="tabs"
      v-if="channels.length"
      class="fixed-tabs"
      v-model="active"
      swipeable
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>
      <!-- 默认吧你写的其他内容渲染到内容的底部 -->
      <!-- 此处作用滑到右边时可以腾出点空间 -->
      <div slot="nav-right" class="van-tab" style="flex: 0 0 8%;"></div>
      <van-icon
        slot="nav-right"
        class="wap-nav"
        name="wap-nav"
        @click="isChannelEditShow = true"
      ></van-icon>
    </van-tabs>
    <!-- 文章频道列表 -->
    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :overlay="false"
      round
      :style="{ height: '100%' }"
      class="channel-edit-popup"
    >
      <van-nav-bar title="编辑频道">
        <van-icon
          name="cross"
          slot="left"
          size="20"
          @click="isChannelEditShow = false"
        ></van-icon>
      </van-nav-bar>
      <channel-edit
        :user-channels="channels"
        v-model="active"
        @close="isChannelEditShow = false"
      />
    </van-popup>
    <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleLIst'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data() {
    return {
      active: 0, // 控制激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false // 弹窗的显示
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      // 正确获取首页频道列表数据
      try {
        let channel = []
        if (this.user) {
          //已登录
          const { data } = await getUserChannels()
          channel = data.data.channels
        } else {
          // 未登录
          const localChannels = getItem('channel')
          if (localChannels) {
            // 使用本地存储的频道列表
            channel = localChannels
          } else {
            const { data } = await getUserChannels()
            channel = data.data.channels
          }
        }
        // 将数据更新到组件中
        this.channels = channel
      } catch (err) {
        console.log(err)
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.app-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  height: 46px;
  background-color: #3196fa;
  z-index: 1;
  .logo {
    background: url('./logo.png') no-repeat;
    width: 100px;
    height: 30px;
    background-size: cover;
  }
  .search-btn {
    width: 50%;
    background-color: #5babfb;
  }
}
.fixed-tabs {
  padding-top: 46px;
}
.wap-nav {
  position: fixed;
  right: 0;
  background-color: #fff;
  opacity: 0.8;
  font-size: 26px;
  line-height: 43px;
}
/deep/ .van-tabs {
  .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  .van-tabs__line {
    width: 15px !important;
    background-color: #3296fa;
    bottom: 20px;
  }
}
.channel-edit-popup {
  border-radius: 10px 10px 0 0;
}
</style>

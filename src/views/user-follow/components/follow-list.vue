<template>
  <div class="follow-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="follow-item" v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="item.photo"
        />
        <div class="user-info">
          <div class="name" slot="title">
            {{ item.name || '默认用户' }}
          </div>
          <div class="fans" slot="label">粉丝数:{{ item.fans_count }}</div>
        </div>
        <follow-user
          v-if="$route.query.tab !== 'followers'"
          slot="right-icon"
          :userId="item.id"
          v-model="item.is_followed"
        >
          <span v-if="item.is_followed">{{
            item.mutual_follow ? '互相关注' : '已关注'
          }}</span>
          <span v-else>关注</span>
        </follow-user>
        <follow-user
          v-else
          slot="right-icon"
          :userId="item.id"
          v-model="item.mutual_follow"
        >
          <span>{{ item.mutual_follow ? '相互关注' : '关注' }}</span>
        </follow-user>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import followUser from '@/components/follow-user'
import { getFansByUser, getFollowingsByUser } from '@/api/user'

export default {
  name: 'followList',
  components: {
    followUser
  },
  props: {
    // 默认获取用户关注列表，如果需要获取粉丝列表则指定 followers 为 true
    followers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const params = [
          this.$route.params.userId,
          {
            page: this.page,
            per_page: this.per_page
          }
        ]
        let { data } = await (this.followers
          ? getFansByUser(...params)
          : getFollowingsByUser(...params))
        const { results } = data.data
        results.forEach(item => {
          item.is_followed = true
        })
        this.list.push(...results)

        if (results.lenght) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow-list {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .follow-item {
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 13px;
    }
    .name {
      font-style: 14px;
    }
    .fans {
      font-style: 12px;
      color: #999999;
    }
    // .van-cell__title {
    //   display: flex;
    //   flex-direction: column;
    //   align-items: baseline;
    // }
    /deep/ .van-button--round {
      border-radius: 0;
    }
  }
}
</style>

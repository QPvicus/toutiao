<template>
  <div class="author">
    <div class="base-info">
      <van-image
        :src="article.aut_photo"
        round
        width="1rem"
        height="1rem"
        fit="cover"
      ></van-image>
      <div class="text">
        <p class="name">{{ article.aut_name }}</p>
        <p class="time">{{ article.pubdate | relativeTime }}</p>
      </div>
    </div>

    <!--如果当前没登录或者当着作者不是登录用户 -->
    <follow-user
      :userId="article.aut_id"
      style="width: 30%"
      v-model="article.is_followed"
    />
  </div>
</template>

<script>
import followUser from '@/components/follow-user'
import { mapState } from 'vuex'
export default {
  name: 'articleAuth',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    followUser
  }
}
</script>

<style lang="less" scoped>
.author {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  .base-info {
    display: flex;
    align-items: center;
  }
  .text {
    flex: 1;
    padding-left: 10px;
    line-height: 1.3;
    .name {
      font-size: 14px;
      margin: 0;
    }
    .time {
      font-size: 14px;
      margin: 0;
      color: #999;
    }
  }
}
</style>

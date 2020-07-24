<template>
  <div class="user-info">
    <van-cell>
      <van-image
        slot="icon"
        round
        width="80px"
        height="80px"
        fit="cover"
        :src="user.photo"
      />
      <div class="data-info">
        <div class="cow">
          <span>{{ user.art_count }}</span>
          <span>发布</span>
        </div>
        <div class="cow">
          <span>{{ user.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="cow">
          <span>{{ user.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="cow">
          <span>{{ user.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
      <div class="info-btn">
        <van-button plain>私信</van-button>
        <van-button plain>关注</van-button>
      </div>
    </van-cell>
    <div>
      <span>简介:</span>
      <span>{{ user.intro }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 14px;
  .data-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 8px;
    .cow {
      display: flex;
      flex-direction: column;
      span {
        font-size: 12px;
      }
    }
  }
  .info-btn {
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    .van-button {
      width: 45%;
      height: 30px;
    }
  }
}
</style>

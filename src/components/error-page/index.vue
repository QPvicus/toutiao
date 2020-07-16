<template>
  <div class="error-page">
    <img src="./no-network.png" alt="no-network" />
    <p class="text">亲，网络不给力</p>
    <van-button class="btn" size="small" type="default">点击重试</van-button>
  </div>
</template>

<script>
export default {
  name: 'errorPage',
  methods: {}
}
</script>

<style lang="less" scoped>
.error-page {
  padding-top: 100px;
  text-align: center;
  .text {
    font-size: 15px;
  }
  .btn {
    width: 30%;
  }
}
</style>

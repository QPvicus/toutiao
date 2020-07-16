<template>
  <van-loading class="loading" v-bind="$attrs" color="#1989fa" vertical>
    <slot>加载中。。。</slot>
  </van-loading>
</template>

<script>
export default {
  name: 'loadingPage'
}
</script>

<style scope>
.loading {
  padding-top: 100px;
  text-align: center;
}
</style>

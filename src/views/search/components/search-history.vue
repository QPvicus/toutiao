<template>
  <van-cell-group>
    <van-cell title="历史记录">
      <template v-if="isDeleteShow">
        <span @click="$emit('update:search-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      default: () => []
    }
  },
  // 遇到一个问题 将父组件的v-model 绑定的 search-histories 传给子组件时候子组件是不能修改数据的，此处解决
  // 父组件v-model: search-histories 传给此组件 ,此组件修改了 props中的数据 会导致报错
  // 下面model 解决  相关查询 model 自定义组件
  model: {
    prop: 'search-histories',
    event: 'update:search-histories'
  },
  data() {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {
    onHistoryClick(item, index) {
      if (this.isDeleteShow) {
        // 删除频道
        this.searchHistories.splice(index, 1)
      } else {
        // 展示搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>

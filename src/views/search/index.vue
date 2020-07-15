<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- van-search 外层加form 标签，且action 不为空 即可在iOS输入法显示搜索按钮 -->
    <van-form aciton="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜素关键词"
        background="#3296fa"
        show-action
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isResultShow = false"
      ></van-search>
    </van-form>
    <!-- 搜索栏 -->
    <!-- 历史记录 -->
    <search-result v-if="isResultShow" :q="searchText" />
    <!-- 历史记录 -->
    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :q="searchText"
      @search="onSearch"
    />
    <!-- 联想建议 -->
    <!-- 搜索历史 -->
    <search-history v-model="searchHistories" v-else @search="onSearch" />
    <!-- 搜索历史 -->
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '', //搜索框内容
      isResultShow: false, // 搜索显示的结果
      searchHistories: getItem('search-histories') || [] //存储历史记录
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  watch: {
    //
    searchHistories(newVal) {
      // 同步到本地存储
      setItem('search-histories', newVal)
    }
  },
  methods: {
    onSearch(q) {
      this.searchText = q
      //存储搜索历史记录 ，若有重复 则除去并且最新的排在前面
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index, 1)
      }
      searchHistories.unshift(this.searchText)
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-search__action {
  color: #ffffff;
}
</style>

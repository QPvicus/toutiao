<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(artilce, index) in list"
        :key="index"
        :title="artilce.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'searchResult',
  components: {},
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getSearch({
        page: this.page,
        per_page: this.perPage,
        q: this.q
      })
      // 数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      // 加载结束
      this.loading = false

      // 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style></style>

<template>
  <div class="collect-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        @click="
          $router.push({
            name: 'article',
            params: {
              articleId: item.art_id.toString()
            }
          })
        "
      />
    </van-list>
  </div>
</template>

<script>
import { getArticleCollect } from '@/api/article'

export default {
  name: 'UserArticle',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleCollect({
          page: this.page,
          per_page: this.per_page
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
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

<style lang="less" scoped></style>

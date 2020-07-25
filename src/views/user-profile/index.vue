<template>
  <div class="user-profile ">
    <van-nav-bar
      class="page-navbar"
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" clickable @click="onAvatarClick">
        <van-image
          ref="avatar"
          class="avatar"
          round
          fit="cover"
          width="30px"
          height="30px"
          :src="user.photo"
        />
        <van-icon slot="right-icon" name="arrow"></van-icon>
      </van-cell>
      <input ref="file" type="file" hidden @change="onFileChange" />
      <van-cell title="昵称" clickable :value="user.name">
        <van-icon slot="right-icon" name="arrow"></van-icon>
      </van-cell>
      <van-cell title="介绍" clickable value="内容">
        <van-icon slot="right-icon" name="arrow"></van-icon>
      </van-cell>
      <van-cell title="性别" clickable :value="user.gender === 1 ? '女' : '男'">
        <van-icon slot="right-icon" name="arrow"></van-icon>
      </van-cell>
      <van-cell title="生日" clickable :value="user.birthday">
        <van-icon slot="right-icon" name="arrow"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- 图片预览 -->
    <van-image-preview
      v-model="show"
      :images="images"
      @close="$refs.file.value = ''"
    >
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确认"
        @click-left="show = false"
        @click-right="onUpdateAvatar"
      />
    </van-image-preview>
    <!-- 图片预览 -->
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/api/user'

export default {
  name: 'userProfile',
  components: {},
  props: {},
  data() {
    return {
      user: {}, // 用户资料
      show: false,
      images: [] //图片地址
    }
  },
  computed: {
    file() {
      return this.$refs.file
    }
  },
  watch: {},
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    },
    onAvatarClick() {
      this.file.click()
    },
    onFileChange() {
      const fileObj = this.file.files[0]
      const fileData = window.URL.createObjectURL(fileObj)
      this.images = [fileData]
      this.show = true
    },
    async onUpdateAvatar() {
      const fd = new FormData()
      const fileObj = this.file.files[0]
      fd.append('photo', fileObj)
      console.log(fd)
      this.$toast.loading({
        duration: 0,
        message: '更新中...',
        forbidClick: true
      })
      try {
        const { data } = await updateUserPhoto(fd)
        this.user.photo = data.data.photo
        this.show = false
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell-group {
  .van-cell {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 5px;
    }
  }
}
/deep/ .van-image-preview__cover {
  top: unset;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  .van-nav-bar {
    background-color: #000;
  }
}
</style>

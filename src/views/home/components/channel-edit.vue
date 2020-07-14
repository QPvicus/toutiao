<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-wrap">
        <span class="title">我的频道</span>
        <span class="tip">点击进入频道</span>
      </div>
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        color="#e5615b"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的频道 -->
    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        @click="onChannelActiveOrDelete(channel, index)"
      >
        <span class="text" :class="{ active: value === index }">{{
          channel.name
        }}</span>
        <van-icon
          v-show="isEdit && channel.name !== '推荐'"
          class="close-icon"
          name="close"
        ></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-wrap">
        <span class="title">推荐频道</span>
        <span class="tip">点击进入频道</span>
      </div>
    </van-cell>
    <!-- 推荐的频道 -->
    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        @click="onAddChannel(channel)"
      >
        <span class="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allChannels: [], // 获取所有频道
      isEdit: false // 控制编辑状态
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // 推荐的频道  = 所有的频道 - 用户频道
      return this.allChannels.filter(item => {
        return (
          this.userChannels.findIndex(userItem => {
            return userItem.id === item.id
          }) === -1
        )
      })
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取所有频道数据失败')
      }
    },
    async onAddChannel(channel) {
      // 用户处于登录状态
      try {
        if (this.user) {
          // 已登录 存储到线上
          await addChannel({
            id: channel.id,
            seq: this.userChannels.length
          })
        } else {
          // 未登录, 存储到本地
          setItem('channel', ...this.userChannels, channel)
        }
        // 更新视图
        this.userChannels.push(channel)
      } catch (err) {
        console.log(err)
        this.$toast('添加失败，稍后重试')
      }
    },
    async onChannelActiveOrDelete(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        // 编辑状态， 执行删除操作
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态 切换频道
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    async deleteChannel(channel, index) {
      try {
        if (this.user) {
          await deleteChannel(channel.id)
          this.userChannels.splice(index, 1)
        } else {
          // 未登录
          this.userChannels.splice(index, 1)
          setItem('channel', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败,稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.title-wrap {
  .title {
    margin-right: 10px;
    font-size: 16px;
  }
  .tip {
    font-size: 12px;
    color: #ccc;
  }
}
.channel-item {
  height: 43px;
  ::v-deep .van-grid-item__content {
    background: #f4f5f6;
  }
  .text {
    font-size: 14px;
    color: #222;
  }
  .active {
    color: #e5615b !important;
  }
  .close-icon {
    font-size: 15px;
    position: absolute;
    right: -3px;
    top: -4px;
  }
}
</style>

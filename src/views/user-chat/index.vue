<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="page-navbar"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image
          width="30px"
          height="30px"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="msg-wrap" style="flex: 1;">
          <div class="title">{{ item.msg }}</div>
        </div>
      </div>
    </div>
    <!-- 消息列表 -->
    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model.trim="message" center clearable>
        <van-button
          type="primary"
          slot="button"
          size="small"
          @click="onSend"
          class="send-btn"
          >发送</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- 发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data() {
    return {
      message: '',
      socket: null, // webSocket 通信对象
      messages: getItem('chat-message') || [] // 消息列表
    }
  },
  computed: {},
  created() {
    // 建立websocket 连接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', function() {
      console.log('连接成功')
    })
    // 手动将数据成员暴露给全局， 可以在控制台中直接访问了， 测试完毕直接删除
    window.socket = socket

    // 发送消息

    // 接受消息
    socket.on('message', message => {
      this.messages.push(message)
    })
  },
  watch: {
    // 监视函数 两个参数  1. 最新指， 参数2 变化之前的旧值
    messages(value) {
      setItem('chat-message', value)

      // 让消息滚动到底部
      this.$nextTick(() => {
        this.toBottom()
      })
    }
  },
  mounted() {},
  methods: {
    onSend() {
      if (!this.message.length) {
        return
      }

      const data = {
        msg: this.message,
        timestamp: Date.now(),
        isMe: true // 表示我发的
      }
      this.socket.emit('message', data)

      this.messages.push(data)
      // 清空文本框
      this.message = ''
    },
    toBottom() {
      const listContainer = this.$refs['message-list']
      listContainer.scrollTop = listContainer.scrollHeight
    }
  }
}
</script>

<style lang="less" scoped>
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
}
.message-list {
  height: 100%;
  overflow-y: scroll;
  .message-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    padding: 10px;
    .msg-wrap {
      word-break: break-all;
      word-wrap: break-word;
    }
    .title {
      display: table;
      background: #e0effb;
      border-radius: 6px;
      font-size: 14px;
      padding: 10px 10px;
      margin-right: 45px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }
  .reverse {
    flex-direction: row-reverse;
    .msg-wrap {
      display: flex;
      flex-direction: row-reverse;
      .title {
        margin-right: 5px;
        margin-left: 45px;
      }
    }
  }

  /deep/.van-cell-group {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>

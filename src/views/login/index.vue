<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- van-cell-group 仅仅是提供了一个上下边框，能看到包裹的边框 -->
    <van-form validate-first ref="login-form">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="请输入手机号"
          name="mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入密码"
          name="code"
        >
          <template #button>
            <van-count-down
              v-if="isSendSmgLoading"
              :time="60 * 1000"
              format="ss s"
              @finish="isCountDownShow = 'false'"
            ></van-count-down>
            <van-button
              v-else
              class="send-btn"
              size="mini"
              round
              @click.prevent="onSendSms"
              :loading="isSendSmgLoading"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" block @click="onLogin"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '', //手机号
        code: '' // 验证码
      },
      isSendSmgLoading: false,
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      this.$toast.loading({
        duration: 0, // 持续时间， 0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 1.找到数据接口
      // 2. 封装请求方法
      // 3，请求用户登录
      try {
        const { data } = await login(this.user)
        // 提示 success 或者 fail 的时候，会把其他的toast 先清除
        // 处理响应结果
        console.log(data)
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态(Token等数据) 放到 Vuex 容器中
        this.$store.commit('setUser', data.data)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }
    },
    async onSendSms() {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')

        // 验证通过，请求发送验证码
        this.isSendSmgLoading = true //  展示按钮的loading状态，防止网络慢用户多次点击触发发送行为
        await sendSms(this.user.mobile)
        // 短信发出去了，显示倒计时， 关闭发送按钮
        this.isCountDownShow = true
      } catch (err) {
        // try 任何代码发生错误都会进入catch
        //不同的错误有不同的提示，就需要判断
        // 429 太多请求 限制请求次数
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的请求信息
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请求失败'
        }
        //提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的loading 状态
      this.isSendSmgLoading = false
      //发送失败， 显示发送按钮，关闭倒计时
      this.isSendSmgLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>

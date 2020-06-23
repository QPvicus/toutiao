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
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          name="mobile"
          ref="mobile"
        />
        <van-icon slot="left-icon" class-prefix="icon" name="shouji"></van-icon>
        <van-field
          v-model="user.code"
          placeholder="请输入密码"
          maxlength="6"
          name="code"
          ref="code"
        >
          <van-icon slot="left-icon" class-prefix="icon" name="mima"></van-icon>
          <van-button
            slot="button"
            size="small"
            :type="isSending ? 'default' : 'primary'"
            :disabled="isSending"
            @click="onSendCode"
          >
            <van-count-down
              ref="countDown"
              v-if="isSending"
              :time="1000 * 60"
              format="ss s"
              :auto-start="false"
              @finish="isSending = false"
            />
            <span v-else>获取验证码</span>
          </van-button>
        </van-field>
      </van-cell-group>
    </van-form>
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" block @click="onLogin"
        >登录</van-button
      >
    </div>
    <van-divider>账号：13911111111 密码：246810</van-divider>
    <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>
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
      isSending: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      if (!this.checkCode() || !this.checkMobile()) return
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
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态(Token等数据) 放到 Vuex 容器中
        this.$store.commit('setUser', data.data)
        // res.data.data = {token:..., refresh_token:....}

        // 跳转到首页
        const redirect = this.$route.query.redirect || '/'
        this.$router.replace(redirect)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }
    },
    async onSendCode() {
      const { mobile } = this.user
      if (!this.checkMobile()) return
      // 显示倒计时
      this.isSending = true
      // 让验证码输入框聚焦
      this.$refs['code'].focus()
      // 开始倒计时
      this.$nextTick(() => {
        this.$refs.countDown.start()
      })
      try {
        // 校验手机号码
        await sendSms(mobile)
      } catch (err) {
        // try 任何代码发生错误都会进入catch
        //不同的错误有不同的提示，就需要判断
        // 429 太多请求 限制请求次数
        // let message = ''
        // // err?.response?.status === 429 <=> err && err.response && err.response.status === 429
        // if (err?.response?.status === 429) {
        //   // 发送短信失败的请求信息
        //   message = '发送太频繁了，请稍后重试'
        // } else if (err.name === 'mobile') {
        //   // 表单验证失败的错误提示
        //   message = err.message
        // } else {
        //   // 未知错误
        //   message = '发送失败，请求失败'
        // }
        let message = '发送失败，请稍后重试'
        if (err?.response?.status === 429) {
          message = '1分钟内只能发送1次，请稍后重试'
        }
        //提示用户
        this.$toast({
          message,
          position: 'top'
        })
        // 关闭倒计时
        this.isSending = false
      }
    },

    checkMobile() {
      const { mobile } = this.user
      if (!mobile) {
        this.$toast({
          message: '手机号码不能为空',
          position: 'top' // 防止键盘太高看不清提示消息
        })
        this.$refs.mobile.focus()
        return false
      }
      // 判断手机格式
      if (!/^1[3578]\d{9}$/.test(mobile)) {
        this.$toast({
          message: '手机格式错误',
          position: 'top'
        })
        this.$refs.mobile.focus()
        return false
      }
      return true
    },
    checkCode() {
      const { code } = this.user
      if (!code) {
        this.$toast({
          message: '验证码不能为空',
          position: 'top'
        })
        this.$refs.code.focus()
        return false
      }
      if (!/^\d{6}$/.test(code)) {
        this.$toast({
          message: '验证码格式错误',
          position: 'top'
        })
        this.$refs.code.focus()
        return false
      }
      return true
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

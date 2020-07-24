import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', //默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        //问答
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        // 视频
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        // 我的
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件中的 props 中
    props: true
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router

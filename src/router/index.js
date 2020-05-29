import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ '../views/index.vue'),
      meta: {
        title: '星空文学APP'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "home" */ '../views/list.vue'),
      meta: {
        title: '星空文学APP'
    }
  },
  {
    path: '/content',
    name: 'content',
    component: () => import(/* webpackChunkName: "home" */ '../views/content.vue'),
      meta: {
        title: '星空文学APP'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

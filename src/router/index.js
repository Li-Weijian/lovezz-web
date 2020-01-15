import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Welcome from '@/components/Welcome'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    }
  ]
})

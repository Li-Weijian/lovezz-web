import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Welcome from '@/views/Welcome'
import Note from '@/views/note/Note'
import Tic from '@/views/tic/Tic'

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
    },
    {
      path:'/noteController/toNote',
      name: 'note',
      component: Note
    },
    {
      path: '/ticController/time',
      name: 'tic',
      component: Tic
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Welcome from '@/views/Welcome'
import Note from '@/views/note/Note'
import Tic from '@/views/tic/Tic'
import Gallery from '@/views/gallery/Gallery'
import GalleryUpload from '@/views/gallery/GalleryUpload'
import GalleryIndex from '@/views/gallery/Index'
import TopsIndex from '@/views/tops/Index'
import Tops from '@/views/tops/Tops'
import TopsPublish from '@/views/tops/TopsPublish'
import Login from '@/views/user/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
    },{
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path:'/noteController/toNote',
      name: 'note',
      component: Note,
      meta: { requiresAuth: true }
    },
    {
      path: '/ticController/time',
      name: 'tic',
      component: Tic
    },
    {
      path: '/galleryController',
      component: GalleryIndex,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'toGallery',
          name: 'gallery',
          component: Gallery
        },
        {
          path: 'upload',
          name: 'upload',
          component: GalleryUpload
        }
      ],
    },
    {
      path: '/tops',
      component: TopsIndex,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'toTops',
          name: 'tops',
          component: Tops
        },
        {
          path: 'publishTops',
          name: 'publishTops',
          component: TopsPublish
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})

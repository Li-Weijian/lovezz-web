import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Welcome from '@/views/Welcome'
import Note from '@/views/note/Note'
import Tic from '@/views/tic/Tic'
import Gallery from '@/views/gallery/Gallery'
import GalleryUpload from '@/views/gallery/GalleryUpload'
import GalleryIndex from '@/views/gallery/Index'

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
    },
    {
      path: '/galleryController',
      component: GalleryIndex,
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
      ]
    }
  ]
})

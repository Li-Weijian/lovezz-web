// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Welcome from '@/views/Welcome'
import { Grid, GridItem, NavBar, Icon , Swipe, SwipeItem, Image, Field ,Button, CellGroup, Toast, ActionSheet, List,Cell,
  Tag ,Dialog,Popup,} from 'vant';

Vue.use(Grid).use(GridItem).use(NavBar).use(Icon).use(Swipe).use(SwipeItem).use(Image)
  .use(Field).use(Button).use(CellGroup).use(Toast).use(ActionSheet).use(List).use(Cell)
  .use(Tag).use(Dialog).use(Popup);

Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios
Vue.prototype.root = process.env.API_HOST;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Welcome,
  components: { App },
  template: '<App/>'
})


axios.interceptors.request.use(config => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });
  return config
}, error => {
  Toast.fail('加载失败');
  return Promise.reject(error)
});

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  Toast.clear();
  Toast.success('成功');
  return data;
}, error => {
  Toast.clear();
  Toast.fail('失败');
  return Promise.reject(error)
});

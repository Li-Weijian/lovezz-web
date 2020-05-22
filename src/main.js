// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Welcome from '@/views/Welcome'
import store from './store'
import echarts from 'echarts'


import { Grid, GridItem, NavBar, Icon , Swipe, SwipeItem, Image, Field ,Button, CellGroup, Toast, ActionSheet, List,Cell,
  Tag ,Dialog,Popup,Circle,Row, Col, Tabbar, TabbarItem,Lazyload, Uploader,Rate, Skeleton, Divider,} from 'vant';

Vue.use(Grid).use(GridItem).use(NavBar).use(Icon).use(Swipe).use(SwipeItem).use(Image)
  .use(Field).use(Button).use(CellGroup).use(Toast).use(ActionSheet).use(List).use(Cell)
  .use(Tag).use(Dialog).use(Popup).use(Circle).use(Row).use(Col).use(Tabbar).use(TabbarItem)
  .use(Lazyload).use(Uploader).use(Rate).use(Skeleton).use(Divider);

Vue.use(echarts)

Vue.prototype.$axios = axios;    //全局注册，使用方法为:this.$axios
Vue.prototype.root = process.env.API_HOST;
Vue.config.productionTip = false;
Vue.prototype.$store = store;
axios.defaults.withCredentials = true;

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
  switch (error.response.status) {
    case 401:
      //跳转登录
      store.dispatch(logout);
  }
  return Promise.reject(error)
});


router.beforeEach((to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性, 在router\index.js中配置，用于登录权限控制
  // 为什么使用to.matched 来匹配，参考https://www.cnblogs.com/jsgoshu/p/10975547.html
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    // 未登录则跳转到登录界面
    next( '/login');
  } else {
    next()
  }
});

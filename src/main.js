// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Welcome from '@/components/Welcome'
import { Grid, GridItem, NavBar, Icon } from 'vant';

Vue.use(Grid).use(GridItem).use(NavBar).use(Icon);

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

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

const root = process.env.API_HOST;

const store = new Vuex.Store({

  // 全局 state 对象，用于保存所有组件的公共数据
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },


  // 定义改变 state 初始值的方法，这里是唯一可以改变 state 的地方，缺点是只能同步执行
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
  },

  // 定义触发 mutations 里函数的方法，可以异步执行 mutations 里的函数
  actions: {

    /**
     * 登录
     * @param commit
     * @param user
     */
    Login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        axios.post(root + '/user/login2', user)
          .then(resp => {
            if (resp.data.status == 200){
              const token = resp.data.data.token;
              const user = resp.data.data.user;
              localStorage.setItem('token', token);
              // 每次请求接口时，需要在headers添加对应的Token验证
              axios.defaults.headers.common['Authorization'] = token;
              // 更新token
              commit('auth_success', token, user);
              resolve(resp)
            }else {
              //失败
              reject(resp)
            }
          })
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('Logout')
          .then(response => {
            commit('logout');
            localStorage.removeItem('token');
            // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
            delete axios.defaults.headers.common['Authorization'];
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },

  getters: {
    // !!将state.token强制转换为布尔值，若state.token存在且不为空(已登录)则返回true，反之返回false
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
});

export default store;

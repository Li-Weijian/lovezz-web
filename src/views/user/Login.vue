<template>
  <main style="">
    <form class="form" style="height: 300px; width: 300px">
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4"
                    stroke-miterlimit="10"></circle>
          </svg>
        </div>
      </div>
      <div class="form__content">
        <h1 style="font-size: 30px">欢迎登录</h1>
        <div class="styled-input" style="width:250px; height: 50px">
          <input type="text" class="styled-input__input" v-model="username" id="username">
          <div class="styled-input__placeholder"><span class="styled-input__placeholder-text" style="font-size: 20px">Username</span></div>
          <div class="styled-input__circle"></div>
        </div>
        <div class="styled-input"  style="width:250px; height: 50px">
          <input type="password" class="styled-input__input" v-model="password" id="password">
          <div class="styled-input__placeholder"><span class="styled-input__placeholder-text" style="font-size: 20px">Password</span></div>
          <div class="styled-input__circle"></div>
        </div>
        <button type="button" class="styled-button" style="width: 90%; height: 5%; margin-left: 5px" id="submit" v-on:click="login"><span class="styled-button__real-text-holder">
          <span class="styled-button__real-text">登录</span> <span class="styled-button__moving-block face"> <span
          class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span><span
          class="styled-button__moving-block back"> <span class="styled-button__text-holder"> <span
          class="styled-button__text">登录</span> </span> </span> </span></button>
      </div>
    </form>
  </main>
</template>

<script>
  import {run} from '../../../static/js/login'

  export default {
    name: "Login",
    data(){
      return {
        username: '',
        password: ''
      }
    },
    mounted() {
      run()
    },
    methods: {
      login() {
        if (this.username == '' || !!this.password == '') {
          this.$toast.fail("请输入用户名或者密码哦")
          return
        }
        let params = {
          'username': this.username,
          'password': this.password
        };
        this.$store.dispatch('Login', params)
          .then(() => {
            this.$router.push({path: '/'});
          })
          .catch((error) => {
            this.$toast.fail(error.data.message)
          })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/login.css";

</style>

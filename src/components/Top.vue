<template>
  <div>
    <van-nav-bar :title="title" left-arrow  @click-left="onClickLeft()">
      <van-icon name="apps-o" slot="right" @click="showPopup"/>
    </van-nav-bar>

    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%',width: '40%' }">
      <van-image
        fit="contain"
        src="https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/top.jpg"
      />

      <van-cell v-for="menu in menus" :title="menu.name" is-link :to="menu.url"  :icon="menu.icon"/>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "Top",
    props: {
      title: ''
    },
    data() {
      return {
        show: false,
        menus: []
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      showPopup(){
        this.show = true;
        console.log(this.show)
      }
    },

    mounted() {
      this.$axios.get(this.root + "/menu/getMenuList").then((response) => {
        this.menus = response.data.data;
      });
    }
  }
</script>

<style scoped>

</style>

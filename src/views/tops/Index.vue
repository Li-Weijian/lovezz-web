<template>
<div>
  <router-view />
  <van-tabbar route>
    <van-tabbar-item
      replace
      to="/tops/toTops"
      icon="home-o"
    >
      小日常
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/tops/publishTops"
      icon="records"
    >
      发表日常
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>

</style>

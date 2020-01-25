<template>
<div>
  <router-view />
  <van-tabbar route>
    <van-tabbar-item
      replace
      to="/galleryController/toGallery"
      icon="home-o"
    >
      记忆查看
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/galleryController/upload"
      icon="records"
    >
      记忆记录
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

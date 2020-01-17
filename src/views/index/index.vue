<template>
  <div>
    <top title="首页"></top>

    <van-grid :column-num="3" :gutter="10">
      <van-grid-item :icon="menu.icon" :text="menu.name" v-for="menu in menus" :to="menu.url"/>
    </van-grid>
  </div>

</template>

<script>
  import top from '@/components/Top'

  export default {
    components: {
      top
    },
    name: "index",
    methods: {},
    data() {
      return {
        menus: []
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

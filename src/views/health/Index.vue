<template>
  <div>
    <top title="健康"></top>
    <healCard :title="menu.title" :leftIcon="menu.icon" rightIcon="play-circle" :data="menu.data"
             :time="menu.time" iconColor="#1989fa" :unit="menu.unit"
             v-for="menu in menus" :url="menu.url"/>
  </div>
</template>

<script>
  import healCard from '@/components/HealthCard'
  import top from '@/components/Top'

  export default {
    name: "Index",
    components: {
      healCard,
      top
    },
    data() {
      return {
        menus: []
      }
    },

    mounted() {
      this.$axios.get(this.root + "/menu/getMenuList?type=2").then((response) => {
        let menuList = response.data.data;
        for (let i = 0; i < menuList.length; i++) {
          let element = menuList[i];
          this.$axios.get(this.root + element.url +  "/getMenuList").then((response) => {
            let data = response.data.data;
            let menu = {
              "title": element.name,
              "icon": element.icon,
              "data": data.data,
              "time": data.date,
              "unit": data.unit,
              "url": element.url
            }
            this.menus.push(menu)
          });
        }
      });
    }
  }
</script>

<style scoped>

</style>

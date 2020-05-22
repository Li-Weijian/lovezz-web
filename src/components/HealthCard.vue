<template>
  <div>
    <van-cell-group>
      <van-cell :title=title title-class="titleClass"/>
      <van-cell title-class="dataClass" label-class="timeClass"
                :icon=leftIcon size="large" :label=time
                is-link :to=url
                center clickable>

        <!-- 右侧图标-->
        <template #right-icon>
          <van-icon :name=rightIcon size="35" :color=iconColor style="line-height: inherit;"/>
        </template>
        <!--左侧图标-->
        <template #icon>
          <van-icon :name=leftIcon size="35" :color=iconColor style="line-height: inherit;margin-right: 10px"/>
        </template>

        <!-- 数据 -->
        <template #title>
          <span class="custom-title">{{data}}</span>
          <span class="unitClass">{{unit}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 分隔线-->
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">❤</van-divider>
  </div>
</template>

<script>
  export default {
    name: "Top",
    props: {
      title: '',  //标题
      leftIcon: '',  //左侧图标
      rightIcon: '',  //右侧图标
      data: '',   //数据
      unit: '',   //单位
      time: '',   //时间
      iconColor: '',   //图标颜色
      url: '',   //跳转

    },
    data() {
      return {}
    },
    methods: {},

    mounted() {
      this.$axios.get(this.root + "/menu/getMenuList").then((response) => {
        this.menus = response.data.data;
      });
    }
  }
</script>

<style scoped>

  .dataClass {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 4px;
  }

  .titleClass {
    font-weight: bold;
    font-size: 18px;
  }

  .timeClass {
    margin-top: 10px;
    font-size: 13px;
    letter-spacing: 1px;
  }

  .unitClass {
    font-size: 15px;
    margin-left: -14px;
    margin-bottom: -5px;
    letter-spacing: 0px;
  }
</style>

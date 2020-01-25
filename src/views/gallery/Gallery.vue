<template>

  <div>
    <top title="共同记忆"></top>
    <h3 id="title">「 我们拥有 {{count}} 个回忆啦 」</h3>
    <div class="container">

      <div class="item" v-for="(img, key) in imageList" @click="previewImage(key, imageList)" :key="key">
        <div class="item__content">
          <img :src="img + '?x-oss-process=image/auto-orient,1/quality,q_60'" v-lazy="img + '?x-oss-process=image/auto-orient,1/quality,q_60'">
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import top from '@/components/Top'
  import { ImagePreview } from 'vant';
  export default {
    name: "Gallery",

    components: {
      top
    },

    data() {
      return {
        imageList: [],
        count: 0,
      };
    },

    methods: {
      previewImage(key, imageList){
        imageList[key] = imageList[key] + "?x-oss-process=image/auto-orient,1";
        ImagePreview({
          images: imageList,
          startPosition: key,
          lazyLoad: true
        });


      }
    },

    mounted() {
      this.$axios.get(this.root + "/galleryController/getGallery").then((response) => {
        this.imageList = response.data.data.imageUrl;
        this.count = response.data.data.count;
      });
    }
  }
</script>

<style scoped>

  .container {
    column-count: 2;
    column-gap: 0px;
  }

  .item{
    break-inside: avoid;
  }

  .item__content img {
    width: 98%;
    height: 98%;
  }

  #title {
    text-align: center;
    color: #f62e74;
  }

</style>

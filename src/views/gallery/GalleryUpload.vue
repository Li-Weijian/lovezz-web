<template>
  <div>
    <top title="共同记忆"></top>

    <div id="upload">
      <van-uploader v-model="fileList" multiple  :max-count="10"/>

      <div id="rate">
        <van-rate v-model="value" :count="fileList.length" size="30px"
                  readonly
                  icon="like"
                  void-icon="like-o"/>
      </div>
      <van-button :loading="isLoading" loading-text="上传中，请耐心等待哦" :disabled="isLoading" block
                  color="linear-gradient(to right, 	#FF69B4, #C71585)" @click="uploadImg()">上传记忆
      </van-button>

    </div>

  </div>
</template>

<script>
  import top from '@/components/Top'
  export default {
    name: "GalleryUpload",
    components: {
      top
    },

    data() {
      return {
        fileList: [],
        isLoading: false,
        value: 0,
      }
    },

    watch:{
      'value':{
        deep:true,
        handler: function(newV, oldV) {

          //监听进度条value的变化判断是否上传完成
          if (newV == this.fileList.length){
            this.isLoading = false;
            setTimeout(()=>{
              this.$router.push({path: '/galleryController/toGallery'})
            }, 1000)
          }
        }
      }
    },

    methods: {


      //上传事件
      uploadImg(){
        if (!!this.fileList && this.fileList.length > 0){
          this.isLoading = true;
          let index = 0;
          for (index in this.fileList){
            this.uploadImgSingle(index);
          }
        }else {
          this.$toast.fail("请选择图片上传哦")
        }
      },

      uploadImgSingle(index){
        let fd = new FormData();
        fd.append("fileupload",this.fileList[index].file);

        this.$axios.post(this.root + "/galleryController/uploadImages", fd, {headers: {
            'Content-Type': 'multipart/form-data'
          }}).then(res => {
          if (res.data.status == 200){
            //设置进度条
            this.value = this.value+1;
            return res.data.data;
          }

        }).catch(err => {
          this.$toast.fail("上传失败");
          this.isLoading = false;
        })
      }
    }

  }
</script>

<style scoped>

  #upload {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  #rate {
    margin: 10px;

  }

</style>

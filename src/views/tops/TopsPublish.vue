<template>
  <div>
    <top title="小日常"></top>

    <div id="upload">

      <van-field
        v-model="topText"
        rows="2"
        autosize
        type="textarea"
        maxlength="254"
        placeholder="请输入你的想法~"
        show-word-limit
      />


      <van-uploader v-model="fileList" multiple :max-count="9"/>

      <van-button :loading="isLoading" loading-text="发表中，请耐心等待哦" :disabled="isLoading" block
                  color="linear-gradient(to right, 	#FF69B4, #C71585)" @click="publishTops()">发表日常
      </van-button>

    </div>
  </div>

</template>

<script>
  import top from '@/components/Top'

  export default {
    name: "TopsPublish",
    components: {
      top
    },

    data() {
      return {
        fileList: [],
        isLoading: false,
        topText: ""
      }
    },

    methods: {
      //上传事件
      publishTops() {
        if (this.fileList.length != 0 || this.topText != ""){
          this.isLoading = true;
          let fd = new FormData();

          for (let i = 0; i < this.fileList.length; i++) {
            console.log(this.fileList);
            fd.append("file", this.fileList[i].file);
          }
          fd.append("topText", this.topText);

          this.$axios.post(this.root + "/tops/publishTops", fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            if (res.data.code == 200) {
              this.$toast.success("发表成功啦");
              setTimeout(()=>{
                this.$router.push({path: '/tops/toTops'})
              }, 1000)
            }

          }).catch(err => {
            this.$toast.fail("发表失败");
            this.isLoading = false;
          })
        }else {
          this.$toast.fail("请输入内容或者选择图片再发表哦");
        }
      },
    }
  }
</script>

<style scoped>

</style>

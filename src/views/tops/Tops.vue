<template>
  <div>
    <top title="小日常"></top>

    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我也是有底线的~"
        @load="onLoad"
      >

        <div v-for="top in list">

          <!-- 头像 名称-->
          <van-row>
            <van-col span="3" offset="1">
              <img class="icon" v-if="top.tops.userId == 1"
                   src="https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/boy.jpg">
              <img class="icon" v-if="top.tops.userId == 2"
                   src="https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/girl.jpg">
            </van-col>
            <van-col span="8">
              <h3 class="realname">{{top.tops.realname}}</h3>
            </van-col>
          </van-row>

          <!-- 内容 -->
          <van-row>
            <van-col offset="4" span="18">
              <pre class="content">{{top.tops.content}}</pre>
            </van-col>
          </van-row>

          <!-- 图片 -->
          <van-row>
            <van-col offset="4" span="2" v-for="(img, key) in top.galleryList" :key="key"
                     @click="previewImage(key, top.galleryList)">
              <van-image
                width="5rem"
                height="5rem"
                fit="contain"
                :src="img.url + '?x-oss-process=image/auto-orient,1/quality,q_60'"
              />
            </van-col>
          </van-row>

          <!-- 发表时间，操作按钮 -->
          <van-row type="flex" justify="space-between">
            <van-col offset="4">
              <van-tag plain>{{new Date(top.tops.createTime).toLocaleString()}}</van-tag>
            </van-col>
            <van-col span="2" offset="2">
              <!-- 弹出层-->
              <van-icon name="ellipsis" @click="showSheet(top.tops.id, '0')" />
            </van-col>
          </van-row>

          <!-- 评论-->
          <div v-for="commList in top.commentsList" class="comment-bg" >
            <van-row v-for="comm in commList" type="flex" justify="space-between">
              <van-col offset="4">
                <pre class="comment">> {{comm.content}}</pre>
              </van-col>
              <van-col span="2" offset="1">
                <!-- 弹出层-->
                <van-icon name="ellipsis" @click="showSheet(comm.id, '1')" class="op-btn"/>
              </van-col>
            </van-row>
          </div>

          <van-action-sheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            @cancel="onCancel"
            @select="onSelect"/>

          <!-- 分隔线-->
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">❤</van-divider>
        </div>

        <van-dialog
          @confirm="saveContext"
          @cancel="cancelDialog"
          v-model="dialogShow"
          title="评论"
          show-cancel-button>
          <van-field v-model="context" placeholder="请在这里输入内容"/>
        </van-dialog>

      </van-list>
    </div>

  </div>

</template>

<script>
  import top from '@/components/Top'
  import {ImagePreview} from 'vant';

  export default {

    name: "Tops",
    components: {
      top
    },
    data() {
      return {
        id: "",
        flag: "", //0： 说说， 1：评论
        list: [],
        loading: false,
        finished: false,
        page: 0,//请求第几页
        pageSize: 10,//每页请求的数量
        total: 0,//总共的数据条数
        context: "",
        show: false,
        dialogShow: false,
        actions: [
          {name: '评论'},
          {name: '删除'}
        ]

      }
    },

    methods: {

      saveContext() {
        this.$axios.get(this.root + "/tops/doCommont",{
          params: {
            content: this.context,
            topId: this.id,
            flag: this.flag
          }
        }).then((response) => {
          this.$router.go(0);
        });
      },

      getTopsList() {
        let offset = (this.page - 1) * this.pageSize;
        this.$axios.get(this.root + "/tops/getTopsList?offset=" + offset + "&limit=" + this.pageSize).then((response) => {
          if (response.data.data == null || response.data.data.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          this.loading = false;
          this.list = this.list.concat(response.data.data);
          console.log(this.list);
        });
      },

      deleteTops(){
        this.$axios.get(this.root + "/tops/deleteTops",{
          params: {
            topsId: this.id,
            flag: this.flag
          }
        }).then((response) => {
          this.$router.go(0);
        });
      },

      previewImage(key, imageList) {

        ImagePreview({
          images: imageList.map(obj => {
            return obj.url + "?x-oss-process=image/auto-orient,1"
          }),
          startPosition: key,
          lazyLoad: true
        });
      },

      //滚动加载时触发，list组件定义的方法
      onLoad() {
        this.page++;
        this.getTopsList();
      },

      //取消弹出层
      onCancel() {
        this.show = false;
      },

      cancelDialog(){
        this.context = '';
      },

      //显示弹出层
      showSheet(id, flag) {
        this.show = true;
        this.id = id;
        this.flag = flag;
      },

      //选择弹出层回调
      onSelect(item) {
        this.show = false;
        let op = item.name;
        if (op == '评论') {
          this.dialogShow = true;

        } else if (op == '删除') {
          this.$dialog.confirm({
            title: '删除',
            message: '确定要删除该内容吗？'
          }).then(() => {
            //确认
            this.deleteTops();
          })
        } else {
          this.$toast("操作未识别");
        }
      },

    }
  }
</script>

<style scoped>

  .icon {
    width: 40px;
    height: 40px;
    margin-top: 10px;

  }

  .realname {
    color: #6495ed;
    font-size: 14px;
    line-height: 20px;
  }

  .content {
    font-size: 14px;
    font-family: 微软雅黑;
    color: #323233;
    /*line-height: 20px;*/
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 6px;
    margin-top: -14px;
  }

  .comment{
    font-size: 12px;
    font-family: 微软雅黑;
    color: #323233;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: -4px;
  }

  .op-btn{
    margin-top: 10px;
  }

  .comment-bg {
    /*background: #F8f8f8;*/
  }

  .demo-preview {
    color: #323233;
    font-size: 16px;
    font-family: PingFang SC, 'Helvetica Neue', Arial, sans-serif;
    display: flex;
    padding: 0 16px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .demo-preview img {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }


  .demo-content {
    color: #323233;
    font-size: 16px;
    padding-top: 6px;
  }

  .demo-content h3 {
    color: #6495ed;
    margin: 0;
    font-size: 16px;
    line-height: 20px;
  }

  .demo-content pre {
    margin: 13px 0 0;
    font-size: 14px;
    font-family: 微软雅黑;
    color: #323233;
    line-height: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 6px;
  }


</style>

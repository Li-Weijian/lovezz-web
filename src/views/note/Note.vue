<template>
  <div>
    <top title="小约定"></top>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in images">
        <van-image height="300" :src="image"/>
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-field placeholder="亲爱哒，请输入你要记录的事情~" v-model="context">
        <van-button slot="button" size="small" type="primary" @click="saveContext()">保存</van-button>
      </van-field>
    </van-cell-group>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我也是有底线的~"
      @load="onLoad">
      <van-cell v-for="note in noteList" :key="note.id">
        <template slot="title">
          <div>
            <span v-if="note.isComplete == '0'" class="custom-title">{{note.context}}</span>
            <del v-if="note.isComplete == '1'" class="custom-title">{{note.context}}</del>
          </div>
          <div>
            <van-tag mark type="warning">{{note.realname}}</van-tag>
            <van-tag plain>{{new Date(note.date).toLocaleString()}}</van-tag>
          </div>
        </template>

        <template slot="right-icon">
          <van-icon name="ellipsis" @click="showSheet(note.id, note.isComplete, note.context)" />

          <van-action-sheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            @cancel="onCancel"
            @select="onSelect"/>
        </template>
      </van-cell>
    </van-list>

    <van-dialog
      @confirm="saveContext"
      @cancel="cancelDialog"
      v-model="dialogShow"
      title="修改"
      show-cancel-button>
      <van-field v-model="context" placeholder="请在这里输入修改内容"/>
    </van-dialog>

  </div>
</template>

<script>
  import Img1 from '../../assets/images/note/1.jpg'
  import Img2 from '../../assets/images/note/2.jpg'
  import Img3 from '../../assets/images/note/3.jpg'
  import Img4 from '../../assets/images/note/4.jpg'
  import top from '@/components/Top'

  export default {
    name: "Note",
    components: {
      top
    },

    data() {
      return {
        images: [Img1, Img2, Img3, Img4],
        context: "",
        noteList: [],
        loading: false,
        finished: false,
        page: 0,//请求第几页
        pageSize: 10,//每页请求的数量
        total: 0,//总共的数据条数
        id: '',
        isComplete: '',

        show: false,
        dialogShow: false,
        actions: [
          { name: '修改'},
          { name: '修改完成状态'},
          { name: '删除'}
        ]
      }
    },

    methods: {
      saveContext() {
        this.$axios.get(this.root + "/noteController/savaContent",{
          params: {
            context: this.context,
            id: this.id,
          }
        }).then((response) => {
          this.$router.go(0);
        });
      },

      completeNote(){
        this.$axios.get(this.root + "/noteController/savaContent",{
          params: {
            isComplete: this.isComplete,
            id: this.id,
          }
        }).then((response) => {
          this.$router.go(0);
        });
      },

      deleteNote(){
        this.$axios.get(this.root + "/noteController/savaContent",{
          params: {
            isDelete: '1',
            id: this.id,
          }
        }).then((response) => {
          this.$router.go(0);
        });
      },

      getNoteList() {
        let offset = (this.page - 1) * this.pageSize;
        this.$axios.get(this.root + "/noteController/getNoteList?offset=" + offset + "&limit=" + this.pageSize).then((response) => {
          if (response.data == null || response.data.length === 0) {
            // 加载结束
            this.finished = true;
            return;
          }
          this.loading = false;
          this.noteList = this.noteList.concat(response.data);
        });
      },

      //滚动加载时触发，list组件定义的方法
      onLoad() {
        this.page++;
        this.getNoteList();
      },

      //取消弹出层
      onCancel() {
        this.show = false;
      },

      cancelDialog(){
        this.context = '';
      },

      //显示弹出层
      showSheet(id,isComplete,context){
        this.show = true;
        this.isComplete = isComplete;
        this.id = id;
        this.context = context;
      },

      //选择弹出层回调
      onSelect(item) {
        this.show = false;
        let op = item.name;
        if (op == '修改'){
          this.dialogShow = true;

        }else if (op == '修改完成状态'){
          let message = '';

          if (this.isComplete == '1'){
            message = '宝贝，确认要修改为未完成吗？';
          }else {
            message = "宝贝，确定完成该约定了吗？";
          }

          this.$dialog.confirm({
            title: '修改完成状态',
            message: message
          }).then(() => {
            //确认
            if (this.isComplete == '1'){
              this.isComplete = '0'
            }else if (this.isComplete == '0'){
              this.isComplete = '1'
            }
            this.completeNote();
          })

        }else if (op == '删除'){
          this.$dialog.confirm({
            title: '删除约定',
            message: '确定要删除该约定吗？'
          }).then(() => {
            //确认
            this.deleteNote();
          })
        }else {
          this.$toast("操作未识别");
        }
      }
    },
  }
</script>

<style scoped>

</style>

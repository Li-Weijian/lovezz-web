<template>

  <div>
    <top title="体重"></top>
    <div style="margin-top: 6px">
      <van-tabs type="card" color="#1989FA" @click="changeTab">
        <van-tab title="记录">
          <!-- 允许输入数字，调起带符号的纯数字键盘 -->
          <div style="margin-top: 20px">
            <van-cell-group>
              <van-field v-model="number" type="number" label="体重："
                         size="large" autofocus="true" label-width="50px" label-align="center"
                         left-icon="thumb-circle-o" placeholder="请问你今天瘦了吗~">
                <template #button>
                  <van-button size="small" type="primary">千克</van-button>
                </template>
              </van-field>
            </van-cell-group>

            <button type="button" @click="submit" class="record">
              <span style="font-size: 30px; color: #ffffff">立即记录</span>
            </button>
          </div>
        </van-tab>

        <van-tab title="统计">
          <div style="margin-left: 70px; margin-top: 10px">
            <van-radio-group v-model="radio" direction="horizontal" @change="changeRadio">
              <van-radio name="7" icon-size="16px">七天</van-radio>
              <van-radio name="10" icon-size="16px">十天</van-radio>
              <van-radio name="30" icon-size="16px">三十天</van-radio>
            </van-radio-group>
          </div>

          <div>
            <h4 style="margin-left: 10px">· 图表统计</h4>
            <canvas id="myChart" width="350" height="260"></canvas>
            <h4 style="margin-left: 10px">· 详细列表</h4>

            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">

              <van-cell v-for="item in weightList">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <span class="custom-title">{{item.date}}</span>
                  <van-tag type="success">{{item.value}} 千克</van-tag>
                </template>

                <template #label>
                  {{item.type}}
                </template>
              </van-cell>
            </van-list>
          </div>

        </van-tab>
      </van-tabs>
    </div>

  </div>

</template>

<script>
  import top from '@/components/Top'
  import F2 from '@antv/f2';
  import _ from 'lodash';

  export default {
    name: "Weight",
    components: {
      top
    },


    methods: {

      //单选框改变回调
      changeRadio: function(name) {
        if (name != -1){
          this.day = name;
          this.radio = name;
          this.draw();
          this.getWeightList();
        }else {

        }
      },

      onLoad() {
        this.getWeightList();
      },

      //获取列表
      getWeightList: function () {
        this.$axios.get(this.root + "/weight/getWeightList?day=" + this.day).then((response) => {
          this.finished = true;
          this.loading = false;
          this.weightList = response.data.data;
        })
      },

      //提交
      submit: function () {
        if (this.number == '') {
          this.$dialog.alert({
            message: '请输入你的体重哦',
          }).then(() => {

          });
        } else {
          this.$axios.get(this.root + "/weight/isExist").then((response) => {
            if (response.data.data == 1) {
              //今日已打卡
              this.$dialog.confirm({
                title: '确认消息',
                message: '今日已打卡，是否覆盖打卡信息？',
              }).then(() => {
                //添加体重
                this.$axios.get(this.root + "/weight/addWeight?weight=" + this.number).then((response) => {

                })
              })
            } else {
              //否则直接添加体重
              this.$axios.get(this.root + "/weight/addWeight?weight=" + this.number).then((response) => {

              })
            }

          })
        }
      },

      //切换标签渲染统计图
      changeTab: function (name, title) {
        if (name == 1) {
          this.draw();
        }
      },
      getChart: async function () {
        await this.$axios.get(this.root + "/weight/getChart?day=" + this.day).then((response) => {
          this.dataList = response.data.data;
        })
      },

      draw: async function () {
        await this.getChart();

        const chart = new F2.Chart({
          id: 'myChart',
          pixelRatio: window.devicePixelRatio, // 指定分辨率
        });

        chart.source(this.dataList, {
          date: {
            range: [0, 1],
            type: 'timeCat',
            mask: 'MM-DD'
          },
          value: {
            max: 80,
            tickCount: 4
          }
        });
        chart.tooltip({
          showCrosshairs: true,
          custom: true, // 自定义 tooltip 内容框
          onChange: function onChange(obj) {
            const legend = chart.get('legendController').legends.top[0];
            const tooltipItems = obj.items;
            const legendItems = legend.items;
            const map = {};
            legendItems.forEach(function (item) {
              map[item.name] = _.clone(item);
            });
            tooltipItems.forEach(function (item) {
              const name = item.name;
              const value = item.value;
              if (map[name]) {
                map[name].value = value;
              }
            });
            legend.setItems(_.values(map));
          },
          onHide: function onHide() {
            const legend = chart.get('legendController').legends.top[0];
            legend.setItems(chart.getLegendItems().country);
          }
        });
        chart.axis('date', {
          label: function label(text, index, total) {
            const textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        });
        chart.area()
          .position('date*value')
          .color('type')
          .adjust('stack');
        chart.line()
          .position('date*value')
          .color('type')
          .adjust('stack');

        //折线图
        /* // Step 2: 载入数据源
         chart.source(this.dataList);
         console.log(JSON.stringify(this.dataList));

         chart.scale('date', {
           type: 'timeCat',
           tickCount: 4,
           mask:'MM-DD'
         });
         chart.scale('value', {
           tickCount: 5
         });
         chart.axis('date', {
           label: function label(text, index, total) {
             // 只显示每一年的第一天
             const textCfg = {};
             if (index === 0) {
               textCfg.textAlign = 'left';
             } else if (index === total - 1) {
               textCfg.textAlign = 'right';
             }
             return textCfg;
           }
         });
         chart.tooltip({
           custom: true, // 自定义 tooltip 内容框
           onChange: function onChange(obj) {
             const legend = chart.get('legendController').legends.top[0];
             const tooltipItems = obj.items;
             const legendItems = legend.items;
             const map = {};
             legendItems.forEach(function (item) {
               map[item.name] = _.clone(item);
             });
             tooltipItems.forEach(function (item) {
               const name = item.name;
               const value = item.value;
               if (map[name]) {
                 map[name].value = value;
               }
             });
             legend.setItems(_.values(map));
           },
           onHide: function onHide() {
             const legend = chart.get('legendController').legends.top[0];
             legend.setItems(chart.getLegendItems().country);
           }
         });
         chart.line().position('date*value').color('type');
 */
        // Step 4: 渲染图表
        chart.render();

      }

    },
    data() {
      return {
        day: 10,
        dataList: [],
        // {"date": "2017-09-17", "type": "金属", "value": 82.7},
        number: '',
        weightList: [],
        loading: false,
        finished: false,
        radio: '10',
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

  .record {
    width: 150px;
    height: 150px;
    background-color: #f5a623;
    border-radius: 50%;
    border: 0px solid;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
  }

  .record:active {
    top: 2px; /**向下偏移2px **/
  }

</style>

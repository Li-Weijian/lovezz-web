<template>
  <div>
    <top title="相爱计时"></top>

    <div id="loveText">
      {{word}}
    </div>

    <div>
      <van-row class="rowClass">

        <van-col span="8">
          <van-circle
            v-model="currentYearRate"
            :rate="yearRate"
            :color="gradientColor"
            size="110px"
            :text="yearText"
            :speed="100"
            fill="#FFB6C1"
          />
        </van-col>

        <van-col span="8">
          <van-circle
            v-model="currentWeekRate"
            :rate="weekRate"
            :color="gradientColor"
            size="110px"
            :text="weekText"
            :speed="100"
            fill="#FFB6C1"
          />
        </van-col>

        <van-col span="8">
          <van-circle
            v-model="currentDayRate"
            :rate="dayRate"
            :color="gradientColor"
            size="110px"
            :text="dayText"
            :speed="100"
            fill="#FFB6C1"
          />
        </van-col>

      </van-row>


      <van-row class="rowClass">
        <van-col span="8">
          <van-circle
            v-model="currentHourRate"
            :rate="hourRate"
            :color="gradientColor"
            size="110px"
            :text="hourText"
            :speed="100"
            fill="#FFB6C1"
          />
        </van-col>

        <van-col span="8">
          <van-circle
            v-model="currentMinRate"
            :rate="minRate"
            :color="gradientColor"
            size="110px"
            :text="minText"
            :speed="100"
            fill="#FFB6C1"
          />
        </van-col>

        <van-col span="8">
          <van-circle
            v-model="currentSecRate"
            :rate="secRate"
            :color="gradientColor"
            size="110px"
            :text="secText"
            :speed="100"
            fill="#FFB6C1" />
        </van-col>


      </van-row>
    </div>

    <div id="loveDay">
      我们已经在一起 {{weekRate * 7 + dayRate / 14}} 天了<br/>
      入目无别人 四下皆是你
    </div>
  </div>



</template>

<script>
  import top from '@/components/Top'

  let loveDate = new Date(2019,4,21,12,0,0);

  export default {
    name: "Tic",
    components: {
      top
    },
    data() {
      return {
        weekRate: 0,
        dayRate:0,
        yearRate:0,
        hourRate:0,
        minRate:0,
        secRate:0,
        currentWeekRate: 0,
        currentDayRate: 0,
        currentYearRate:0,
        currentHourRate:0,
        currentMinRate:0,
        currentSecRate:0,
        gradientColor: {
          '0%': '#3fecff',
          '100%': '#6149f6'
        },

        word: '',
      };
    },

    methods: {
      weeksBetw(date1, date2) {
        let time1 = new Date(date1);
        let time2 = new Date(date2);
        let dt1 = time1.getTime();
        let dt2 = time2.getTime();
        return parseInt(Math.abs(dt2 - dt1) / 1000 / 60 / 60 / 24 / 7);
      },

      daysBetw(date1, date2){
        let time1 = Date.parse(date1);
        let time2 = Date.parse(date2);
        return parseInt(Math.abs(time2 - time1)/1000/60/60/24);
      },

      yearBetw(date1, date2){
        let day = this.daysBetw(date1,date2);
        if (day < 365){
         return 0;
        }else {
         return day % 365;
        }
      },

      hourBetw(date1, date2){
        let time1 = new Date(date1);
        let time2 = new Date(date2);
        return parseInt(Math.abs(time2.getHours() - time1.getHours()))
      },

      minBetw(date1, date2){
        let time1 = new Date(date1);
        let time2 = new Date(date2);
        return parseInt(Math.abs(time2.getMinutes() - time1.getMinutes()));

      },

      secBetw(date1, date2){
        let time1 = new Date(date1);
        let time2 = new Date(date2);
        return parseInt(Math.abs(time2.getSeconds() - time1.getSeconds()));

      },

      showWord(word, speed){

        let words = word.split('');
        let i = 0;

        let interval = setInterval(() =>{
          this.word += words[i++];
          if (word.length == i){
            clearInterval(interval)
          }
        },speed);
      }
    },

    computed: {
      weekText() {
        return this.weekRate + ' weeks';
      },

      dayText(){
        return this.dayRate / 14 + ' days';
      },

      yearText(){
        return this.yearRate + ' years';
      },

      hourText(){
        return this.hourRate / 4.1 + ' hours'
      },

      minText(){
        return parseInt(this.minRate / 1.66) + ' minutes'
      },

      secText(){
        return parseInt(this.secRate / 1.66) + ' seconds'
      }
    },

    mounted() {

      setInterval(()=>{
        let now = new Date();
        this.weekRate = this.weeksBetw(loveDate,now);
        this.dayRate = this.daysBetw(loveDate,now) % 7 * 14;
        this.yearRate = this.yearBetw(loveDate,now);
        this.hourRate = this.hourBetw(loveDate,now) * 4.1;
        this.minRate = this.minBetw(loveDate,now) * 1.66;
        this.secRate = this.secBetw(loveDate,now) * 1.66;

      },1000);

      this.$axios.get(this.root + "/ticController/getLoveText").then((response) => {
        this.showWord(response.data.data, 200)
      });
    }
  }
</script>

<style scoped>

  .rowClass{
    margin-top: 20px;
    margin-left: 20px;
  }

  #loveText {
    margin: 10% 20%;
    color: #f62e74;
    text-align: center;
    font-size: 25px;
  }

  #loveDay {
    margin: 10% 20%;
    text-align: center;
    color: #1989fa;
  }

</style>

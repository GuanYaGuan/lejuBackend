<template>
  <div ref="dashboard_main" class="echarts-main">
    <!-- 顶部 样式 -->
    <div class="top-nav">
      <div class="view-box" @click="screenAll">
        <i
          class="el-icon-full-screen"
          style="color: #9aa8d4; font-size: 22px"
        />
      </div>
      <div class="center">
        <span class="title">不凡数据大屏</span>
        <img
          src="http://zhujinlong.gitee.io/leju_shop_admin/static/img/titleBG.a4cdf1b6.png"
          width="100%"
          alt=""
        >
      </div>
      <div class="time">{{ date | filTime }}</div>
    </div>
    <div class="bottom-body">
      <!-- 电商数据 -->
      <div class="main-left">
        <div class="data-box">
          <span class="title">电商数据 Shell Data</span>
          <div class="info">
            <span>销售量</span>
            <span style="color: #73aae5">万元</span>
          </div>
          <div class="num-box">
            <countTo :start-val="startVal" :end-val="endVal" :duration="3000" />
          </div>
          <div class="info">
            <span>完成百分比</span>
          </div>
          <div id="child" class="progress-box">
            <div class="font-box">
              {{ strp }}
            </div>
            <div class="font-box-b">
              <span>{{ endp }}</span>
            </div>
            <div id="child" class="pro-child" />
          </div>
        </div>
        <div class="data-box-b">
          <span class="title-b">热门搜索词 Top Search</span>
          <div class="world-box">
            <worldClouds />
          </div>
        </div>
      </div>
      <!-- 中部数据 -->
      <div class="main-center">
        <!-- 订单柱状图 -->
        <div class="order-e">
          <OrderEcharts :order-data="orderData" />
        </div>
        <!-- 底部地图和饼图 -->
        <div class="map-pie">
          <div class="left">
            <mapEcharts />
          </div>
          <div class="right">
            <pieEcharts />
          </div>
        </div>
      </div>
      <!-- 右边数据 -->
      <div class="main-right">
        <span style="font-size: 22px">统计数据 Statistics Data</span>
        <div class="other">
          <div class="item">
            <div class="left">
              <img src="@/assets/staImg1.png" width="50" height="50" alt="">
            </div>
            <div class="right">
              <div class="top">85.6</div>
              <div class="bottom">订单总数 (万)</div>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <img src="@/assets/staImg2.png" width="50" height="50" alt="">
            </div>
            <div class="right">
              <div class="top">32.5</div>
              <div class="bottom">销售总量 (万元)</div>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <img src="@/assets/staImg3.png" width="50" height="50" alt="">
            </div>
            <div class="right">
              <div class="top">92.6</div>
              <div class="bottom">人均消费 (万)</div>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <img src="@/assets/staImg4.png" width="50" height="50" alt="">
            </div>
            <div class="right">
              <div class="top">45.6</div>
              <div class="bottom">近十分钟新增订单数量</div>
            </div>
          </div>
        </div>
        <span style="font-size: 22px">大额订单Top Supper Orders</span>
        <div class="table-box">
          <el-table
            :data="tableData"
            :border="false"
            size="small"
            :cell-style="tableCellStyle"
            :header-cell-style="{
              background: '#0a1631',
              color: '#fff',
              border: '1px solid #9aa8d4',
            }"
          >
            <el-table-column
              label="时间"
              width="105"
              prop="date"
              align="center"
            />
            <el-table-column label="物品" prop="name" align="center" />
            <el-table-column label="数量" prop="number" align="center" />
            <el-table-column label="金额" prop="price" align="center" />
          </el-table>
        </div>
      </div>
    </div>
    <!-- 底部 动态例子 -->
    <div class="bottom-footer">
      <BgAnimate />
    </div>
  </div>
</template>

<script>
import OrderEcharts from './components/orderEcharts.vue'
import worldClouds from './components/worldClouds.vue'
import pieEcharts from './components/pieEcharts.vue'
import mapEcharts from './components/mapEcharts.vue'
import BgAnimate from './components/BgAnimate.vue'
import screenfull from 'screenfull'
import { mockData } from './mockOrder'
import { tableData } from './tableData'
import countTo from 'vue-count-to'
var zeroFill = function(value) {
  return value < 10 ? '0' + value : value
}
export default {
  name: 'Dashboard',
  components: {
    OrderEcharts,
    worldClouds,
    pieEcharts,
    BgAnimate,
    mapEcharts,
    countTo
  },
  filters: {
    filTime(value) {
      var date = new Date()
      var year = date.getFullYear() // 存储年
      var month = zeroFill(date.getMonth() + 1) // 存储月份
      var day = zeroFill(date.getDate()) // 存储日期
      var hours = zeroFill(date.getHours()) // 存储时
      var minutes = zeroFill(date.getMinutes()) // 存储分
      var seconds = zeroFill(date.getSeconds()) // 存储秒
      // 返回格式化后的日期
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        '-' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    }
  },
  data() {
    return {
      date: new Date(),
      startVal: 985548,
      endVal: 12010284,
      percentage: 88,
      strp: '50%',
      endp: '80%'
    }
  },
  computed: {
    orderData() {
      return mockData()
    },
    tableData() {
      return tableData
    }
  },
  mounted() {
    // 给原生标签 添加 自定义 样式 属性
    document
      .getElementById('child')
      .style.setProperty('--animationWidthEnd', this.endp)
    document
      .getElementById('child')
      .style.setProperty('--animationWidthStr', this.strp)
    // 创建定时器更新最新的时间
    var _this = this
    this.timeId = setInterval(function() {
      _this.date = new Date()
    }, 1000)
  },
  beforeDestroy: function() {
    // 实例销毁前青出于定时器
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  },
  methods: {
    // 点击 按钮 即可 全屏
    screenAll() {
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.dashboard_main)
      }
    },
    // 背景颜色处理
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      return 'background-color: #0a1631;color:#fff;border:1px solid #9aa8d4'
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-main {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #0a1631;
  color: #9aa8d4;
  .top-nav {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .view-box {
      width: 25px;
      height: 25px;
      border: 1px solid #9aa8d4;
    }
    .center {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 80%;
      .title {
        position: absolute;
        bottom: 40px;
        font-size: 36px;
        color: #fff;
        text-shadow: #fff 0 0 15px;
        font-weight: 700;
      }
    }
    .time {
      font-size: 20px;
      color: #fff;
      margin-right: 20px;
      margin-top: 10px;
    }
  }
  .bottom-body {
    display: flex;
    justify-content: space-between;
    .main-left {
      .data-box {
        width: 370px;
        .title {
          font-size: 22px;
        }
        .info {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
        .num-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 70px;
          font-size: 60px;
          color: #fff;
          letter-spacing: 5px;
          font-weight: 700;
        }
        .font-box {
          position: absolute;
          top: -25px;
          left: var(--animationWidthStr);
          transform: translateX(-50%);
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          opacity: 1;
          animation: WidthStr 2s 2s forwards;
        }
        .font-box-b {
          position: absolute;
          top: -25px;
          left: var(--animationWidthEnd);
          transform: translateX(-50%);
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          opacity: 0;
          animation: WidthEnd 2s 2s forwards;
        }
        @keyframes WidthStr {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes WidthEnd {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .progress-box {
          margin-top: 40px;
          width: 100%;
          height: 10px;
          background-color: #33416b;
          border-radius: 5px;
          position: relative;
          .pro-child {
            position: absolute;
            top: 0;
            left: 0;
            width: var(--animationWidthStr);
            height: 100%;
            background-image: linear-gradient(to right, #24cbff, #8a0bff);
            border-radius: 5px;
            animation: slide 2s linear 2s forwards;
            &::after {
              content: "";
              width: 0;
              height: 0;
              position: absolute;
              right: 0;
              top: 10px;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid #fff;
              transform: translateX(9px);
            }
          }
        }
      }
      @keyframes slide {
        from {
          width: var(--animationWidthStr);
        }
        to {
          // 自定义属性
          // --demo:50%;
          width: var(--animationWidthEnd);
        }
      }
      .data-box-b {
        margin-top: 20px;
        .title-b {
          font-size: 22px;
        }
        .world-box {
          width: 360px;
          height: 390px;
          margin-top: 20px;
        }
      }
    }
    .main-center {
      margin-left: 30px;
      .order-e {
        width: 700px;
        height: 400px;
      }
      .map-pie {
        display: flex;
        width: 700px;
        height: 360px;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          width: 50%;
          height: 100%;
        }
        .right {
          display: flex;
          align-items: center;
          width: 50%;
          height: 100%;
        }
      }
    }
    .main-right {
      width: 355px;
      .other {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        width: 350px;
        .item {
          display: flex;
          width: 42%;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .top {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
          }
          .bottom {
            font-size: 12px;
            color: #b0c2f9;
          }
        }
      }
      .table-box {
        margin-top: 20px;
      }
    }
  }
  .bottom-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 25%;
  }
}
</style>

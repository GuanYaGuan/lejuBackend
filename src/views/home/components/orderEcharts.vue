<template>
  <div class="order-echarts">
    <div id="orderEcharts" class="orderEcharts" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    orderData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {

    }
  },
  mounted() {
    this.initOrderEcharts()
  },

  methods: {
    // 初始化 echarts
    initOrderEcharts() {
      // 初始化 echarts 对象
      var dateList = []
      var orderList = []
      var returnList = []
      this.orderData.forEach(ele => {
        dateList.push(ele.date)
        orderList.push(ele.orderNume)
        returnList.push(ele.returnNum)
      })
      var demoEchart = echarts.init(document.getElementById('orderEcharts'))
      // 生命 options 对象
      var option = {
        title: {
          text: '订单退单柱状图',
          // 标题字体样式
          textStyle: {
            color: '#9AA8D4',
            fontSize: 22,
            fontWeight: 'normal'
          }
        },
        // 两个按钮的样式
        legend: {
          // 对应 series里的 name
          data: ['订单', '退单'],
          // 距离底部
          bottom: 10,
          // 字体样式
          textStyle: {
            color: '#A8AAB3', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        // 悬停上时 的提示框
        tooltip: {
          backgroundColor: 'raba(0,0,0,.4)',
          textStyle: {
            color: '#FFFFFF'
          }
        },
        xAxis: {
          type: 'category',
          data: dateList,
          // x线的样式
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#A8AAB3', // 左边线的颜色
              width: '1'// 坐标线的宽度
            }
          },
          axisLabel: {
            // 坐标轴字体样式
            textStyle: {
              color: '#A8AAB3', // 坐标值得具体的颜色
              fontSize: 12
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          // y线的样式
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#A8AAB3', // 左边线的颜色
              width: '1'// 坐标线的宽度
            }
          },
          axisLabel: {
            // 坐标轴字体样式
            textStyle: {
              color: '#A8AAB3', // 坐标值得具体的颜色
              fontSize: 12
            }
          }
        },
        series: [
          {
            name: '订单',
            type: 'bar',
            data: orderList,
            itemStyle: {
              normal: {
                // 渐变柱状图
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#7D05E2' }, // 柱图渐变色
                    { offset: 0.5, color: '#B600FF' }, // 柱图渐变色
                    { offset: 1, color: '#BC04E2' } // 柱图渐变色
                  ]
                )
              }

            }
          },
          {
            name: '退单',
            type: 'bar',
            data: returnList,
            itemStyle: {
              normal: {
                // 渐变柱状图
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#24CBFF' }, // 柱图高亮渐变色
                    { offset: 0.5, color: '#24A3FF' }, // 柱图高亮渐变色
                    { offset: 1, color: '#2492FF' } // 柱图高亮渐变色
                  ]
                )
              }

            }
          }
        ],
        // 柱子弹出来的动画样式
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }
      // 设置 图表
      demoEchart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-echarts{
    width: 100%;
    height: 100%;
    .orderEcharts{
        width: 100%;
        height: 100%;
    }
}
</style>

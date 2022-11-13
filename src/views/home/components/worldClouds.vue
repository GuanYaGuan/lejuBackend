<template>
  <div id="box" style="width: 100%;height:100%" />
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {

  data() {
    return {
      worddata: [
        {
          name: '总出行9次',
          value: 3000
        },
        {
          name: '特级席次偏好',
          value: 2500
        },
        {
          name: '6-12出行偏好',
          value: 2300
        },
        {
          name: '价格不敏感',
          value: 2000
        },
        {
          name: '时间敏感',
          value: 1900
        },
        {
          name: '高铁偏好',
          value: 1800
        },
        {
          name: '常用北京南站',
          value: 1700
        },

        {
          name: '总出行9次',
          value: 3100
        },
        {
          name: '特级席次偏好',
          value: 2150
        },
        {
          name: '6-12出行偏好',
          value: 2020
        },
        {
          name: '价格不敏感',
          value: 2100
        },
        {
          name: '时间敏感',
          value: 1910
        },
        {
          name: '高铁偏好',
          value: 1810
        },
        {
          name: '常用北京南站',
          value: 1720
        },
        {
          name: '6-12出行偏好',
          value: 202214
        },
        {
          name: '价格不敏感',
          value: 21014
        },
        {
          name: '时间敏感',
          value: 19114
        },
        {
          name: '高铁偏好',
          value: 18114
        },
        {
          name: '常用北京南站',
          value: 114214
        },

        {
          name: '6-12出行偏好',
          value: 1020
        },
        {
          name: '价格不敏感',
          value: 1100
        },
        {
          name: '6-12出行偏好',
          value: 120
        },
        {
          name: '价格不敏感',
          value: 100
        }
      ]
    }
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var myChart = echarts.init(document.getElementById('box'), 'dark')

      const option = {
        title: {
        },
        backgroundColor: '#16223c',

        tooltip: {
          trigger: 'item',
          confine: true
        },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 10,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [32, 42],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [-45, 0, 45, 90],
            // rotationRange: [0, 90],
            // rotationRange: [0, 0],
            // 随机生成字体颜色

            // maskImage: maskImage,
            // textStyle: {
            //   color: "rgb(214,20,15)",
            // },
            textStyle: {
              color: function() {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                )
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            // 数据
            data: this.worddata
          }
        ]
      }
      // myChart.setOption(option);
      // 加载图像，将数据放在图像中

      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

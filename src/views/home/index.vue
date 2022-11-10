<template>
  <div class="echarts-main">
    <div id="demo" class="demo" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    // 初始化 echarts 对象
    var demoEchart = echarts.init(document.getElementById('demo'))
    // 生命 options 对象
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },
        {
          data: [20, 20, 156, 180, 70, 60, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    // 设置 图表
    demoEchart.setOption(option)
  }

}
</script>

<style lang="scss" scoped>
.echarts-main{
  .demo{
    width: 400px;
    height: 400px;
    border: 1px solid red;
  }
}
</style>

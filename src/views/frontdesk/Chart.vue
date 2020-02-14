<template>
  <div>
    <div id="chart" :style="{width: '100%', height: '300px'}"></div>
  </div>

</template>

<script>
  /**
   *产品各栏目销售额比重的饼状图
   */
    import  'echarts/theme/fresh-cut.js'//导入青绿色
    export default {
        name: "chart",
        data() {
            return {
                fit: 'fill'
            }
        },
        methods:{
            /**
             *
             * @param names 要展示在图片的图例，即产品栏目的名称集合
             * @param data 要展示的数据。由name和value的数组组成
             */
            drawLine(title,names,data) {//实例化产品图形
                //初始化echarts实例。不能在单个容器上初始化多个 ECharts 实例。
                let myChart = this.$echarts.init(document.getElementById('chart'),"fresh-cut");
                let option = {
                    xAxis: {
                        type: 'category',
                        data: ['教职工', '2019级学生', '2018级学生', '2017级学生', '后勤人员', '留学生', '来校人员']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }]
                };

                // 绘制图表
                myChart.setOption(option);
            }
        },
        mounted() {
            this.drawLine();
        }
    }
</script>

<style scoped>

</style>

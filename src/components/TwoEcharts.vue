<template>
<div>
  <div class="filter-charts">
      <el-date-picker style="margin: 20px" v-model="date" value-format="yyyy-MM-dd" size="small" type="date" placeholder="选择日期"></el-date-picker>
      <el-switch v-model="typeBoolean" active-color="#00B5FF" inactive-color="#7ED321" active-text="bar" inactive-text="line"></el-switch>
      <el-button style="margin-left: 50px; margin-bottom: 20px" type="primary" @click="handleSure">确定</el-button>
    </div>
  <div class="two-charts">
    <div id="chartOne" class="chart"></div>
    <div id="chartTwo" class="chart"></div>
  </div>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      myChartOne: null,
      myChartTwo: null,
      dataAll: {
        dataOne: [10, 15, 28, 12, 15],
        dataTwo: [15, 10, 20, 18, 10],
        dataThree: [10, 20, 30, 20, 10]
      },
      date: '',
      typeBoolean: true
    }
  },
  computed: {
    type: function () {
      return this.typeBoolean ? 'bar' : 'line'
    }
  },
  methods: {
    initCharts () {
      this.myChartOne = echarts.init(document.getElementById('chartOne'))
      this.myChartTwo = echarts.init(document.getElementById('chartTwo'))
      this.myChartOne.setOption({
        title: {text: this.date},
        legend: {
          data: ['one', 'two'],
          right: 10
        },
        grid: {
          top: 120
        },
        yAxis: [
          {
            name: '蓝色',
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            }
          },
          {
            name: '绿色',
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            }
          }
        ],
        xAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#666',
            fontSize: 12,
            margin: 12
          },
          data: ['同学1', '同学2', '同学3', '同学4', '同学5']
        },
        series: [
          {
            name: 'one',
            yAxisIndex: 0,
            data: [],
            type: 'bar',
            color: '#00B5FF'
          },
          {
            name: 'two',
            yAxisIndex: 1,
            data: [],
            type: 'bar',
            color: '#7ED321'
          }
        ]
      })
      this.myChartTwo.setOption({
        title: {text: this.date},
        legend: {
          data: ['one', 'two'],
          right: 10
        },
        grid: {
          top: 120
        },
        yAxis: [
          {
            name: '蓝色',
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            }
          },
          {
            name: '绿色',
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666',
              fontSize: 12
            }
          }
        ],
        xAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#666',
            fontSize: 12,
            margin: 12
          },
          data: ['同学1', '同学2', '同学3', '同学4', '同学5']
        },
        series: [
          {
            name: 'one',
            yAxisIndex: 0,
            data: [],
            type: 'bar',
            color: '#00B5FF'
          },
          {
            name: 'two',
            yAxisIndex: 1,
            data: [],
            type: 'bar',
            color: '#7ED321'
          }
        ]
      })
      this.myChartOne.showLoading()
      this.myChartTwo.showLoading()
    },
    handleSure () {
      if (this.date === '') return
      var newSeries = []
      if (this.typeBoolean) {
        newSeries = [
          {
            name: 'one',
            type: this.type,
            color: '#00B5FF'
          },
          {
            name: 'two',
            type: this.type,
            color: '#7ED321'
          }
        ]
      } else {
        newSeries = [
          {
            name: 'one',
            type: this.type,
            color: '#00B5FF',
            symbolSize: 6,
            lineStyle: {
              width: 4
            }
          },
          {
            name: 'two',
            type: this.type,
            color: '#7ED321',
            symbolSize: 6,
            lineStyle: {
              width: 4
            }
          }
        ]
      }
      this.myChartOne.setOption({
        title: {
          text: this.date
        },
        series: [{...newSeries[0], data: this.dataAll.dataTwo}, {...newSeries[1], data: this.dataAll.dataOne}]
      })
      this.myChartTwo.setOption({
        title: {
          text: this.date
        },
        series: [{...newSeries[0], data: this.dataAll.dataThree}, {...newSeries[1], data: this.dataAll.dataOne}]
      })
    }
  },
  mounted () {
    this.initCharts()
    var $this = this
    setTimeout(function () {
      $this.myChartOne.setOption({
        series: [
          {
            name: 'one',
            data: $this.dataAll.dataOne
          },
          {
            name: 'two',
            data: $this.dataAll.dataTwo
          }
        ]
      })
      $this.myChartTwo.setOption({
        series: [
          {
            name: 'one',
            data: $this.dataAll.dataTwo
          },
          {
            name: 'two',
            data: $this.dataAll.dataOne
          }
        ]
      })
      $this.myChartOne.hideLoading()
      $this.myChartTwo.hideLoading()
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
@import '~@/common/css/base.scss';
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2)
}
.two-charts {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  .chart {
    height: 300px;
    @media screen and (min-width: $smallSize){
      height: 500px;
    }
    width: 50%;
    min-width: 300px;
    padding-top: 20px
  }
}
</style>

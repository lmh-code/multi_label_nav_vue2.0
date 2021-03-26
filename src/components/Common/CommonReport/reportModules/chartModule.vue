<template>
  <div>
    <div class="common-chart-module" :id="chartModuleId" style="width:100%" v-if="chartlist && chartlist.nodata === false"></div>
    <el-card v-else align="center" :body-style="{height: '300px', padding: '130px 0 0'}" shadow="never">
      暂无数据
    </el-card>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import Storage from '@/utils/localStorage'
  import * as utils from '@/utils/utils'
  import Vue from 'vue'
    
  const commonReport = {
    // 获取指定图表
    getChartByModuleId: '/boom/a/report/module/chart/getChartByModuleId',
    // 图表查询
    dynamicReportSearchChart: '/boom/a/dynamicReport/dynamicReportSearchChart',
    dynamicReportSearchPie: '/boom/a/dynamicReport/dynamicReportSearchPie',
  }
  export default {
    name: 'chart-module',
    props: ['pageId', 'chartModuleId', 'searchItems', 'getQueryModule', 'searchUrl'],
    data () {
      return {
        chartlist: {},
        chartItems: [], // 图表参数
        chartSearchUrl: '',
      }
    },
    components: {
    },
    computed: {
    },
    mounted() {
      this.getChartByModuleId()
    },
    watch: {
    },
    methods: {
      getChartByModuleId() {
        this.$http.post(commonReport.getChartByModuleId, {moduleId: this.chartModuleId}, null, null, 'boomdebug').then((res) => {
          if (res.code === 0) {
            if(res.data && res.data.url) {
              this.chartSearchUrl = res.data.url
            }
            if(res.data && res.data.chartItems && res.data.chartItems.length) {
              this.chartItems = [...res.data.chartItems]
              let obj = {
                nodata: false,
                chartId: res.data.chartId,
                chartType: res.data.chartType
              }
              this.chartlist = {...obj}
              // 先判断查询项是否有值
              let timer = setInterval(() => {
                if(this.getQueryModule) {
                  // 先判断必填项
                  this.$emit('requiredFormat', 'first', val => {
                    if(val === false) {
                      return
                    }
                    this.chartSearch(obj.chartId, obj.chartType)
                  })
                  clearInterval(timer)
                }
              }, 100)
            }
            return
          }
          throw new Error(res.msg)
        }).catch(e => {
          console.log("获取图表模块失败：" + e.message)
        })
      },
      // 查询-图表
      chartSearch() {
        let chartId = this.chartlist.chartId
        let chartType = this.chartlist.chartType
        let legend = []
        let series = []
        let xAxis = []
        let chartTitle = ''
        let colorList = ['#C1232B','#B5C334','#FCCE10','#BA55D3','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0']
        this.chartlist.nodata = false

        setTimeout(() => {
          let myChart = echarts.init(document.getElementById(this.chartModuleId))
          myChart.showLoading({
            text : '正在加载数据'
          })
          let search = {
            ...this.searchItems,
            queryId: chartId,
            pageId: this.pageId,
            searchItems: this.searchItems
          }
          if (chartType == 3) {
            // 折线图
            let url = this.chartSearchUrl || this.searchUrl || commonReport.dynamicReportSearchChart
            this.$http.post(url, {...search}, null, null, 'boomdebug').then((res) => {
              if (res.code === 0) {
                legend = res.data.legend
                series = res.data.series
                series.forEach((v, i) => {
                  v['type'] = 'line'
                  let itemStyle = {
                    normal: {
                      color: colorList[i]
                    }
                  }
                  v['itemStyle'] = itemStyle
                })
                xAxis = res.data.xAxis
                chartTitle = res.data.title
                let option = {
                  title: {
                    text: chartTitle,
                    textStyle: {
                      fontSize: 16
                    }
                  },
                  grid: {
                    top: 60,
                    bottom: 10,
                    left: 5,
                    right: 10,
                    containLabel: true
                  },
                  legend: {
                    data: legend,
                    top: 25
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  calculable: true,
                  xAxis: [
                    {
                      type: 'category',
                      axisLabel: {
                        rotate: 30
                      },
                      data: xAxis
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: series
                }
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist.nodata = true
              console.log(e.message)
            })
          }else if (chartType == 2) {
            // 柱状图
            let url = this.chartSearchUrl || this.searchUrl || commonReport.dynamicReportSearchChart
            this.$http.post(url, {...search}, null, null, 'boomdebug').then((res) => {
              if (res.code === 0) {
                legend = res.data.legend
                series = res.data.series
                series.forEach((v) => {
                  v['type'] = 'bar'
                  v['barMaxWidth'] = '50'
                  let label = {normal: {
                      show: true,
                      position: 'top'
                    }}
                  v['label'] = label
                })
                xAxis = res.data.xAxis
                chartTitle = res.data.title
                let option = {
                  title: {
                      text: chartTitle,
                      textStyle: {
                        fontSize: 16
                      }
                  },
                  legend: {
                      data: legend,
                      top: 25
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  calculable: true,
                  xAxis: [
                    {
                      type: 'category',
                      axisLabel: {
                        interval: 0,
                        rotate: 30
                      },
                      data: xAxis
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: series
                }
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist.nodata = true
              console.log(e.message)
            })
          }else if (chartType == 1) {
            // 饼图
            let url = this.chartSearchUrl || this.searchUrl || commonReport.dynamicReportSearchPie
            this.$http.post(url, {...search}, null, null, 'boomdebug').then((res) => {
              if (res.code === 0) {
                legend = res.data.legends
                chartTitle = res.data.title
                series = res.data.datas
                let option = {
                  title: {
                    text: chartTitle,
                    textStyle: {
                      fontSize: 16
                    }
                  },
                  tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    data: legend,
                    top: 25
                  },
                  series: [
                    {
                      type: 'pie',
                      radius: '55%',
                      startAngle: '30',
                      center: ['50%', '60%'],
                      data: series,
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                          label: {
                            show: true,
                            formatter: '{b}:{c} ({d}%)'
                          },
                          labelLine: {
                            show: true
                          }
                        }
                      }
                    }
                  ]
                };
                myChart.hideLoading()
                myChart.setOption(option, true)
                return
              }
              throw new Error(res.msg)
            }).catch(e => {
              this.chartlist.nodata = true
              console.log(e.message)
            })
          }
        }, 200)
      },
    }
  }
</script>

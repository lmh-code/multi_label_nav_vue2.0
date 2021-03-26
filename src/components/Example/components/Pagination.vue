<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">2. Pagination分页组件</p>
    <p>当数据量过多时，使用分页分解数据。</p>
    <p class="mt20 sub-title">2.1 展示示例</p>
    <p>Pagination分页组件的展示用法。<span class="tip">[代码使用请查看/src/components/Example/components/Pagination文件中的内容]</span></p>
    <bl-pagination
      :showPagination="true"
      :pageNum="pageNum"
      :total="total"
      @size-change="changeSize"
      @current-change="changeCurrent"/>
    <p class="mt20 sub-title">2.1 Attributes</p>
    <p>参数说明</p>
    <bl-table
      :dataSource="attrData"
      :columns="attrColumn"/>
    <p class="mt20 sub-title">2.2 Events</p>
    <p>事件说明</p>
    <bl-table
      :dataSource="eventData"
      :columns="eventColumn"/>
  </div>
</template>
<script>
import constants from '../constants'
export default {
  data() {
    return {
      pageNum: 1,
      total: 9800,
      attrColumn: constants.tableAttrColumn,
      attrData: [
        {
          attr: 'showPagination',
          desc: '是否显示分页条',
          type: 'Boolean',
          val: 'true, false',
          defaultVal: 'true'
        },
        {
          attr: 'size',
          desc: '尺寸大小',
          type: 'String',
          val: 'medium / small / mini',
          defaultVal: 'small'
        },
        {
          attr: 'pageNum',
          desc: '页码',
          type: 'Number',
          val: '-',
          defaultVal: '1'
        },
        {
          attr: 'pageSizes',
          desc: '每页显示个数选择器的选项设置',
          type: 'number[]',
          val: '-',
          defaultVal: '[10, 150, 300, 450, 600]'
        },
        {
          attr: 'total',
          desc: '总条数',
          type: 'Number',
          val: '-',
          defaultVal: '0'
        },
        {
          attr: 'pagerCount',
          desc: '页码按钮的数量，当总页数超过该值时会折叠',
          type: 'number',
          val: '大于等于 5 且小于等于 21 的奇数',
          defaultVal: '7'
        }
      ],
      eventColumn: constants.tableEventColumn,
      eventData: [
        {
          eventName: 'size-change', // 事件名
          desc: 'pageSize 改变时会触发', // 说明
          attr: 'value(每页请求条数)' // 参数
        },
        {
          eventName: 'current-change', // 事件名
          desc: 'currentPage 改变时会触发', // 说明
          attr: 'value(当前页码)' // 参数
        }
      ]
    }
  },
  methods: {
    changeSize(value) {
      this.$tip.notify(`changeSize发生了变化:${value}`, "warning")
    },
    changeCurrent(value) {
      this.$tip.notify(`changeCurrent发生了变化:${value}`, "warning")
    }
  }
}
</script>

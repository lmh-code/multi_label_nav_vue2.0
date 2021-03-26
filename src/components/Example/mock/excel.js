const attrData = [
  {
    attr: 'visible', // 参数
    desc: '是否打开弹窗', // 说明
    type: 'Boolean', // 类型
    val: 'false / true', // 可选值
    defaultVal: 'false'// 默认值
  },
  {
    attr: 'elId',
    desc: 'dom的唯一id',
    type: 'String',
    val: '-',
    defaultVal: 'addByExcel'
  },
  {
    attr: 'title',
    desc: '弹窗标题',
    type: 'String',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'exportConfig',
    desc: '要下载模板或者导入是需要配置的excel识别列内容',
    type: 'Object',
    val: '-',
    defaultVal: '{}'
  }
]

const tempData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
const eventData = [
  {
    eventName: 'confirm',
    desc: '点击弹窗确定按钮触发事件',
    attr: '-'
  },
  {
    eventName: 'close',
    desc: '点击弹窗关闭按钮触发事件',
    attr: '-'
  }
]
export default {
  attrData,
  tempData,
  eventData
}

const tableAttrColumn = [
  {
    title: '参数',
    dataIndex: 'attr',
    minWidth: 100
  },
  {
    title: '说明',
    dataIndex: 'desc',
    minWidth: 160
  },
  {
    title: '类型',
    dataIndex: 'type',
    minWidth: 100
  },
  {
    title: '可选值',
    dataIndex: 'val',
    minWidth: 100
  },
  {
    title: '默认值',
    dataIndex: 'defaultVal',
    minWidth: 100
  }
]

const tableEventColumn = [
  {
    title: '事件名',
    dataIndex: 'eventName',
    minWidth: 100
  },
  {
    title: '说明',
    dataIndex: 'desc',
    minWidth: 160
  },
  {
    title: '参数',
    dataIndex: 'attr',
    minWidth: 100
  }
]
export default {
  tableAttrColumn,
  tableEventColumn
}

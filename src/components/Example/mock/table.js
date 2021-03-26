const tableData = [
  {
    "htmlMsg": "<img width='50' height='50' src='http://retailimg01.benlailife.com/0f563831a0db41edafc1aac7e3f8ef4d.jpg' alt=''/><img width='50' height='50' src='http://retailimg01.benlailife.com/28ec3e91e1db48ca9dde507d274e14b7.jpg' alt=''/>",
    "statusDesc": "已收货",
    "totalGoodsQty": 1,
    "totalQty": 528,
    "createUserName": "刘玉静",
    "remark": "",
    "tradeModeName": "代营",
    "vendorName": "国源建设第二公司",
    "authDatetime": "2020-11-26 17:09:50",
    "createUserContact": "13823959369",
    "totalReceiveAmount": 3696,
    "totalReceiveGoodsQty": 1,
    "totalAmount": 3696,
    "storeNo": "Y001",
    "isOpen": 0,
    "cityName": "佛山市",
    "paperNo": "01Y0012011260302",
    "storeAddress": "桂城街半岛路11号金域蓝湾紫兰苑3座01号商铺",
    "storeName": "金域蓝湾店",
    "id": 973764,
    "totalReceiveQty": 528,
    "tradeModeId": "9",
    "expectDatetime": "2020-11-27 00:00:00",
    "status": 2
  },
  {
    "htmlMsg": "<img width='50' height='50' src='http://retailimg01.benlailife.com/0e4225a4f4bd44f5b2baa90321bb8444.jpg' alt=''/>",
    "statusDesc": "已收货",
    "totalGoodsQty": 1,
    "totalQty": 6,
    "createUserName": "刘三斌",
    "remark": "",
    "tradeModeName": "代营",
    "vendorName": "国源建设第二公司",
    "authDatetime": "2020-11-26 14:53:03",
    "createUserContact": "13823959369",
    "totalReceiveAmount": 42,
    "totalReceiveGoodsQty": 1,
    "totalAmount": 42,
    "storeNo": "Y001",
    "isOpen": 0,
    "cityName": "佛山市",
    "paperNo": "01Y0012011260301",
    "storeAddress": "桂城街半岛路11号金域蓝湾紫兰苑3座01号商铺",
    "storeName": "金域蓝湾店",
    "id": 973763,
    "totalReceiveQty": 6,
    "tradeModeId": "9",
    "expectDatetime": "2020-11-27 00:00:00",
    "status": 2
  },
  {
    "htmlMsg": "<div style='background-color: red;'>我是div标签内容</div>",
    "imgMsg": ['http://retailimg01.benlailife.com/0e4225a4f4bd44f5b2baa90321bb8444.jpg', 'http://retailimg01.benlailife.com/0f563831a0db41edafc1aac7e3f8ef4d.jpg', 'http://retailimg01.benlailife.com/28ec3e91e1db48ca9dde507d274e14b7.jpg'],
    "statusDesc": "待接单",
    "totalGoodsQty": 2,
    "totalQty": 21,
    "createUserName": "system",
    "remark": "|汇总单号|03Y8012011260303|",
    "tradeModeName": "代营",
    "vendorName": "代营回归验证",
    "authDatetime": "2020-11-26 11:10:32",
    "createUserContact": "1",
    "totalAmount": 21,
    "storeNo": "Y801",
    "isOpen": 0,
    "cityName": "广州市",
    "paperNo": "01Y8012011260301",
    "storeAddress": "广海路180号5号门",
    "storeName": "广东本来鲜仓库",
    "id": 973762,
    "tradeModeId": "9",
    "havePurchaseQty": 1,
    "expectDatetime": "2020-11-28 00:00:00",
    "status": 0
  },
  {
    "statusDesc": "待接单",
    "totalGoodsQty": 2,
    "totalQty": 7,
    "createUserName": "system",
    "remark": "|汇总单号|03Y8012011250304|",
    "tradeModeName": "购销",
    "vendorName": "代营回归验证",
    "authDatetime": "2020-11-25 18:21:32",
    "createUserContact": "1",
    "totalAmount": 7,
    "storeNo": "Y801",
    "isOpen": 0,
    "cityName": "广州市",
    "paperNo": "01Y8012011250302",
    "storeAddress": "广海路180号5号门",
    "storeName": "广东本来鲜仓库",
    "id": 973761,
    "tradeModeId": "1",
    "havePurchaseQty": 1,
    "expectDatetime": "2020-11-27 00:00:00",
    "status": 0
  },
  {
    "statusDesc": "待接单",
    "totalGoodsQty": 2,
    "totalQty": 26444,
    "createUserName": "刘玉静",
    "remark": "",
    "tradeModeName": "购销",
    "vendorName": "代营回归验证",
    "authDatetime": "2020-11-25 17:18:47",
    "createUserContact": "1",
    "totalAmount": 4840,
    "storeNo": "Y809",
    "isOpen": 0,
    "cityName": "佛山市",
    "paperNo": "01Y8092011250301",
    "storeAddress": "桂城三山大道3号",
    "storeName": "广东佛山一仓",
    "id": 973760,
    "tradeModeId": "1",
    "expectDatetime": "2020-11-26 00:00:00",
    "status": 0
  }
]
// 表格参数说明数据
const tableAttrData = [
  {
    attr: 'loading', // 参数
    desc: '是否在表格中展示loading图标', // 说明
    type: 'Boolean', // 类型
    val: 'false / true', // 可选值
    defaultVal: 'false'// 默认值
  },
  {
    attr: 'stripe',
    desc: '是否要斑马纹',
    type: 'Boolean',
    val: 'false / true',
    defaultVal: 'false'
  },
  {
    attr: 'border',
    desc: '是否要纵向边框',
    type: 'Boolean',
    val: 'false / true',
    defaultVal: 'true'
  },
  {
    attr: 'size',
    desc: '表格大小',
    type: 'String',
    val: 'medium / small / mini',
    defaultVal: 'small'
  },
  {
    attr: 'maxHeight',
    desc: '表格高度大小',
    type: 'Number',
    val: '-',
    defaultVal: '屏幕可视高度减去100'
  },
  {
    attr: 'showSummary',
    desc: '是否在表尾显示合计行',
    type: 'Boolean',
    val: 'false / true',
    defaultVal: 'false'
  },
  {
    attr: 'getSummaries',
    desc: '合计行自定义方法，配置此属性必须设置showSummary属性为true',
    type: 'Function',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'dataSource',
    desc: '表格数据',
    type: 'Array',
    val: '-',
    defaultVal: '空数组[]'
  },
  {
    attr: 'columns',
    desc: '表格列内容',
    type: 'Array',
    val: '-',
    defaultVal: '空数组[]'
  },
  {
    attr: 'defaultChecked',
    desc: '当表格可多选的时候，默认选中的内容',
    type: 'Array',
    val: '-',
    defaultVal: '空数组[]'
  },
  {
    attr: 'uniqueStr',
    desc: '需要回显选中列时必传，列表中数据的唯一值的字段名（key）, 默认取 id 的值作为唯一值',
    type: 'String',
    val: '-',
    defaultVal: 'id'
  },
  {
    attr: 'selectable',
    desc: '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
    type: 'Function(row, index)',
    val: '-',
    defaultVal: '-'
  }
]
// 表格事件说明数据
const tableEventData = [
  {
    eventName: 'sort-change', // 事件名
    desc: '排序，点击排序的时候可调用接口【只有column中的sortable属性为custom时有效】。', // 说明
    attr: '{column, prop, order}' // 参数
  },
  {
    eventName: 'selection-change',
    desc: '表格选择内容发生变化【不用分页选择的情况直接使用这一个即可】',
    attr: '{selection}'
  },
  {
    eventName: 'select',
    desc: '点击表格中某一行的选择框【记录分页选择使用】',
    attr: '{selection, row}'
  },
  {
    eventName: 'select-all',
    desc: '全选的内容【记录分页选择使用】',
    attr: '{selection}'
  },
  {
    eventName: 'row-click',
    desc: '当某一行被点击时会触发该事件',
    attr: 'row, column, event'
  },
  {
    eventName: 'row-dblclick',
    desc: '当某一行被双击时会触发该事件',
    attr: 'row, column, event'
  }
]
// 列参数说明数据
const columnAttrData = [
  {
    attr: 'title',
    desc: '表格列顶部标签名',
    type: 'String',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'dataIndex',
    desc: '表格列取值字段',
    type: 'String',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'minWidth',
    desc: '表格列最小宽度',
    type: 'Number',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'width',
    desc: '表格列宽度',
    type: 'Number',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'ellipsis',
    desc: '当内容过长被隐藏时显示 tooltip',
    type: 'Boolean',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'align',
    desc: '表格内容对齐方式',
    type: 'String',
    val: 'left/center/right',
    defaultVal: 'left'
  },
  {
    attr: 'headerAlign',
    desc: '表头对齐方式，若不设置该项，则使用表格的对齐方式',
    type: 'String',
    val: 'left/center/right',
    defaultVal: '-'
  },
  {
    attr: 'children',
    desc: '同表格参数说明中的columns',
    type: 'Array',
    val: '-',
    defaultVal: '空数组[]'
  },
  {
    attr: 'sortable',
    desc: "对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change[sortChange] 事件",
    type: 'Boolean, String',
    val: "true, false, 'custom'",
    defaultVal: 'false'
  },
  {
    attr: 'fixed',
    desc: '列是否固定在左侧或者右侧，true 表示固定在左侧',
    type: 'Boolean, String',
    val: 'true, left, right',
    defaultVal: '-'
  },
  {
    attr: 'isDisabled',
    desc: '该单元格内容是否可编辑、点击等',
    type: 'Boolean, Function',
    val: '-',
    defaultVal: 'false'
  },
  {
    attr: 'router',
    desc: '单元格内容是否可以点击跳转页面, 此值如果为true，必须配置 newJump 跳转函数',
    type: 'Boolean',
    val: 'true, false',
    defaultVal: 'false'
  },
  {
    attr: 'target',
    desc: '单元格可以点击跳转页面[router为true]时, 配置可设置是否在新标签中打开',
    type: 'String',
    val: '_blank, _parent, _self, _top',
    defaultVal: '_self'
  },
  {
    attr: 'content',
    desc: '自定义展示内容【单元格展示内容；popover或tooltip展示内容等】',
    type: 'String, Function',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'showPopover',
    desc: '鼠标滑过该单元格是否显示popover气泡框',
    type: 'Boolean',
    val: 'true, false',
    defaultVal: 'false'
  },
  {
    attr: 'showTooltip',
    desc: '鼠标滑过该单元格是否显示tooltip气泡框',
    type: 'Boolean',
    val: 'true, false',
    defaultVal: 'false'
  },
  {
    attr: 'placement',
    desc: '鼠标滑过该单元格显示气泡框或者tooltip时内容的出现位置',
    type: 'Boolean',
    val: 'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end',
    defaultVal: 'bottom-start'
  },
  {
    attr: 'htmlEl',
    desc: '使用html标签展示',
    type: 'Boolean',
    val: 'true/false',
    defaultVal: 'false'
  },
  {
    attr: 'input',
    desc: '是否使用input输入框',
    type: 'Boolean，Function',
    val: '-',
    defaultVal: 'false'
  },
  {
    attr: 'select',
    desc: '是否使用select选择框',
    type: 'Boolean，Function',
    val: '-',
    defaultVal: 'false'
  },
  {
    attr: 'img',
    desc: '展示图片内容',
    type: 'Array',
    val: '-',
    defaultVal: '[]'
  },
  {
    attr: 'selectOptions',
    desc: 'select选择框每一条的内容',
    type: 'Array',
    val: '-',
    defaultVal: '[]'
  },
  {
    attr: 'placeholder',
    desc: '输入框、选择框placeholder提示【input: true; select: true; 可用】',
    type: 'String',
    val: '-',
    defaultVal: '请输入'
  },
  {
    attr: 'formatData',
    desc: '格式化单元格展示数据',
    type: 'Function',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'operation',
    desc: '操作按钮',
    type: 'Array',
    val: '-',
    defaultVal: '-'
  }
]
// 单元格中事件
const columnEventData = [
  {
    eventName: 'isDisabled',
    desc: '该单元格内容是否可编辑、点击等',
    attr: '-'
  },
  {
    eventName: 'content',
    desc: '自定义展示内容【单元格展示内容；popover或tooltip展示内容等】',
    attr: '-'
  },
  {
    eventName: 'input',
    desc: '是否使用input输入框',
    attr: '-'
  },
  {
    eventName: 'inputChangeFunc',
    desc: '输入框内容发生变化时调用',
    attr: '-'
  },
  {
    eventName: 'select',
    desc: '是否使用select选择框',
    attr: '-'
  },
  {
    eventName: 'changeSelectFunc',
    desc: '选择框内容发生变化时调用',
    attr: '-'
  },
  {
    eventName: 'formatData',
    desc: '格式化单元格展示数据',
    attr: '-'
  }
]
// 操作按钮属性说明
const columnOptionsData = [
  {
    attr: 'icon',
    desc: '操作按钮icon',
    type: 'String',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'type',
    desc: '操作按钮类型',
    type: 'String',
    val: 'primary / success / warning / danger / info / text',
    defaultVal: 'text'
  },
  {
    attr: 'plain',
    desc: '是否朴素按钮',
    type: 'Boolean',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'showPopover',
    desc: '鼠标滑过按钮，是否显示popover气泡框',
    type: 'Boolean',
    val: 'true, false',
    defaultVal: 'false'
  },
  {
    attr: 'content',
    desc: '自定义展示内容【单元格展示内容；popover或tooltip展示内容等】',
    type: 'String, Function',
    val: '-',
    defaultVal: '-'
  },
  {
    attr: 'placement',
    desc: '鼠标滑过按钮，显示气泡框时内容的出现位置',
    type: 'Boolean',
    val: 'top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end',
    defaultVal: 'bottom-start'
  },
  {
    attr: 'isShow',
    desc: '操作按钮是否显示',
    type: 'Boolean, Function',
    val: '-',
    defaultVal: 'true'
  },
  {
    attr: 'isDisabled',
    desc: '操作按钮是否可点击',
    type: 'Boolean, Function',
    val: '-',
    defaultVal: 'false'
  }
]
// 操作按钮事件说明
const columnOptionsEventData = [
  {
    eventName: 'isDisabled',
    desc: '该单元格内容是否可编辑、点击等',
    attr: '-'
  },
  {
    eventName: 'content',
    desc: '自定义展示内容【单元格展示内容；popover或tooltip展示内容等】',
    attr: '-'
  },
  {
    eventName: 'isShow',
    desc: '是否显示按钮',
    attr: '-'
  },
  {
    eventName: 'clickFunc',
    desc: '点击按钮触发事件',
    attr: '-'
  }
]
export default {
  tableData,
  tableAttrData,
  tableEventData,
  columnAttrData,
  columnEventData,
  columnOptionsData,
  columnOptionsEventData
}

webpackJsonp([57],{D9uB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Dd8w"),o=a.n(r),n=a("BO1k"),s=a.n(n),i=a("bOdI"),l=a.n(i),c=a("oAV5"),m=a("FzCZ"),d=a("ssT3"),h="/plateform/a/store/condition/selectStore",p="/plateform/a/mall/orderProduct/tomorrowTotal",u="/plateform/a/mall/orderProduct/tomorrow",g={data:function(){var t;return{exportLoading:!1,loading:!1,pageNum:1,pageSize:10,total:0,searchContent:{regionCode:d.a.get("regionCode")||"",storeNo:"",makeOrderTimeTemp:["",""],startDateTime:"",endDateTime:""},storeOptions:[],tableData:[],orderTotal:(t={orderCount:0},l()(t,"orderCount",0),l()(t,"orderCount",0),t),exportConfig:{productName:"商品名称",goodsNo:"SKU编码",productNo:"ERP编码",cityName:"预售区域",preSalePrice:"当前预售价",qty:"预售数量",productAmount:"合计金额",orderCount:"订单数"}}},created:function(){this.getStoreList()},mounted:function(){this.doAllSearchHandel()},methods:{getStoreList:function(){var t=this;this.$http.post(h,{DIFFCITY:!0}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=[],r=!0,o=!1,n=void 0;try{for(var i,l=s()(e.data);!(r=(i=l.next()).done);r=!0){var c=i.value,m={value:c.erpStoreNo,label:c.erpStoreNo+"-"+c.erpStoreName};a.push(m)}}catch(t){o=!0,n=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw n}}t.storeOptions=a}}).catch(function(t){console.log("提示(获取门店列表):",t.message)})},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},doAllSearchHandel:function(t){this.doSearchHandel(t),this.getTomorrowTotal()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},maketSearchTime:function(){var t=Date.parse(new Date);this.searchContent.makeOrderTimeTemp?this.searchContent.makeOrderTimeTemp[0]&&""!=this.searchContent.makeOrderTimeTemp[0]||this.searchContent.makeOrderTimeTemp[1]&&""!=this.searchContent.makeOrderTimeTemp[1]?(this.searchContent.startDateTime=c.u(t)+" "+this.searchContent.makeOrderTimeTemp[0],this.searchContent.endDateTime=c.u(t)+" "+this.searchContent.makeOrderTimeTemp[1]):(this.searchContent.startDateTime="",this.searchContent.endDateTime=""):(this.searchContent.makeOrderTimeTemp=["",""],this.searchContent.startDateTime="",this.searchContent.endDateTime="")},doSearchHandel:function(t){var e=this;this.loading=!0,!0===t&&(this.pageNum=1),this.maketSearchTime(),this.$http.post(u,o()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize,DIFFCITY:!0})).then(function(t){if(e.loading=!1,0===t.code)return t.data&&t.data.list&&t.data.list.length?e.tableData=t.data.list:e.tableData=[],void(1==e.pageNum&&(e.total=t.data.total));throw new Error(t.msg)}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示(明日自提商品明细):",message:t.message})})},getTomorrowTotal:function(){var t=this;this.maketSearchTime(),this.$http.post(p,o()({},this.searchContent,{DIFFCITY:!0})).then(function(e){if(0!==e.code)throw new Error(e.msg);t.orderTotal=e.data}).catch(function(e){t.$notify.error({title:"提示(明日自提合计)",message:e.message})})},exportData:function(){var t=this;this.maketSearchTime(),this.$http.post(u,o()({},this.searchContent,{DIFFCITY:!0})).then(function(e){if(t.loading=!1,0!==e.code)throw new Error(e.msg);if(e.data&&e.data.list&&e.data.list.length){var a=e.data.list;m.a.exportFileByConfig(a,"明日自提商品明细.xlsx",t.exportConfig),setTimeout(function(){t.$message.success("导出成功")},500)}else t.$notify.warning({title:"温馨提示",message:"没有查询到要导出的数据"})}).catch(function(e){t.$notify.error({title:"提示(导出数据)：",message:e.message})})}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"所属门店"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择所属门店",clearable:"",size:"small"},model:{value:t.searchContent.storeNo,callback:function(e){t.$set(t.searchContent,"storeNo",e)},expression:"searchContent.storeNo"}},t._l(t.storeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"下单时间"}},[a("el-time-picker",{staticClass:"search-date-picker-range",attrs:{"is-range":"","range-separator":"-","start-placeholder":"开始时间",size:"small",format:"HH:mm:ss","value-format":"HH:mm:ss","end-placeholder":"结束时间"},model:{value:t.searchContent.makeOrderTimeTemp,callback:function(e){t.$set(t.searchContent,"makeOrderTimeTemp",e)},expression:"searchContent.makeOrderTimeTemp"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doAllSearchHandel(!0)}}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{size:"mini",loading:t.exportLoading},on:{click:t.exportData}},[t._v("导出")])],1)],1)],1),t._v(" "),a("div",{staticClass:"table-wraper"},[a("div",{staticClass:"total-num-w"},[t._v("\n      合计：订单数 "+t._s(t.orderTotal.orderCount)+" 笔；商品品种 "+t._s(t.orderTotal.productCount)+" 个； 销售金额 ￥"+t._s(t.orderTotal.totalAmount)+" 元\n    ")]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"}},[a("el-table-column",{attrs:{prop:"productNo",label:"商品信息","min-width":"236px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"p-m-w"},[a("div",{staticClass:"img-w"},[e.row.imgUrl&&""!=e.row.imgUrl?a("img",{attrs:{src:e.row.imgUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):a("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),a("div",{staticClass:"p-m-c-r"},[a("div",[t._v(t._s(e.row.platformCityGoodsName))]),t._v(" "),a("div",{staticClass:"erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo||"--"))]),t._v(" "),a("div",{staticClass:"erp-p-no"},[t._v("预售商品ID："+t._s(e.row.platformCityGoodsId))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"cityName",label:"预售区域"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"preSalePrice",label:"当前预售价"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"qty",label:"预售数量"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"productAmount",label:"合计金额"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"orderCount",label:"订单数"}})],1),t._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.tableData.length>0,expression:"tableData.length>0"}],staticClass:"tc mt20",attrs:{background:"","current-page":t.pageNum,"page-sizes":[10,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}})],1)])},staticRenderFns:[]};var v=a("VU/8")(g,f,!1,function(t){a("l1C5")},null,null);e.default=v.exports},l1C5:function(t,e){}});
//# sourceMappingURL=57.a3de6c091a62ab30cef3.js.map
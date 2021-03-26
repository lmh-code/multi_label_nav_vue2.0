webpackJsonp([15],{"+atN":function(e,t,a){"use strict";t.a={isOpenOptions:[{label:"全部",value:-1},{label:"已查看",value:1},{label:"未查看",value:0}],statusOptions:[{label:"全部",value:""},{label:"待接单",value:0},{label:"待收货",value:2},{label:"已收货",value:4},{label:"已取消",value:1},{label:"拒绝接单",value:16},{label:"已违约",value:32}],exportConfig:{paperNo:"订单编号",vendorName:"供应商",cityName:"城市",storeName:"订货门店/仓库",createUserName:"联系人",createTime:"单据时间",expectDate:"期望到货时间",tagName:"状态",totalAmount:"订单金额",totalQty:"订单数量",totalGoodsQty:"订单商品数",totalReceiveAmount:"收货金额",totalReceiveQty:"收货数量",totalReceiveGoodsQty:"收货商品数",selectName:"是否查看",remark:"备注"}}},Ak6a:function(e,t){},pOb8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),i=a.n(n),s=a("Gu7T"),o=a.n(s),r=a("WorT"),l=a("4WFj"),c=a("segh"),d=a("oAV5"),h=a("8uth"),m=a("7592"),u=a("+atN"),p={mixins:[r.a,l.a],data:function(){return{pageNum:1,pageSize:10,loading:!1,exportLoading:!1,total:0,tableData:[],columns:[{title:"订单编号",dataIndex:"paperNo",minWidth:160},{title:"供应商",dataIndex:"vendorName",minWidth:140},{title:"城市",dataIndex:"cityName",minWidth:80},{title:"仓库",dataIndex:"storeName",minWidth:140},{title:"联系人",dataIndex:"createUserName",minWidth:100},{title:"单据时间",dataIndex:"createTime",minWidth:170},{title:"期望到货时间",dataIndex:"expectDate",minWidth:170},{title:"状态",dataIndex:"tagName",minWidth:80},{title:"订单金额",dataIndex:"totalAmount",minWidth:80},{title:"订货数量",dataIndex:"totalQty",minWidth:80},{title:"订单商品数",dataIndex:"totalGoodsQty",minWidth:90},{title:"收货金额",dataIndex:"totalReceiveAmount",minWidth:80},{title:"收货数量",dataIndex:"totalReceiveQty",minWidth:80},{title:"收货商品数",dataIndex:"totalReceiveGoodsQty",minWidth:90},{title:"备注",dataIndex:"remark",minWidth:140,ellipsis:!0},{title:"操作",fixed:"right",width:100,operation:[{label:"详情",icon:"el-icon-view",clickFunc:this.goDetailPage}]}],searchContent:{listVendor:[],paperNo:"",startCreatetime:Object(d.b)("yyyy-MM-dd",Date.parse(new Date)-6048e5),endCreatetime:Object(d.b)("yyyy-MM-dd",Date.parse(new Date)),startExpectDatetime:"",status:-1,storeNames:"",tag:"",selectReceive:1},checkedList:[],statusOptions:u.a.statusOptions,exportConfig:u.a.exportConfig}},components:{ChooseStore:m.a},mounted:function(){this.doSearchHandle(!0)},methods:{changeSize:function(e){this.pageSize=e,this.doSearchHandle()},changeCurrent:function(e){this.pageNum=e,this.doSearchHandle()},selectionChangeHandel:function(e){var t=e.selection;this.checkedList=[].concat(o()(t))},doSearchHandle:function(e){var t=this;if(this.checkedList=[],!0===e&&(this.pageNum=1),this.searchContent.startCreatetime&&this.searchContent.endCreatetime)if(Object(d.a)(this.searchContent.startCreatetime)>Object(d.a)(this.searchContent.endCreatetime))this.$tip.message("单据结束时间不能早于开始时间","warning");else{var a=i()({},this.searchContent,{tradeModeId:9,startCreatetime:this.searchContent.startCreatetime?this.searchContent.startCreatetime+" 00:00:00":"",endCreatetime:this.searchContent.endCreatetime?this.searchContent.endCreatetime+" 23:59:59":"",startExpectDatetime:this.searchContent.startExpectDatetime?this.searchContent.startExpectDatetime+" 00:00:00":""});this.loading=!0,this.$http.post(c.a.orderList,i()({},a,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(e){if(t.loading=!1,0===e.code)return t.tableData=e.data&&e.data.result&&e.data.result.length?e.data.result:[],void(t.total=e.data&&e.data.total?e.data.total:0);throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$tip.notify(e.message||"","error","系统提示")})}else this.$tip.message("单据开始时间和结束时间不能为空","warning")},doExortHandel:function(){var e=Object(d.i)(this.exportConfig,!1),t=Object(d.i)(this.exportConfig,!0);h.a.ExportJsonToExcel({header:e,filterVal:t,data:this.checkedList,filename:"订单汇总"})},goDetailPage:function(e){this.$router.push("/con_order/detail/003/"+e.paperNo+"/"+e.storeNo)},clickInputHandel:function(){this.vendorNos=this.searchContent.vendorNo&&this.searchContent.vendorNo.length>0?this.searchContent.vendorNo:this.vendors.map(function(e){return e.vendorNo}),this.$refs.chooseStore.setDefault({vendorNos:this.vendorNos,defaultChecked:this.checkedStoreList})},confirmHandel:function(e){this.checkedStoreList=e,this.searchContent.listStoreNo=e.map(function(e){return e.storeNo}),this.searchContent.storeNames=e.map(function(e){return e.storeName}).join(",")}}},C={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:e.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"供应商"}},[a("el-select",{staticClass:"search-input",attrs:{placeholder:"选择供应商",multiple:"","collapse-tags":"",size:"small"},model:{value:e.searchContent.listVendor,callback:function(t){e.$set(e.searchContent,"listVendor",t)},expression:"searchContent.listVendor"}},e._l(e.vendors,function(e){return a("el-option",{key:e.vendorNo,attrs:{label:e.vendorName,value:e.vendorNo}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"门店"}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"点击选择门店",readonly:""},model:{value:e.searchContent.storeNames,callback:function(t){e.$set(e.searchContent,"storeNames","string"==typeof t?t.trim():t)},expression:"searchContent.storeNames"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.clickInputHandel},slot:"append"})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"订单编号"}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"请输入订单编号",clearable:""},model:{value:e.searchContent.paperNo,callback:function(t){e.$set(e.searchContent,"paperNo","string"==typeof t?t.trim():t)},expression:"searchContent.paperNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{staticClass:"search-input",attrs:{placeholder:"状态",filterable:"",clearable:"",size:"small"},model:{value:e.searchContent.tag,callback:function(t){e.$set(e.searchContent,"tag",t)},expression:"searchContent.tag"}},e._l(e.statusOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"单据开始时间"}},[a("el-date-picker",{staticClass:"search-input",attrs:{type:"date",placeholder:"单据开始时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",size:"small"},model:{value:e.searchContent.startCreatetime,callback:function(t){e.$set(e.searchContent,"startCreatetime",t)},expression:"searchContent.startCreatetime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"单据结束时间"}},[a("el-date-picker",{staticClass:"search-input",attrs:{type:"date",placeholder:"单据结束时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",size:"small"},model:{value:e.searchContent.endCreatetime,callback:function(t){e.$set(e.searchContent,"endCreatetime",t)},expression:"searchContent.endCreatetime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"期望到货开始时间"}},[a("el-date-picker",{staticClass:"search-input",attrs:{type:"date",placeholder:"自提开始时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",size:"small"},model:{value:e.searchContent.startExpectDatetime,callback:function(t){e.$set(e.searchContent,"startExpectDatetime",t)},expression:"searchContent.startExpectDatetime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.doSearchHandle(!0)}}},[e._v("搜索")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{disabled:0===e.checkedList.length,size:"mini",loading:e.exportLoading},on:{click:e.doExortHandel}},[e._v("导出")])],1)],1)],1),e._v(" "),a("div",{staticClass:"table-wraper"},[a("bl-table",{attrs:{loading:e.loading,border:!1,selection:!0,dataSource:e.tableData,columns:e.columns},on:{"selection-change":e.selectionChangeHandel}}),e._v(" "),a("bl-pagination",{attrs:{showPagination:e.tableData.length>0,pageNum:e.pageNum,total:e.total},on:{"size-change":e.changeSize,"current-change":e.changeCurrent}})],1),e._v(" "),a("choose-store",{ref:"chooseStore",on:{confirm:e.confirmHandel}})],1)},staticRenderFns:[]};var f=a("VU/8")(p,C,!1,function(e){a("Ak6a")},"data-v-16184205",null);t.default=f.exports}});
//# sourceMappingURL=15.3e38a57d11c31a8bff64.1615898974438.js.map
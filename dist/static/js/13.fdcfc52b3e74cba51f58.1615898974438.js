webpackJsonp([13],{"/bab":function(t,e,a){"use strict";var i=a("Dd8w"),o=a.n(i),s=a("Gu7T"),n=a.n(s),r=a("RjAO");e.a={data:function(){return{storeNo:"",paperNo:"",editType:"",isDispute:"",orderDetail:{},pageNum:1,pageSize:-1,loading:!1,tableData:[],total:0,searchContent:{goodsNo:"",barcode:"",vendorGoodsNo:""},columnsTemp:[{title:"商品编码",dataIndex:"goodsNo",ellipsis:!0,minWidth:90},{title:"条码",dataIndex:"barcode",ellipsis:!0,minWidth:100},{title:"货号",dataIndex:"vendorGoodsNo",ellipsis:!0,minWidth:100},{title:"商品名称",dataIndex:"goodsName",ellipsis:!0,minWidth:130},{title:"单位",dataIndex:"unit",minWidth:80},{title:"规格",dataIndex:"spec",minWidth:80},{title:"收货数量",dataIndex:"qty",minWidth:80},{title:"收货单价",dataIndex:"price",minWidth:80},{title:"不含税收货金额",dataIndex:"netAmount",minWidth:120},{title:"收货总金额",dataIndex:"amount",minWidth:100}],columns:[]}},created:function(){var t=this;this.storeNo=this.$route.params.storeNo,this.paperNo=this.$route.params.paperNo,this.editType=this.$route.params.type,this.isDispute=this.$route.params.isDispute;var e=[{title:"争议单价",dataIndex:"disputePrice",minWidth:110,placeholder:"争议单价",input:function(){return"edit"===t.editType}},{title:"争议收货数量",dataIndex:"disputeQty",minWidth:120,placeholder:"争议收货数量",input:function(){return"edit"===t.editType}},{title:"备注",dataIndex:"remarks",minWidth:140,placeholder:"备注",ellipsis:!0,input:function(){return"edit"===t.editType}}];"edit"===this.editType?this.columns=[].concat(n()(this.columnsTemp),e):"110"===this.isDispute?this.columns=[].concat(n()(this.columnsTemp),e):this.columns=[].concat(n()(this.columnsTemp))},mounted:function(){this.getGoodsDetail(),this.getGoodsList()},methods:{getGoodsDetail:function(){var t=this,e=r.a.detail+"/"+this.storeNo+"/"+this.paperNo;this.$loading.show(),this.$http.post(e).then(function(e){if(t.$loading.hide(),0!==e.code)throw new Error(e.msg);e.data&&(t.orderDetail=o()({},e.data))}).catch(function(e){t.$loading.hide(),t.$tip.notify(e.message||"","error","系统提示")})},getGoodsList:function(){var t=this;this.loading=!0,this.$http.post(r.a.goodsDetail,o()({},this.searchContent,{paperNo:this.paperNo,storeNo:this.storeNo,pageNum:this.pageNum,pageSize:this.pageSize})).then(function(e){if(t.loading=!1,0===e.code)return t.tableData=e.data&&e.data.result&&e.data.result.length?e.data.result:[],void(t.total=e.data&&e.data.total?e.data.total:0);throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$tip.notify(e.message||"","error","系统提示")})}}}},gkfC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("RCQo"),o=a("/bab"),s={mixins:[i.a,o.a],methods:{doCancelHandel:function(){this.closePage("/reconciliation")}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-wrapper"},[a("div",{staticClass:"handel-wraper"},[a("el-row",{attrs:{type:"flex",align:"bottom",gutter:20}},[a("el-col",{attrs:{span:10}},[t._v("收退货单号："+t._s(t.orderDetail.paperNo))]),t._v(" "),a("el-col",{attrs:{span:10}},[t._v("门店/仓库："+t._s(t.orderDetail.storeName))])],1),t._v(" "),a("el-row",{staticClass:"mt6",attrs:{type:"flex",align:"bottom",gutter:20}},[a("el-col",{attrs:{span:10}},[t._v("收货金额："+t._s(t.orderDetail.totalAmount))]),t._v(" "),a("el-col",{attrs:{span:10}},[t._v("对帐金额："+t._s(t.orderDetail.reconciliationAmount))])],1),t._v(" "),a("el-row",{staticClass:"mt6",attrs:{type:"flex",align:"bottom",gutter:20}},[a("el-col",{attrs:{span:10}},[t._v("供应商对帐人："+t._s(t.orderDetail.vReconciliationUserName))]),t._v(" "),a("el-col",{attrs:{span:10}},[t._v("供应商对帐时间："+t._s(t.orderDetail.vReconciliationTime))])],1),t._v(" "),a("el-row",{staticClass:"mt6",attrs:{type:"flex",align:"bottom",gutter:20}},[a("el-col",{attrs:{span:10}},[t._v("本来鲜对帐人："+t._s(t.orderDetail.reconciliationUserName))]),t._v(" "),a("el-col",{attrs:{span:10}},[t._v("本来鲜对帐时间："+t._s(t.orderDetail.reconciliationDate))])],1),t._v(" "),a("el-row",{staticClass:"mt6",attrs:{type:"flex",align:"bottom",gutter:20}},["110"===t.isDispute?a("el-col",{attrs:{span:24}},[t._v("\n        争议内容："),a("span",{staticStyle:{color:"'red'"}},[t._v(t._s(t.orderDetail.disputeText))])]):t._e()],1)],1),t._v(" "),a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"商品编码"}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"请输入商品编码",clearable:""},model:{value:t.searchContent.goodsNo,callback:function(e){t.$set(t.searchContent,"goodsNo","string"==typeof e?e.trim():e)},expression:"searchContent.goodsNo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"条码"}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"请输入条码",clearable:""},model:{value:t.searchContent.barcode,callback:function(e){t.$set(t.searchContent,"barcode","string"==typeof e?e.trim():e)},expression:"searchContent.barcode"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"货号"}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"请输入货号",clearable:""},model:{value:t.searchContent.vendorGoodsNo,callback:function(e){t.$set(t.searchContent,"vendorGoodsNo","string"==typeof e?e.trim():e)},expression:"searchContent.vendorGoodsNo"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.getGoodsList}},[t._v("搜索")])],1)],1),t._v(" "),a("bl-table",{attrs:{loading:t.loading,border:!1,dataSource:t.tableData,columns:t.columns}}),t._v(" "),a("hr",{staticClass:"s-slip-tb"}),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.doCancelHandel}},[t._v("关闭")])],1)])},staticRenderFns:[]};var r=a("VU/8")(s,n,!1,function(t){a("k2An")},"data-v-f275ed1e",null);e.default=r.exports},k2An:function(t,e){}});
//# sourceMappingURL=13.fdcfc52b3e74cba51f58.1615898974438.js.map
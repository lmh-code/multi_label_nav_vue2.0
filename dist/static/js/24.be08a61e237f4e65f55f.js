webpackJsonp([24],{BqLE:function(t,e){},vfpO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Dd8w"),s=a.n(n),l=a("BO1k"),o=a.n(l),i=a("ssT3"),r=a("oAV5"),c=a("Gu7T"),u=a.n(c),h={data:function(){return{tableData:[],checkedList:[]}},methods:{setDefaultMesg:function(t){this.tableData=t.tableData,this.checkedList=[]},shelfStatusFormatter:function(t,e,a,n){return 0===a?"上架":1===a?"下架":void 0},updateShelfStatus:function(t,e){var a={row:t,shelfStatus:e};this.$emit("updateShelfStatus",a)},deleteItem:function(t){var e={row:t};this.$emit("deleteItem",e)},handleSelect:function(t,e){var a={},n=[];if(r.m(e.id,"id",this.checkedList))this.checkedList=r.q("id",e.id,this.checkedList);else{n.push(e);var s=[].concat(n,u()(this.checkedList));this.checkedList=s.reduceRight(function(t,e){return!a[e.id]&&(a[e.id]=t.push(e)),t},[])}},handleSelectAll:function(t){var e={};if(t.length>0){var a=!0,n=!1,s=void 0;try{for(var l,i=o()(t);!(a=(l=i.next()).done);a=!0){var c=l.value;this.checkedList.push(c)}}catch(t){n=!0,s=t}finally{try{!a&&i.return&&i.return()}finally{if(n)throw s}}this.checkedList=this.checkedList.reduceRight(function(t,a){return!e[a.id]&&(e[a.id]=t.push(a)),t},[])}else{var u=[],h=!0,d=!1,p=void 0;try{for(var f,v=o()(this.tableData);!(h=(f=v.next()).done);h=!0){var m=f.value;u.push(m)}}catch(t){d=!0,p=t}finally{try{!h&&v.return&&v.return()}finally{if(d)throw p}}var g=r.i(this.checkedList,u,"id");this.checkedList=g&&g.length>0?g:[]}},doBatchDelHandel:function(){var t={checkedList:this.checkedList};this.$emit("doBatchDelHandel",t)},batchUpdateShelfStatus:function(t){var e={shelfStatus:t,checkedList:this.checkedList};this.$emit("batchUpdateShelfStatus",e)}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"batch-handel-w"},[a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-upload2",disabled:0===t.checkedList.length},on:{click:function(e){return t.batchUpdateShelfStatus(0)}}},[t._v("上架")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-download",disabled:0===t.checkedList.length},on:{click:function(e){return t.batchUpdateShelfStatus(1)}}},[t._v("下架")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-delete",disabled:0===t.checkedList.length},on:{click:t.doBatchDelHandel}},[t._v("删除")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:t.handleSelect,"select-all":t.handleSelectAll}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"160px",label:"ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"ll-erp-p-no"},[t._v("活动ID: "+t._s(e.row.activityId))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("活动商品ID: "+t._s(e.row.activityPlatCityGoodsId))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"门店信息","min-width":"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("p",[t._v(t._s(e.row.storeName))]),t._v(" "),a("p",{staticClass:"erp-p-no"},[t._v("ERP编码："+t._s(e.row.storeNo))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"280px",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"ll-p-m-w"},[a("div",{staticClass:"sf-pre-goods-img-w"},[e.row.preSaleImageUrl&&""!=e.row.preSaleImageUrl?a("img",{attrs:{src:e.row.preSaleImageUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):a("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),a("div",{staticClass:"ll-p-m-c-r"},[a("div",[t._v("\n              "+t._s(e.row.goodsName||"-")+"\n            ")]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("商品编码："+t._s(e.row.skuNo||"--"))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("区域商品ID："+t._s(e.row.platformCityGoodsId||"--"))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"spec",label:"规格","min-width":"90px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"原价","min-width":"90px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"preSalePrice",label:"预售价","min-width":"90px"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"activityName",label:"预售活动名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"presaleTypeName",label:"预售类型"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"cycleTypeName",label:"周期类型"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"210px",label:"有效期"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.activityStartDate&&e.row.activityEndDate?a("div",{staticClass:"date-wrap-inline"},[a("div",[a("p",[t._v(t._s(e.row.activityStartDate.substr(0,10)))]),t._v(" "),a("p",[t._v(t._s(e.row.activityStartDate.substr(11,8)))])]),t._v(" "),a("div",[t._v(" - ")]),t._v(" "),a("div",[a("p",[t._v(t._s(e.row.activityEndDate.substr(0,10)))]),t._v(" "),a("p",[t._v(t._s(e.row.activityEndDate.substr(11,8)))])])]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"130px",label:"截单时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("\n            "+t._s(e.row.cutoffTypeName)+" "+t._s(e.row.cutoffTime)+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"110px",prop:"pickUpDate",label:"提货日期"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"60px",prop:"shelfStatus",label:"状态",formatter:t.shelfStatusFormatter}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[1===e.row.shelfStatus?a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-upload2"},on:{click:function(a){return t.updateShelfStatus(e.row,"0")}}},[t._v("上架")]):0===e.row.shelfStatus?a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-download"},on:{click:function(a){return t.updateShelfStatus(e.row,"1")}}},[t._v("下架")]):t._e()],1),t._v(" "),a("div",[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return t.deleteItem(e.row)}}},[t._v("删除")])],1)]}}])})],1)],1)},staticRenderFns:[]};var p="/plateform/a/category/getCategoryTree",f="/plateform/a/preSale/storeGoods/listPage",v="/plateform/a/preSale/storeGoods/onShelf",m="/plateform/a/preSale/storeGoods/del",g={data:function(){return{loading:!1,pageNum:1,pageSize:10,total:0,activeName:"all",searchContent:{DIFFCITY:!0,regionCode:i.a.get("regionCode")||"",cityId:"",activityType:51,activitySearchVal:"",shelfStatus:-1,storeGroupTypeNo:"",storeGroupNo:"",storeNo:"",categoryId:"",categoryIdList:[],presaleType:"",cycleType:"",goodsInfo:""},cateDefaultProps:{children:"categoryVoList",label:"categoryName",value:"categoryId"},cycleTypeOptions:[{label:"全部",value:""},{label:"短周期",value:1},{label:"长周期",value:2}],presaleTypeOptions:[{label:"全部",value:""},{label:"单期",value:1},{label:"周期",value:2}],categoryList:[],tableData:[],checkedList:[],topCardCount:{all:0,onShelfCount:0,offShelfCount:0}}},created:function(){this.getCategoryId()},mounted:function(){this.doSearchHandel(!0)},components:{"my-table":a("VU/8")(h,d,!1,function(t){a("BqLE")},null,null).exports,"region-city-store":a("32kd").a},methods:{StoreGroupChange:function(t){this.searchContent.regionCode=t.regionCode,this.searchContent.cityId=t.cityId,this.searchContent.storeNo=t.storeNo,this.searchContent.storeGroupTypeNo=t.storeGroupTypeNoList[0],this.searchContent.storeGroupNo=t.storeGroupTypeNoList[1],this.doSearchHandel(!0)},getCategoryId:function(){var t=this;this.$http.post(p,{DIFFCITY:!0}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=!0,n=!1,s=void 0;try{for(var l,i=o()(e.data);!(a=(l=i.next()).done);a=!0){var r=l.value;r.categoryVoList&&0===r.categoryVoList.length&&(r.categoryVoList=null)}}catch(t){n=!0,s=t}finally{try{!a&&i.return&&i.return()}finally{if(n)throw s}}t.categoryList=e.data}else t.categoryList=[]}).catch(function(t){console.log("提示(三方平台店内分类):",t.message)})},handleTabClick:function(t){"all"==t.name?this.searchContent.shelfStatus=-1:"onShelf"==t.name?this.searchContent.shelfStatus=0:"downShelf"==t.name&&(this.searchContent.shelfStatus=1),this.activeName=t.name,this.doSearchHandel(!0)},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},doSearchHandel:function(t){var e=this,a=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[a],this.loading=!0,!0===t&&(this.pageNum=1),this.$http.post(f,s()({},this.searchContent,{pageSize:this.pageSize,pageNum:this.pageNum})).then(function(t){if(e.loading=!1,0===t.code){if(t.data&&t.data.goodsList&&t.data.goodsList.length){e.tableData=t.data.goodsList;var a={tableData:e.tableData};e.$refs.myTable&&e.$refs.myTable.setDefaultMesg(a)}else{e.tableData=[];var n={tableData:e.tableData};e.$refs.myTable&&e.$refs.myTable.setDefaultMesg(n)}return e.topCardCount.all=t.data.allCount||0,e.topCardCount.onShelfCount=t.data.onShelfCount||0,e.topCardCount.offShelfCount=t.data.offShelfCount||0,void(e.total=t.data.total||0)}throw new Error(t.msg)}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示",message:t.message})})},updateShelfStatus:function(t){var e=this,a=[];a.push(t.row.id);var n=-1,s="";0==t.shelfStatus?(n=0,s="上架"):1==t.shelfStatus&&(n=1,s="下架"),this.$confirm("确定要执行("+s+")操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(v,{ids:a,shelfStatus:n,DIFFCITY:!0}).then(function(t){if(r.c(),0===t.code)return 0===n?e.$message.success("上架成功"):1===n&&e.$message.success("下架成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},deleteItem:function(t){var e=this,a=[],n={id:t.row.id,activityType:t.row.activityType};a.push(n),this.$confirm("确定要执行删除操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(m,{idAndActivityTypeList:a,DIFFCITY:!0}).then(function(t){if(r.c(),0===t.code)return e.$message.success("删除成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},doBatchDelHandel:function(t){var e=this;if(t.checkedList&&(this.checkedList=t.checkedList),0!==this.checkedList.length){var a=this.checkedList.map(function(t){return{id:t.id,activityType:t.activityType}});this.$confirm("确定要执行批量删除操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(m,{idAndActivityTypeList:a,DIFFCITY:!0}).then(function(t){if(r.c(),0===t.code)return e.$message.success("批量删除成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}else this.$message("请选择商品")},batchUpdateShelfStatus:function(t){var e=this;if(t.checkedList&&(this.checkedList=t.checkedList),0!==this.checkedList.length){var a=this.checkedList.map(function(t){return t.id}),n=-1,s="";0==t.shelfStatus?(n=0,s="上架"):1==t.shelfStatus&&(n=1,s="下架"),this.$confirm("确定要执行批量("+s+")操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(v,{ids:a,shelfStatus:n,DIFFCITY:!0}).then(function(t){if(r.c(),0===t.code)return 0===n?e.$message.success("批量上架成功"):1===n&&e.$message.success("批量下架成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}else this.$message("请选择商品")}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("region-city-store",{on:{StoreGroupChange:t.StoreGroupChange}}),t._v(" "),a("el-form-item",{attrs:{label:"活动ID/名称"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"活动ID/名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.activitySearchVal,callback:function(e){t.$set(t.searchContent,"activitySearchVal","string"==typeof e?e.trim():e)},expression:"searchContent.activitySearchVal"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商品分类"}},[a("el-cascader",{staticClass:"search-input",attrs:{placeholder:"请选择分类",options:t.categoryList,"change-on-select":"",size:"small",clearable:"",filterable:"",props:t.cateDefaultProps},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.categoryIdList,callback:function(e){t.$set(t.searchContent,"categoryIdList",e)},expression:"searchContent.categoryIdList"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"SKU编码/商品名称"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"SKU编码/商品名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.goodsInfo,callback:function(e){t.$set(t.searchContent,"goodsInfo","string"==typeof e?e.trim():e)},expression:"searchContent.goodsInfo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预售类型"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择预售类型",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.presaleType,callback:function(e){t.$set(t.searchContent,"presaleType",e)},expression:"searchContent.presaleType"}},t._l(t.presaleTypeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"周期类型"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择周期类型",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.cycleType,callback:function(e){t.$set(t.searchContent,"cycleType",e)},expression:"searchContent.cycleType"}},t._l(t.cycleTypeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSearchHandel(!0)}}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-wraper tab-wraper"},[a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"all"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("全部 "+t._s(this.topCardCount.all))])]),t._v(" "),a("el-tab-pane",{attrs:{name:"onShelf"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("上架中 "+t._s(this.topCardCount.onShelfCount))])]),t._v(" "),a("el-tab-pane",{attrs:{name:"downShelf"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("已下架 "+t._s(this.topCardCount.offShelfCount))])]),t._v(" "),a("my-table",{ref:"myTable",on:{updateShelfStatus:t.updateShelfStatus,deleteItem:t.deleteItem,doBatchDelHandel:t.doBatchDelHandel,batchUpdateShelfStatus:t.batchUpdateShelfStatus}})],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.tableData.length>0,expression:"tableData.length > 0"}],staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","current-page":t.pageNum,"page-sizes":[10,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}})],1)])},staticRenderFns:[]};var b=a("VU/8")(g,y,!1,function(t){a("yoKP")},null,null);e.default=b.exports},yoKP:function(t,e){}});
//# sourceMappingURL=24.be08a61e237f4e65f55f.js.map
webpackJsonp([97],{RDKT:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("Dd8w"),a=o.n(r),n=o("Gu7T"),s=o.n(n),i=o("BO1k"),c=o.n(i),l=o("ssT3"),d=o("oAV5"),u="/plateform/a/store/condition/search",h="/plateform/a/store/goods/error/search",f="/plateform/a/store/goods/error/batchDel",p="/plateform/a/store/goods/error/batchSync",m={data:function(){return{loading:!1,currentPage:1,pageSize:10,total:0,searchContent:{platformId:3,errorCode:"",goodsNameErpNo:"",storeNo:""},errorCodeOptions:[{label:"全部",value:""},{label:"中台有三方无",value:301},{label:"三方有中台无",value:101},{label:"商品信息不一致",value:201}],storeOptions:[],tableData:[],checkedList:[]}},mounted:function(){this.getStoreList(),this.doSearchHandel(!0)},methods:{getStoreList:function(){var e=this;this.$http.post(u).then(function(t){if(0!==t.code)throw new Error(t.msg);if(t.data&&t.data.length){var o=[],r=!0,a=!1,n=void 0;try{for(var s,i=c()(t.data);!(r=(s=i.next()).done);r=!0){var l=s.value,d={value:l.storeNo,label:l.storeNo+"-"+l.storeName};o.push(d)}}catch(e){a=!0,n=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw n}}e.storeOptions=o}}).catch(function(e){console.log("提示(获取门店列表):",e.message)})},changeSize:function(e){this.pageSize=e,this.doSearchHandel()},changeCurrent:function(e){this.pageNum=e,this.doSearchHandel()},handleSelect:function(e,t){var o={},r=[];if(d.m(t.id,"id",this.checkedList))this.checkedList=d.q("id",t.id,this.checkedList);else{r.push(t);var a=[].concat(r,s()(this.checkedList));this.checkedList=a.reduceRight(function(e,t){return!o[t.id]&&(o[t.id]=e.push(t)),e},[])}},handleSelectAll:function(e){var t={};if(e.length>0){var o=!0,r=!1,a=void 0;try{for(var n,s=c()(e);!(o=(n=s.next()).done);o=!0){var i=n.value;this.checkedList.push(i)}}catch(e){r=!0,a=e}finally{try{!o&&s.return&&s.return()}finally{if(r)throw a}}this.checkedList=this.checkedList.reduceRight(function(e,o){return!t[o.id]&&(t[o.id]=e.push(o)),e},[])}else{var l=[],u=!0,h=!1,f=void 0;try{for(var p,m=c()(this.tableData);!(u=(p=m.next()).done);u=!0){var v=p.value;l.push(v)}}catch(e){h=!0,f=e}finally{try{!u&&m.return&&m.return()}finally{if(h)throw f}}var g=d.i(this.checkedList,l,"id");this.checkedList=g&&g.length>0?g:[]}},doSearchHandel:function(e){var t=this;this.loading=!0,!0===e&&(this.pageNum=1),this.$http.post(h,a()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(e){if(t.loading=!1,0===e.code)return e.data&&e.data.result&&e.data.result.length?t.tableData=e.data.result:t.tableData=[],void(t.total=e.data.total);throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$notify.error({title:"提示",message:e.message})})},deleteItem:function(e){var t=this,o={cityId:l.a.get("cityId"),platformId:this.searchContent.platformId,id:e.id,skuNo:e.skuNo,storeNo:e.storeNo,storePlatformGoodsId:e.storePlatformGoodsId,errorCode:e.errorCode},r=[];r.push(o),this.$confirm("您确定要删除所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.r(),t.$http.post(f,r).then(function(e){if(d.c(),0===e.code)return t.$message.success("删除成功"),void t.doSearchHandel();throw new Error(e.msg)}).catch(function(e){d.c(),t.$notify.error({title:"提示",message:e.message})})}).catch(function(){})},batchDeleteHandel:function(){var e=this,t=[],o={},r=!0,a=!1,n=void 0;try{for(var s,i=c()(this.checkedList);!(r=(s=i.next()).done);r=!0){var u=s.value;o={cityId:l.a.get("cityId"),platformId:this.searchContent.platformId,id:u.id,skuNo:u.skuNo,storeNo:u.storeNo,storePlatformGoodsId:u.storePlatformGoodsId,errorCode:u.errorCode},t.push(o)}}catch(e){a=!0,n=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw n}}this.$confirm("您确定要删除所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.r(),e.$http.post(f,t).then(function(t){if(d.c(),0===t.code)return e.$message.success("批量删除成功"),e.checkedList=[],void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){d.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},updateItem:function(e){var t=this,o={cityId:l.a.get("cityId"),platformId:this.searchContent.platformId,id:e.id,skuNo:e.skuNo,storeNo:e.storeNo,storePlatformGoodsId:e.storePlatformGoodsId,errorCode:e.errorCode},r=[];r.push(o),this.$confirm("您确定要同步所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.r(),t.$http.post(p,r).then(function(e){if(d.c(),0===e.code)return t.$message.success("同步成功"),void t.doSearchHandel();throw new Error(e.msg)}).catch(function(e){d.c(),t.$notify.error({title:"提示",message:e.message})})}).catch(function(){})},batchUpdateHandel:function(){var e=this,t=[],o={},r=!0,a=!1,n=void 0;try{for(var s,i=c()(this.checkedList);!(r=(s=i.next()).done);r=!0){var u=s.value;o={cityId:l.a.get("cityId"),platformId:this.searchContent.platformId,id:u.id,skuNo:u.skuNo,storeNo:u.storeNo,storePlatformGoodsId:u.storePlatformGoodsId,errorCode:u.errorCode},t.push(o)}}catch(e){a=!0,n=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw n}}this.$confirm("您确定要同步所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){d.r(),e.$http.post(p,t).then(function(t){if(d.c(),0===t.code)return e.$message.success("批量同步成功"),e.checkedList=[],void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){d.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}}},v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"search-form-wraper"},[o("el-form",{attrs:{model:e.searchContent,"label-position":"top"}},[o("el-form-item",{attrs:{label:"所属门店"}},[o("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择所属门店",clearable:"",size:"small"},on:{change:function(t){return e.doSearchHandel(!0)}},model:{value:e.searchContent.storeNo,callback:function(t){e.$set(e.searchContent,"storeNo",t)},expression:"searchContent.storeNo"}},e._l(e.storeOptions,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"SKU编码/商品名称"}},[o("el-input",{staticClass:"search-input",attrs:{placeholder:"SKU编码/商品名称",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(!0)}},model:{value:e.searchContent.goodsNameErpNo,callback:function(t){e.$set(e.searchContent,"goodsNameErpNo","string"==typeof t?t.trim():t)},expression:"searchContent.goodsNameErpNo"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"问题类型"}},[o("el-select",{staticClass:"search-input",attrs:{placeholder:"请选择订单状态",clearable:"",size:"small"},on:{change:function(t){return e.doSearchHandel(!0)}},model:{value:e.searchContent.errorCode,callback:function(t){e.$set(e.searchContent,"errorCode",t)},expression:"searchContent.errorCode"}},e._l(e.errorCodeOptions,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.doSearchHandel(!0)}}},[e._v("搜索")])],1)],1)],1),e._v(" "),o("div",{staticClass:"table-wraper"},[o("div",{staticClass:"sp-handel-w"},[o("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-delete",disabled:0===e.checkedList.length},on:{click:e.batchDeleteHandel}},[e._v("删除")]),e._v(" "),o("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-upload2",disabled:0===e.checkedList.length},on:{click:e.batchUpdateHandel}},[e._v("同步")])],1),e._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:e.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:e.handleSelect,"select-all":e.handleSelectAll}},[o("el-table-column",{attrs:{type:"selection"}}),e._v(" "),o("el-table-column",{attrs:{"min-width":"120px",label:"门店"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",[o("div",[e._v(e._s(t.row.storeName||"--"))]),e._v(" "),o("div",{staticClass:"erp-p-no"},[e._v("ERP编码："+e._s(t.row.storeNo||"--"))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{"min-width":"160px",label:"门店商品"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("div",[o("div",[e._v(e._s(t.row.skuName||"--"))]),e._v(" "),o("div",{staticClass:"erp-p-no"},[e._v("SKU编码："+e._s(t.row.goodsNo||"--"))])])]}}])}),e._v(" "),o("el-table-column",{attrs:{"min-width":"120px",prop:"errorDesc",label:"问题类型"}}),e._v(" "),o("el-table-column",{attrs:{"min-width":"120px",prop:"syncStatusStr",label:"同步状态"}}),e._v(" "),o("el-table-column",{attrs:{"min-width":"120px",prop:"syncStatusDesc",label:"失败原因"}}),e._v(" "),o("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[301===t.row.errorCode||201===t.row.errorCode?o("div",[o("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-upload2"},on:{click:function(o){return e.updateItem(t.row)}}},[e._v("同步")])],1):e._e(),e._v(" "),301===t.row.errorCode||101===t.row.errorCode?o("div",[o("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(o){return e.deleteItem(t.row)}}},[e._v("删除")])],1):e._e()]}}])})],1),e._v(" "),e.total>0?o("el-pagination",{staticClass:"tc mt20",attrs:{background:"","current-page":e.currentPage,"page-sizes":[10,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.changeSize,"current-change":e.changeCurrent,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}}):e._e()],1)])},staticRenderFns:[]};var g=o("VU/8")(m,v,!1,function(e){o("fj5u")},null,null);t.default=g.exports},fj5u:function(e,t){}});
//# sourceMappingURL=97.85ae92fe455653a1a0fd.js.map
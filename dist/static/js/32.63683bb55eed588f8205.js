webpackJsonp([32],{"6Wkt":function(t,e){},gnw7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),o=a.n(s),n=a("BO1k"),i=a.n(n),r=a("oAV5"),c=a("Gu7T"),l=a.n(c),u={data:function(){return{dialogFormVisible:!1,tableData:[],checkedList:[],platformCityGoodsId:"",syncFaileMsg:""}},methods:{setDefaultMesg:function(t){this.tableData=t.tableData,this.checkedList=[]},statusFormatter:function(t,e,a,s){return 0===a?"上架":1===a?"下架":void 0},syncStatusFormatter:function(t,e,a,s){return 0===a?"未同步":1===a?"同步中":2===a?"同步成功":3===a?"同步失败":void 0},updateShelfStatus:function(t,e){var a={row:t,shelfStatus:e};this.$emit("updateShelfStatus",a)},deleteItem:function(t){var e={row:t};this.$emit("deleteItem",e)},handleSelect:function(t,e){var a={},s=[];if(r.l(e.uniqueId,this.checkedList))this.checkedList=r.q("uniqueId",e.uniqueId,this.checkedList);else{s.push(e);var o=[].concat(s,l()(this.checkedList));this.checkedList=o.reduceRight(function(t,e){return!a[e.uniqueId]&&(a[e.uniqueId]=t.push(e)),t},[])}},handleSelectAll:function(t){var e={};if(t.length>0){var a=!0,s=!1,o=void 0;try{for(var n,c=i()(t);!(a=(n=c.next()).done);a=!0){var l=n.value;this.checkedList.push(l)}}catch(t){s=!0,o=t}finally{try{!a&&c.return&&c.return()}finally{if(s)throw o}}this.checkedList=this.checkedList.reduceRight(function(t,a){return!e[a.uniqueId]&&(e[a.uniqueId]=t.push(a)),t},[])}else{var u=[],d=!0,h=!1,f=void 0;try{for(var p,m=i()(this.tableData);!(d=(p=m.next()).done);d=!0){var v=p.value;u.push(v)}}catch(t){h=!0,f=t}finally{try{!d&&m.return&&m.return()}finally{if(h)throw f}}var g=r.i(this.checkedList,u,"uniqueId");this.checkedList=g&&g.length>0?g:[]}},showSetStockDialog:function(){var t={checkedList:this.checkedList};this.$emit("batchUpdateStock",t)},doBatchDelHandel:function(){var t={checkedList:this.checkedList};this.$emit("doBatchDelHandel",t)},deleteStockNum:function(t,e){var a=this;setTimeout(function(){a.tableData[t].updateStockNum=a.tableData[t].stockNum,a.tableData[t].showUpdate=!1},500)},modifystockNum:function(t,e){1!=e.showUpdate&&(this.tableData[t].showUpdate=!0)},sureUpdataStockNum:function(t){var e=t.updateStockNum;if(""!=e){if(0==e)e=0;else{if(!/^[1-9]*[1-9][0-9]*$/.test(e))return void this.$message("库存数为0-999的整数");if(e<0||e>999)return void this.$message("库存数为0-999的整数")}var a={row:t,stockNum:e};this.$emit("updateStockNumHandel",a)}else this.$message("请输入库存数量")},batchUpdateShelfStatus:function(t){var e={shelfStatus:t,checkedList:this.checkedList};this.$emit("batchUpdateShelfStatus",e)},doBatchSyncHandel:function(){var t={checkedList:this.checkedList};this.$emit("doBatchSyncHandel",t)},doSyncItem:function(t){var e={row:t};this.$emit("doSyncItem",e)},showSyncFail:function(t){this.dialogFormVisible=!0,this.syncFaileMsg=t.syncMsg||"暂时没有获取到失败原因",this.platformCityGoodsId=t.platformCityGoodsId},goEditPage:function(){this.$router.push("/jd_goods/edit_goods/"+this.platformCityGoodsId)}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"batch-handel-w"},[a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-edit",disabled:0===t.checkedList.length},on:{click:t.showSetStockDialog}},[t._v("设置库存")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-upload2",disabled:0===t.checkedList.length},on:{click:function(e){return t.batchUpdateShelfStatus(0)}}},[t._v("上架")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-download",disabled:0===t.checkedList.length},on:{click:function(e){return t.batchUpdateShelfStatus(1)}}},[t._v("下架")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-delete",disabled:0===t.checkedList.length},on:{click:t.doBatchDelHandel}},[t._v("删除")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-sort",disabled:0===t.checkedList.length},on:{click:t.doBatchSyncHandel}},[t._v("同步")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:t.handleSelect,"select-all":t.handleSelectAll}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"门店信息","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("p",[t._v(t._s(e.row.storeName))]),t._v(" "),a("p",{staticClass:"erp-p-no"},[t._v("ERP编码："+t._s(e.row.storeNo))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商品信息","min-width":"256px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"p-m-w"},[a("div",{staticClass:"img-w"},[e.row.imgUrl&&""!=e.row.imgUrl?a("img",{attrs:{src:e.row.imgUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):a("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),a("div",{staticClass:"p-m-c-r"},[a("div",[t._v(t._s(e.row.productName||"--"))]),t._v(" "),a("div",{staticClass:"erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo||"--"))]),t._v(" "),a("p",{staticClass:"erp-p-no"},[t._v("门店商品ID："+t._s(e.row.presaleId||"--"))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"spec",label:"规格","min-width":"120px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"platformName",label:"平台","min-width":"120px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"售价","min-width":"100px"}}),t._v(" "),a("el-table-column",{attrs:{label:"库存","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.showUpdate?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{focus:function(a){return t.modifystockNum(e.$index,e.row)}},model:{value:e.row.stockNum,callback:function(a){t.$set(e.row,"stockNum",a)},expression:"scope.row.stockNum"}})],1)],1):1==e.row.showUpdate?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:function(a){return t.deleteStockNum(e.$index,!0)}},model:{value:e.row.updateStockNum,callback:function(a){t.$set(e.row,"updateStockNum",a)},expression:"scope.row.updateStockNum"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdataStockNum(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:function(a){return t.deleteStockNum(e.$index)}}})],1)],1):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",formatter:t.statusFormatter}}),t._v(" "),a("el-table-column",{attrs:{label:"同步状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.syncStatus?a("div",[t._v("\n          待同步\n        ")]):t._e(),t._v(" "),1===e.row.syncStatus?a("div",[t._v("\n          同步中\n        ")]):t._e(),t._v(" "),2===e.row.syncStatus?a("div",[t._v("\n          同步成功\n        ")]):t._e(),t._v(" "),3===e.row.syncStatus?a("div",{staticClass:"sync-file",on:{click:function(a){return t.showSyncFail(e.row)}}},[t._v("\n          同步失败\n        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[1===e.row.status?a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-upload2"},on:{click:function(a){return t.updateShelfStatus(e.row,"0")}}},[t._v("上架")]):0===e.row.status?a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-download"},on:{click:function(a){return t.updateShelfStatus(e.row,"1")}}},[t._v("下架")]):t._e()],1),t._v(" "),a("div",[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return t.deleteItem(e.row)}}},[t._v("删除")])],1),t._v(" "),0===e.row.syncStatus||3===e.row.syncStatus?a("div",[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-sort"},on:{click:function(a){return t.doSyncItem(e.row)}}},[t._v("同步")])],1):t._e()]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"同步失败原因",visible:t.dialogFormVisible,width:"400px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("div",[t._v("\n      "+t._s(t.syncFaileMsg)+"\n    ")]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("关 闭")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.goEditPage}},[t._v("去编辑")])],1)])],1)},staticRenderFns:[]};var h=a("VU/8")(u,d,!1,function(t){a("qVfS")},null,null).exports,f=a("YAQq"),p=a("Xlsm"),m=a("d7hP"),v="/plateform/a/store/condition/search",g="/plateform/a/category/getCategoryTree",y="/plateform/a/product/store/presale/search",S="/plateform/a/product/store/presale/batchOffShelf",b="/plateform/a/product/store/presale/batchDel",k="/plateform/a/product/store/presale/batchUpdateStock",w="/plateform/a/product/store/presale/batchSync",_={data:function(){return{loading:!1,pageNum:1,pageSize:10,total:0,activeName:"all",searchContent:{queryString:"",platformId:2,saleType:1,platformCityGoodsIds:[],storeNo:"",categoryId:"",categoryIdList:[],syncStatus:"",status:-1},cateDefaultProps:{children:"categoryVoList",label:"categoryName",value:"categoryId"},categoryList:[],storeOptions:[],tableData:[],checkedList:[],isDisabled:!1,dialogFormVisible:!1,stockNum:"",topCardCount:{all:0,putaWay:0,soldOut:0},syncStatusOptions:[{label:"全部",value:""},{label:"待同步",value:0},{label:"同步中",value:1},{label:"同步成功",value:2},{label:"同步失败",value:3}]}},created:function(){var t=this.$route.query.platformCityGoodsId;t&&(this.searchContent.platformCityGoodsIds.push(t),this.searchContent.queryString=t),this.getStoreList(),this.getCategoryId()},components:{"my-table":h,"copy-goods":f.a,"batch-update-stock":p.a,"goods-select":m.a},mounted:function(){this.doSearchHandel(!0),this.goodsSelectInit()},methods:{getStoreList:function(){var t=this;this.$http.post(v).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=[],s=!0,o=!1,n=void 0;try{for(var r,c=i()(e.data);!(s=(r=c.next()).done);s=!0){var l=r.value,u={value:l.storeNo,label:l.storeNo+"-"+l.storeName};a.push(u)}}catch(t){o=!0,n=t}finally{try{!s&&c.return&&c.return()}finally{if(o)throw n}}t.storeOptions=a}else t.storeOptions=[]}).catch(function(t){console.log("提示(获取门店列表):",t.message)})},getCategoryId:function(){var t=this;this.$http.post(g).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=!0,s=!1,o=void 0;try{for(var n,r=i()(e.data);!(a=(n=r.next()).done);a=!0){var c=n.value;c.categoryVoList&&0===c.categoryVoList.length&&(c.categoryVoList=null)}}catch(t){s=!0,o=t}finally{try{!a&&r.return&&r.return()}finally{if(s)throw o}}t.categoryList=e.data}else t.categoryList=[]}).catch(function(t){console.log("提示(三方平台店内分类):",t.message)})},handleTabClick:function(t){"all"==t.name?this.searchContent.status=-1:"onShelf"==t.name?this.searchContent.status=0:"downShelf"==t.name&&(this.searchContent.status=1),this.activeName=t.name,this.doSearchHandel(!0)},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},doSearchHandel:function(t){var e=this,a=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[a],this.loading=!0,!0===t&&(this.pageNum=1),this.$http.post(y,o()({},this.searchContent,{pageSize:this.pageSize,pageNum:this.pageNum})).then(function(t){if(e.loading=!1,0!==t.code)throw new Error(t.msg);if(t.data&&t.data.pageVo&&t.data.pageVo.result&&t.data.pageVo.result.length){var a=!0,s=!1,o=void 0;try{for(var n,r=i()(t.data.pageVo.result);!(a=(n=r.next()).done);a=!0){var c=n.value;c.showUpdate=!1,c.updateStockNum=c.stockNum,c.uniqueId=""+c.presaleId+c.productNo}}catch(t){s=!0,o=t}finally{try{!a&&r.return&&r.return()}finally{if(s)throw o}}e.tableData=t.data.pageVo.result;var l={tableData:e.tableData};e.$refs.myTable&&e.$refs.myTable.setDefaultMesg(l),1===e.pageNum&&(e.total=t.data.pageVo.total)}else{e.tableData=[];var u={tableData:e.tableData};e.$refs.myTable&&e.$refs.myTable.setDefaultMesg(u),1===e.pageNum&&(e.total=0)}t.data&&t.data.countVo&&(e.topCardCount.all=t.data.countVo.all,e.topCardCount.putaWay=t.data.countVo.putaWay,e.topCardCount.soldOut=t.data.countVo.soldOut)}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示",message:t.message})})},updateShelfStatus:function(t){var e=this,a=[];a.push(t.row.presaleId);var s=-1,o="";0==t.shelfStatus?(s=0,o="上架"):1==t.shelfStatus&&(s=1,o="下架"),this.$confirm("确定要执行("+o+")操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(S,{presaleIds:a,shelfStatus:s}).then(function(t){if(r.c(),0===t.code)return 0===s?e.$message.success("上架成功"):1===s&&e.$message.success("下架成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},deleteItem:function(t){var e=this,a=[];a.push(t.row.presaleId),this.$confirm("确定要执行删除操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(b,{presaleIds:a,deleteStatus:1}).then(function(t){if(r.c(),0===t.code)return e.$message.success("删除成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},doBatchDelHandel:function(t){var e=this;if(t.checkedList&&(this.checkedList=t.checkedList),0!==this.checkedList.length){var a=[],s=!0,o=!1,n=void 0;try{for(var c,l=i()(this.checkedList);!(s=(c=l.next()).done);s=!0){var u=c.value;a.push(u.presaleId)}}catch(t){o=!0,n=t}finally{try{!s&&l.return&&l.return()}finally{if(o)throw n}}this.$confirm("确定要执行批量删除操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(b,{presaleIds:a,deleteStatus:1}).then(function(t){if(r.c(),0===t.code)return e.$message.success("删除成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}else this.$message("请选择商品")},batchUpdateStock:function(t){t.checkedList&&(this.checkedList=t.checkedList),this.dialogFormVisible=!0,1===t.checkedList.length?this.stockNum=t.checkedList[0].stockNum:this.stockNum=""},doConfirmHandel:function(){var t=this;if(0!==this.checkedList.length)if(""!=this.stockNum){if(0==this.stockNum)this.stockNum=0;else{if(!/^[1-9]*[1-9][0-9]*$/.test(this.stockNum))return void this.$message("库存数为0-999的整数");if(this.stockNum<0||this.stockNum>999)return void this.$message("库存数为0-999的整数")}var e=[],a=!0,s=!1,o=void 0;try{for(var n,r=i()(this.checkedList);!(a=(n=r.next()).done);a=!0){var c=n.value;e.push(c.presaleId)}}catch(t){s=!0,o=t}finally{try{!a&&r.return&&r.return()}finally{if(s)throw o}}var l=parseInt(this.stockNum);this.isDisabled=!0,this.$http.post(k,{presaleIds:e,stockNum:l}).then(function(e){if(setTimeout(function(){t.isDisabled=!1},800),0===e.code)return t.dialogFormVisible=!1,t.$message.success("批量设置库存成功"),void t.doSearchHandel();throw new Error(e.msg)}).catch(function(e){t.isDisabled=!1,t.$notify.error({title:"提示",message:e.message})})}else this.$message("请输入库存数量");else this.$message("请选择商品")},updateStockNumHandel:function(t){var e=this;if(t){var a=[];a.push(t.row.presaleId);var s=parseInt(t.stockNum);r.r(),this.$http.post(k,{presaleIds:a,stockNum:s}).then(function(t){if(r.c(),0===t.code)return e.dialogFormVisible=!1,e.$message.success("批量设置库存成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}},copyStoreGoods:function(){var t={title:"复制门店商品",saleType:this.searchContent.saleType,platformId:this.searchContent.platformId};this.$refs.copyGoods.setDefaultMesg(t)},showBatchUpdateStock:function(){var t={title:"批量设置库存",storeNo:this.searchContent.storeNo,saleType:this.searchContent.saleType,platformId:this.searchContent.platformId};this.$refs.batchUpdateStock.setDefaultMesg(t)},batchUpdateShelfStatus:function(t){var e=this;if(t.checkedList&&(this.checkedList=t.checkedList),0!==this.checkedList.length){var a=[],s=!0,o=!1,n=void 0;try{for(var c,l=i()(this.checkedList);!(s=(c=l.next()).done);s=!0){var u=c.value;a.push(u.presaleId)}}catch(t){o=!0,n=t}finally{try{!s&&l.return&&l.return()}finally{if(o)throw n}}var d=-1,h="";0==t.shelfStatus?(d=0,h="上架"):1==t.shelfStatus&&(d=1,h="下架"),this.$confirm("确定要执行批量("+h+")操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(S,{presaleIds:a,shelfStatus:d}).then(function(t){if(r.c(),0===t.code)return 0===d?e.$message.success("批量上架成功"):1===d&&e.$message.success("批量下架成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}else this.$message("请选择商品")},doSyncItem:function(t){var e=this,a=[];a.push(t.row.presaleId),this.$confirm("确定要执行同步操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(w,{presaleIds:a,syncStatus:1}).then(function(t){if(r.c(),0===t.code)return e.$message.success("同步成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},doBatchSyncHandel:function(t){var e=this;if(t.checkedList&&(this.checkedList=t.checkedList),0!==this.checkedList.length){var a=[],s=!0,o=!1,n=void 0;try{for(var c,l=i()(this.checkedList);!(s=(c=l.next()).done);s=!0){var u=c.value;a.push(u.presaleId)}}catch(t){o=!0,n=t}finally{try{!s&&l.return&&l.return()}finally{if(o)throw n}}this.$confirm("确定要执行批量同步操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.r(),e.$http.post(w,{presaleIds:a,syncStatus:1}).then(function(t){if(r.c(),0===t.code)return e.$message.success("同步成功"),void e.doSearchHandel(!0);throw new Error(t.msg)}).catch(function(t){r.c(),e.$notify.error({title:"提示",message:t.message})})}).catch(function(){})}else this.$message("请选择商品")},goodsSelectInit:function(){if(this.$refs.GoodsSelect){var t={queryString:this.searchContent.queryString,categoryIdList:this.searchContent.categoryIdList,saleType:this.searchContent.saleType,platformId:this.searchContent.platformId,platformCityGoodsIds:this.searchContent.platformCityGoodsIds};this.$refs.GoodsSelect.setDefaultMesg(t)}},DoSelectGoodsHandel:function(t){var e=t.checkedList,a=t.queryString,s=[],o=!0,n=!1,r=void 0;try{for(var c,l=i()(e);!(o=(c=l.next()).done);o=!0){var u=c.value;s.push(u.platformCityGoodsId)}}catch(t){n=!0,r=t}finally{try{!o&&l.return&&l.return()}finally{if(n)throw r}}this.searchContent.platformCityGoodsIds=s,this.searchContent.queryString=a,this.doSearchHandel(!0)}}},C={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"handel-search-wraper"},[a("div",{staticClass:"handel-wraper"},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:t.showBatchUpdateStock}},[t._v("批量调库存")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-document"},on:{click:t.copyStoreGoods}},[t._v("复制门店商品")])],1),t._v(" "),a("hr",{staticClass:"s-slip"}),t._v(" "),a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"门店"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择门店",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.storeNo,callback:function(e){t.$set(t.searchContent,"storeNo",e)},expression:"searchContent.storeNo"}},t._l(t.storeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"SKU编码/商品名称"}},[a("goods-select",{ref:"GoodsSelect",on:{DoSelectGoodsHandel:t.DoSelectGoodsHandel}})],1),t._v(" "),a("el-form-item",{attrs:{label:"同步状态"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择同步状态",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.syncStatus,callback:function(e){t.$set(t.searchContent,"syncStatus",e)},expression:"searchContent.syncStatus"}},t._l(t.syncStatusOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSearchHandel(!0)}}},[t._v("搜索")])],1)],1)],1)]),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-wraper tab-wraper"},[a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"all"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("全部 "+t._s(this.topCardCount.all))])]),t._v(" "),a("el-tab-pane",{attrs:{name:"onShelf"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("上架中 "+t._s(this.topCardCount.putaWay))])]),t._v(" "),a("el-tab-pane",{attrs:{name:"downShelf"}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v("已下架 "+t._s(this.topCardCount.soldOut))])]),t._v(" "),a("my-table",{ref:"myTable",on:{updateShelfStatus:t.updateShelfStatus,deleteItem:t.deleteItem,batchUpdateStock:t.batchUpdateStock,doBatchDelHandel:t.doBatchDelHandel,updateStockNumHandel:t.updateStockNumHandel,batchUpdateShelfStatus:t.batchUpdateShelfStatus,doSyncItem:t.doSyncItem,doBatchSyncHandel:t.doBatchSyncHandel}})],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.tableData.length>0,expression:"tableData.length > 0"}],staticClass:"pagination"},[a("el-pagination",{attrs:{background:"","current-page":t.pageNum,"page-sizes":[10,50,100,200,500],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}})],1),t._v(" "),a("el-dialog",{attrs:{title:"批量设置库存",visible:t.dialogFormVisible,width:"400px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",[a("el-form",{ref:"form",attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"库存",required:""}},[a("el-input",{staticClass:"search-input",attrs:{size:"small",placeholder:"请输入库存"},model:{value:t.stockNum,callback:function(e){t.stockNum=e},expression:"stockNum"}}),t._v(" "),a("div",[t._v("所选商品全部将以此库售卖")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled},on:{click:t.doConfirmHandel}},[t._v("确 定")])],1)],1),t._v(" "),a("div",[a("copy-goods",{ref:"copyGoods"})],1),t._v(" "),a("div",[a("batch-update-stock",{ref:"batchUpdateStock",on:{doSearchHandel:t.doSearchHandel}})],1)],1)},staticRenderFns:[]};var $=a("VU/8")(_,C,!1,function(t){a("6Wkt")},null,null);e.default=$.exports},qVfS:function(t,e){}});
//# sourceMappingURL=32.63683bb55eed588f8205.js.map
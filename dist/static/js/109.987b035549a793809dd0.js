webpackJsonp([109],{XpIe:function(t,e){},hhAW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lHA8"),o=a.n(i),n=a("c/Tr"),r=a.n(n),s=a("Gu7T"),l=a.n(s),c=a("Dd8w"),u=a.n(c),d=a("BO1k"),p=a.n(d),h=a("ylbZ"),m=a("ssT3"),v=a("rNjK"),f=a("oAV5"),g=a("cpGA"),y=a("8uth"),w=a("enjp"),b=a("bzuE"),S=a("3rb3"),C=a("u6Xy"),k=/^(0|[1-9][0-9]*)$/,x=/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,_={data:function(){return{pageSizes:b.a.pageSizes10,loading:!1,pageNum:1,pageSize:10,total:0,searchContent:{DIFFCITY:!0,regionCode:m.a.get("regionCode")||"",activityType:51,activitySearchVal:"",platformId:5,categoryId:"",categoryIdList:[],presaleType:"",cycleType:"",goodsInfo:"",platformCityGoodsId:"",activityStatus:"",sfInStock:"",vendorCode:""},cateDefaultProps:{children:"categoryVoList",label:"categoryName",value:"categoryId"},cycleTypeOptions:[{label:"全部",value:""},{label:"短周期",value:1},{label:"长周期",value:2}],presaleTypeOptions:[{label:"全部",value:""},{label:"单期",value:1},{label:"周期",value:2}],statusOptions:[{label:"全部",value:""},{label:"进行中",value:3},{label:"未发布",value:0},{label:"未开始",value:2},{label:"已结束",value:4},{label:"已终止",value:5}],categoryList:[],tableData:[],checkedList:[],showUpdate:!1,currentIndex:-1,currentFiledName:"",showChangImg:!1,currentRowMsg:{},currentChangeImgIndex:-1,imageUploadLoading:!1,exportLoading:!1,exportConfig:{activityId:"活动ID",activityPlatCityGoodsId:"活动商品ID",platformCityGoodsId:"区域商品ID",goodsNo:"SKU编码",skuNo:"ERP编码",goodsName:"商品名称",spec:"规格",price:"原价",preSalePrice:"预售价",platformCurStock:"区域限售库存",stock:"门店限售库存",limitCount:"每人每期限购",sortNum:"排序",activityName:"预售活动名称",presaleTypeName:"预售类型",cycleTypeName:"周期类型",activityStartDate:"活动开始时间",activityEndDate:"活动结束时间",cutoffTypeStr:"截单时间",pickUpDate:"提货日期",activityStatusStr:"状态",createTime:"商品创建时间",preSaleImageUrl:"大图URL"},templateConfig:{activityId:"活动ID（不可修改，必填）",platformCityGoodsId:"区域商品ID（不可修改，必填）",goodsNo:"SKU编码（不可修改）",skuNo:"ERP编码（不可修改）",goodsName:"活动商品名称（不可修改）",price:"原价（可修改，必填）",preSalePrice:"预售价（可修改，必填）",platformCurStock:"区域限售库存（可修改，选填，为空时不限）",stock:"门店限售库存（可修改，选填，为空时不限）",limitCount:"每人每期限购（可修改，选填，为空时不限）",sortNum:"排序（可修改，必填）"},showTipErrorMsg:!1,hasErrorMsgData:[],sfInStockOptions:[{label:"全部",value:""},{label:"是",value:!0},{label:"否",value:!1}],vendorList:[]}},created:function(){this.searchContent.activitySearchVal=this.$route.query.id&&"undefined"!==this.$route.query.id?parseInt(this.$route.query.id):"",this.getCategoryId()},mounted:function(){this.getVendorlist(),this.doSearchHandel(!0)},components:{"excel-add":w.a,"choose-store":v.a,region:h.a},methods:{RegionChange:function(t){this.searchContent.regionCode=t.regionCode,this.doSearchHandel(!0)},getCategoryId:function(){var t=this;this.$http.post(C.a.getCategoryTree,{DIFFCITY:!0}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=!0,i=!1,o=void 0;try{for(var n,r=p()(e.data);!(a=(n=r.next()).done);a=!0){var s=n.value;s.categoryVoList&&0===s.categoryVoList.length&&(s.categoryVoList=null)}}catch(t){i=!0,o=t}finally{try{!a&&r.return&&r.return()}finally{if(i)throw o}}t.categoryList=e.data}else t.categoryList=[]}).catch(function(t){console.log("提示(三方平台店内分类):",t.message)})},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},doSearchHandel:function(t){var e=this;this.checkedList=[];var a=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[a],this.loading=!0,!0===t&&(this.pageNum=1),this.$http.post(C.a.actGoodsListPage,u()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(t){if(e.loading=!1,0!==t.code)throw new Error(t.msg);t.data?(t.data.result&&t.data.result.length?e.tableData=t.data.result:e.tableData=[],e.total=t.data.total):(e.total=0,e.tableData=[])}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示",message:t.message})})},deleteHandel:function(t,e){var a=this,i={DIFFCITY:!0},o=[];if(t){var n={id:e.id,activityType:e.activityType};o.push(n),i.idAndActivityTypeList=o}else o=this.checkedList.map(function(t){return{id:t.id,activityType:t.activityType}}),i.idAndActivityTypeList=o;this.$confirm("您确定要删除所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http.post(C.a.delUrl,u()({},i)).then(function(t){if(0===t.code)return a.$message.success("删除成功"),void a.doSearchHandel();throw new Error(t.msg)}).catch(function(t){a.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},handleSelect:function(t,e){var a={},i=[];if(f.m(e.id,"id",this.checkedList))this.checkedList=f.q("id",e.id,this.checkedList);else{i.push(e);var o=[].concat(i,l()(this.checkedList));this.checkedList=o.reduceRight(function(t,e){return!a[e.id]&&(a[e.id]=t.push(e)),t},[])}},handleSelectAll:function(t){var e={};if(t.length>0){var a=!0,i=!1,o=void 0;try{for(var n,r=p()(t);!(a=(n=r.next()).done);a=!0){var s=n.value;this.checkedList.push(s)}}catch(t){i=!0,o=t}finally{try{!a&&r.return&&r.return()}finally{if(i)throw o}}this.checkedList=this.checkedList.reduceRight(function(t,a){return!e[a.id]&&(e[a.id]=t.push(a)),t},[])}else{var l=[],c=!0,u=!1,d=void 0;try{for(var h,m=p()(this.tableData);!(c=(h=m.next()).done);c=!0){var v=h.value;l.push(v)}}catch(t){u=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(u)throw d}}var g=f.i(this.checkedList,l,"id");this.checkedList=g&&g.length>0?g:[]}},importStore:function(){if(0!==this.checkedList.length){var t=this.checkedList.map(function(t){return t.activityId});if(r()(new o.a(t)).length>1)this.$notify.warning({title:"温馨提示",message:"请选择同一个活动的商品"});else{var e={title:"批量引入门店",platformId:this.searchContent.platformId,activityType:51,regionCode:this.searchContent.regionCode};this.$refs.chooseStore.setDefault(e)}}else this.$message("请选择商品")},activityStatusFormatter:function(t,e,a,i){return 0===a?"未发布":1==a?"已发布":2==a?"未开始[发布中]":3==a?"进行中[发布中]":4==a?11===t.activityType?"已结束[发布中]":"已结束":5==a?"已终止":6==a?"已失效":void 0},onFocusHandel:function(t,e){var a=this;setTimeout(function(){a.tableData[t][e+"Temp"]=a.tableData[t][e],a.showUpdate=!0,a.currentIndex=t,a.currentFiledName=e},400)},onBlurHandel:function(){var t=this;setTimeout(function(){var e=t.currentIndex,a=t.currentFiledName;t.tableData[e][a]=t.tableData[e][a+"Temp"],t.showUpdate=!1,t.currentIndex=-1,t.currentFiledName=""},400)},sureUpdateHandel:function(t){var e=this,a=(this.currentIndex,this.currentFiledName);if("price"===a){if(!x.test(t[a])||0===parseFloat(t[a]))return void this.$message.warning("原价是大于0，小数保留小数点后2位");if(parseFloat(t[a])<parseFloat(t.preSalePrice))return void this.$message.warning("原价必须大于等于预售价")}else if("preSalePrice"===a){if(!x.test(t[a]))return void this.$message.warning("预售价是大于0，小数保留小数点后2位");if(parseFloat(t[a])>parseFloat(t.price))return void this.$message.warning("原价必须大于等于预售价")}else if("stock"===a){if(t[a]&&0!=t[a]&&!k.test(t[a]))return void this.$message.warning("门店限售库存为大于等于0的正整数")}else if("platformCurStock"===a){if(t[a]&&0!=t[a]&&!k.test(t[a]))return void this.$message.warning("区域限售库存为大于等于0的正整数")}else if("limitCount"===a){if(t[a]&&0!=t[a]&&!k.test(t[a]))return void this.$message.warning("每人每期限购为大于等于0的正整数")}else if("sortNum"===a&&!k.test(t[a]))return void this.$message.warning("排序为大于等于0的正整数");var i=u()({},t),o={DIFFCITY:!0,idAndActivityTypeList:[{id:i.id,activityType:i.activityType}],updateGoodsData:i};f.r(),this.$http.post(C.a.updateUrl,u()({},o)).then(function(t){if(f.c(),0===t.code)return e.$message.success("更新成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){f.c(),e.$notify.error({title:"提示",message:t.message})})},confirmHandel:function(t){var e=this,a=t.checkedList.map(function(t){return t.storeNo}),i=this.checkedList.map(function(t){return t.id}),o=this.checkedList[0].activityId,n=t.activityType||"";this.$http.post(C.a.addGoodsToStore,{ids:i,storeNos:a,activityType:n,activityId:o,DIFFCITY:!0}).then(function(t){if(0===t.code)return e.$refs.chooseStore.closeDialog(),e.$refs.chooseStore.closeDisabled(),e.$message.success("引入门店成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.$refs.chooseStore.closeDisabled(),e.$notify.error({title:"提示",message:t.message})})},mouseEnterImg:function(t,e){4!==e.activityStatus&&5!==e.activityStatus&&!0!==this.imageUploadLoading&&(this.showChangImg=!0,this.currentChangeImgIndex=t,this.currentRowMsg=u()({},e))},mouseLeaveImg:function(){this.showChangImg=!1,this.currentChangeImgIndex=-1},imageUploadReg:function(t){var e=-1!==t.type.indexOf("image/"),a="image/jpeg"===t.type||"image/png",i=t.size<=307200;return e&&a&&i||this.$message.error("商品图片建议上传大小不超过300K的710*420像素的jpg或png图片"),e&&a&&i},getToken:function(){var t=this;return this.$http.post(S.a.getQiNiuToken,{}).then(function(t){if(0==t.code){var e=t.data.token;return{fileName:t.data.key,token:e}}throw new Error(t.msg)}).catch(function(e){t.imageUploadLoading=!1,t.$notify.error({title:"获取七牛token提示",message:e.message})})},emitUpload:function(t){var e=this;this.imageUploadLoading=!0,f.r(),this.getToken().then(function(a){g.upload(t.file,a.fileName,a.token).subscribe({error:function(){e.imageUploadLoading=!1,f.c()},complete:function(t){var a="http://retailimg01.benlailife.com/"+t.key;e.imageUploadLoading=!1,f.c(),e.currentRowMsg.preSaleImageUrl=a,e.sureUpdateHandel(e.currentRowMsg)},next:function(t){}})})},platformCurStockHeader:function(){var t=this.$createElement;return t("el-popover",{attrs:{placement:"top-start",width:"260",trigger:"hover"}},[t("div",[t("p",["区域限售库存，即所有门店共享的总预售库存；"]),t("p",["门店限售即每个门店的预售库存，可在门店预售商品中调整门店库存；"]),t("p",["每个商品至少要设置一种限售库存方式，最大可设置9999；"]),t("p",["如果既设了区域限售，又设了门店限售，则先校验区域库存，再校验门店库存；"])]),t("span",{slot:"reference"},["区域限售库存",t("i",{class:"el-icon-question"})])])},exportData:function(){var t=this;this.exportLoading=!0;var e=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[e],this.$http.post(C.a.actGoodsListPage,u()({},this.searchContent)).then(function(e){if(t.exportLoading=!1,0===e.code){var a=e.data&&e.data.result&&e.data.result.length?e.data.result:[];a.forEach(function(t){t.cutoffTypeStr=(t.cutoffTypeName||"")+" "+(t.cutoffTime||""),0===t.activityStatus?t.activityStatusStr="未发布":1==t.activityStatus?t.activityStatusStr="已发布":2==t.activityStatus?t.activityStatusStr="未开始[发布中]":3==t.activityStatus?t.activityStatusStr="进行中[发布中]":4==t.activityStatus?11===t.activityType?t.activityStatusStr="已结束[发布中]":t.activityStatusStr="已结束":5==t.activityStatus?t.activityStatusStr="已终止":6==t.activityStatus&&(t.activityStatusStr="已失效")});var i=f.o(t.exportConfig,!1),o=f.o(t.exportConfig,!0);return y.a.ExportJsonToExcel({header:i,filterVal:o,data:a,filename:"预售商品管理商品"}),void setTimeout(function(){t.$notify.success({title:"温馨提示",message:"预售商品管理商品"}),t.isDisabled=!1},500)}throw new Error(e.msg)}).catch(function(e){t.exportLoading=!1,t.$notify.error({title:"提示",message:e.message})})},showDownLoadDialog:function(){if(this.$refs.excelAdd){var t={title:"批量修改预售商品",tempConfig:this.templateConfig};this.$refs.excelAdd.setDefaultMsg(t)}},doConfirmHandel:function(t){var e=this,a=t.dataList||[];this.$http.post(C.a.checkPreGoodsUpdate,[].concat(l()(a))).then(function(t){if(e.$refs.excelAdd.closeDisabled(),e.$refs.excelAdd.closeDialog(),0===t.code)return e.hasErrorMsgData=t.data&&t.data.length?t.data:[],void(e.hasErrorMsgData.find(function(t){return 1===t.msgType})?e.showTipErrorMsg=!0:e.doUpdateExportGoodsGoods(t.data));throw new Error(t.msg)}).catch(function(t){e.$refs.excelAdd.closeDisabled(),e.$refs.excelAdd.closeDialog(),e.$notify.error({title:"提示",message:t.message})})},doUpdateExportGoodsGoods:function(t){var e=this;this.$http.post(C.a.updateExportGoods,[].concat(l()(t))).then(function(t){if(0===t.code)return e.$message.success("批量修改成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.$notify.error({title:"提示",message:t.message})})},downLoadErrorMsg:function(){var t=this,e=u()({},this.templateConfig);e.msgTypeStr="验证结果",e.msg="失败原因",this.hasErrorMsgData.forEach(function(t){t.msgTypeStr=1===t.msgType?"验证失败":"验证成功"});var a=f.o(e,!1),i=f.o(e,!0);y.a.ExportJsonToExcel({header:a,filterVal:i,data:this.hasErrorMsgData,filename:"批量修改预售商品"}),setTimeout(function(){t.$notify.success({title:"温馨提示",message:"批量修改预售商品"}),t.isDisabled=!1},500)},getVendorlist:function(){var t=this;this.$http.post(C.a.vendorlist,{regionCode:this.searchContent.regionCode,DIFFCITY:this.searchContent.DIFFCITY}).then(function(e){if(0!==e.code)throw new Error(e.msg);t.vendorList=e.data&&e.data.length?[{vendorNo:"",vendorName:"全部"}].concat(l()(e.data)):[]}).catch(function(t){console.log("获取供应商编码及名称（编码[vendorCode]，名称[vendorName]）报错：",t.message)})}}},I={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"handel-search-wraper"},[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("region",{staticClass:"region-wrap",attrs:{refresh:!1},on:{RegionChange:t.RegionChange}}),t._v(" "),a("el-form-item",{attrs:{label:"活动ID/名称"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"活动ID/名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.activitySearchVal,callback:function(e){t.$set(t.searchContent,"activitySearchVal","string"==typeof e?e.trim():e)},expression:"searchContent.activitySearchVal"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"商品分类"}},[a("el-cascader",{staticClass:"search-input",attrs:{placeholder:"请选择分类",options:t.categoryList,"change-on-select":"",size:"small",clearable:"",filterable:"",props:t.cateDefaultProps},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.categoryIdList,callback:function(e){t.$set(t.searchContent,"categoryIdList",e)},expression:"searchContent.categoryIdList"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"SKU编码/商品名称"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"SKU编码/商品名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.goodsInfo,callback:function(e){t.$set(t.searchContent,"goodsInfo","string"==typeof e?e.trim():e)},expression:"searchContent.goodsInfo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"区域商品ID"}},[a("el-input",{staticClass:"search-input",attrs:{type:"number",placeholder:"区域商品ID",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.platformCityGoodsId,callback:function(e){t.$set(t.searchContent,"platformCityGoodsId","string"==typeof e?e.trim():e)},expression:"searchContent.platformCityGoodsId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"预售类型"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择预售类型",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.presaleType,callback:function(e){t.$set(t.searchContent,"presaleType",e)},expression:"searchContent.presaleType"}},t._l(t.presaleTypeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"周期类型"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择周期类型",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.cycleType,callback:function(e){t.$set(t.searchContent,"cycleType",e)},expression:"searchContent.cycleType"}},t._l(t.cycleTypeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"预售状态"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择状态",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.activityStatus,callback:function(e){t.$set(t.searchContent,"activityStatus",e)},expression:"searchContent.activityStatus"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"供应商专供"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"供应商专供",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.vendorCode,callback:function(e){t.$set(t.searchContent,"vendorCode",e)},expression:"searchContent.vendorCode"}},t._l(t.vendorList,function(t){return a("el-option",{key:t.vendorNo,attrs:{label:t.vendorName,value:t.vendorNo}})}),1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSearchHandel(!0)}}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{size:"mini",icon:"el-icon-download",loading:t.exportLoading},on:{click:t.exportData}},[t._v("导出")])],1)],1)],1)]),t._v(" "),a("div",{staticClass:"table-wraper"},[a("div",{staticClass:"batch-handel-w"},[a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-edit",disabled:0===t.checkedList.length},on:{click:t.importStore}},[t._v("发布至门店")]),t._v(" "),a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-delete",disabled:0===t.checkedList.length},on:{click:function(e){return t.deleteHandel(!1,t.checkedList)}}},[t._v("批量删除")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:t.handleSelect,"select-all":t.handleSelectAll}},[a("el-table-column",{attrs:{type:"selection",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"140px",label:"ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"ll-erp-p-no"},[t._v("活动ID: "+t._s(e.row.activityId))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("活动商品ID: "+t._s(e.row.activityPlatCityGoodsId))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"280px",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"ll-p-m-w"},[a("div",{staticClass:"sf-pre-goods-img-w",on:{mouseenter:function(a){return t.mouseEnterImg(e.$index,e.row)},mouseleave:t.mouseLeaveImg}},[e.row.preSaleImageUrl&&""!=e.row.preSaleImageUrl?a("img",{attrs:{src:e.row.preSaleImageUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):a("img",{attrs:{src:"/shop/static/img_error.png",alt:""}}),t._v(" "),a("el-upload",{attrs:{action:"","show-file-list":!1,"before-upload":t.imageUploadReg,"http-request":t.emitUpload}},[e.row.vendorName?a("div",{staticClass:"vendor-tag"},[t._v(t._s(e.row.vendorName)+"专供")]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showChangImg&&t.currentChangeImgIndex===e.$index,expression:"showChangImg && currentChangeImgIndex === scope.$index"}],staticClass:"change-img-wrap"},[t._v("修改图片")])])],1),t._v(" "),a("div",{staticClass:"ll-p-m-c-r"},[a("div",[t._v(t._s(e.row.goodsName||"-"))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("商品编码："+t._s(e.row.skuNo||"--"))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("区域商品ID："+t._s(e.row.platformCityGoodsId||"--"))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100px",prop:"spec",label:"规格"}}),t._v(" "),a("el-table-column",{attrs:{label:"原价","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"price"===t.currentFiledName&&t.currentIndex===e.$index?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdateHandel(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(a){return t.onFocusHandel(e.$index,"price")}},model:{value:e.row.price,callback:function(a){t.$set(e.row,"price",a)},expression:"scope.row.price"}})],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"预售价","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"preSalePrice"===t.currentFiledName&&t.currentIndex===e.$index?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.preSalePrice,callback:function(a){t.$set(e.row,"preSalePrice",a)},expression:"scope.row.preSalePrice"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdateHandel(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus||!0},on:{focus:function(a){return t.onFocusHandel(e.$index,"preSalePrice")}},model:{value:e.row.preSalePrice,callback:function(a){t.$set(e.row,"preSalePrice",a)},expression:"scope.row.preSalePrice"}})],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{"render-header":t.platformCurStockHeader,"min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"platformCurStock"===t.currentFiledName&&t.currentIndex===e.$index?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.platformCurStock,callback:function(a){t.$set(e.row,"platformCurStock",a)},expression:"scope.row.platformCurStock"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdateHandel(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus||!0},on:{focus:function(a){return t.onFocusHandel(e.$index,"platformCurStock")}},model:{value:e.row.platformCurStock,callback:function(a){t.$set(e.row,"platformCurStock",a)},expression:"scope.row.platformCurStock"}})],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"每人每期限购","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"limitCount"===t.currentFiledName&&t.currentIndex===e.$index?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.limitCount,callback:function(a){t.$set(e.row,"limitCount",a)},expression:"scope.row.limitCount"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdateHandel(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(a){return t.onFocusHandel(e.$index,"limitCount")}},model:{value:e.row.limitCount,callback:function(a){t.$set(e.row,"limitCount",a)},expression:"scope.row.limitCount"}})],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"排序","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"sortNum"===t.currentFiledName&&t.currentIndex===e.$index?a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.sortNum,callback:function(a){t.$set(e.row,"sortNum",a)},expression:"scope.row.sortNum"}})],1),t._v(" "),a("el-button-group",[a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(a){return t.sureUpdateHandel(e.row)}}}),t._v(" "),a("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):a("div",{staticClass:"stock-num"},[a("el-button-group",[a("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(a){return t.onFocusHandel(e.$index,"sortNum")}},model:{value:e.row.sortNum,callback:function(a){t.$set(e.row,"sortNum",a)},expression:"scope.row.sortNum"}})],1)],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"activityName",label:"预售活动名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"presaleTypeName",label:"预售类型"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"cycleTypeName",label:"周期类型"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"210px",label:"有效期"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.activityStartDate&&e.row.activityEndDate?a("div",{staticClass:"date-wrap-inline"},[a("div",[a("p",[t._v(t._s(e.row.activityStartDate.substr(0,10)))]),t._v(" "),a("p",[t._v(t._s(e.row.activityStartDate.substr(11,8)))])]),t._v(" "),a("div",[t._v(" - ")]),t._v(" "),a("div",[a("p",[t._v(t._s(e.row.activityEndDate.substr(0,10)))]),t._v(" "),a("p",[t._v(t._s(e.row.activityEndDate.substr(11,8)))])])]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"130px",label:"截单时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("\n            "+t._s(e.row.cutoffTypeName)+" "+t._s(e.row.cutoffTime)+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"110px",prop:"pickUpDate",label:"提货日期"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"activityStatus",label:"状态",formatter:t.activityStatusFormatter}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return t.deleteHandel(!0,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total>0?a("el-pagination",{staticClass:"tc mt20",attrs:{background:"","current-page":t.pageNum,"page-sizes":t.pageSizes,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}}):t._e()],1),t._v(" "),a("choose-store",{ref:"chooseStore",on:{confirmHandel:t.confirmHandel}}),t._v(" "),a("excel-add",{ref:"excelAdd",on:{doConfirmHandel:t.doConfirmHandel}}),t._v(" "),a("el-dialog",{attrs:{title:"批量导入失败",visible:t.showTipErrorMsg,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"450px"},on:{"update:visible":function(e){t.showTipErrorMsg=e}}},[a("div",[t._v("\n      部分商品不符合要求，请按要求修改后再重新导入。"),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:t.downLoadErrorMsg}},[t._v("下载查看失败原因")])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.showTipErrorMsg=!1}}},[t._v("关 闭")])],1)])],1)},staticRenderFns:[]};var $=a("VU/8")(_,I,!1,function(t){a("XpIe")},null,null);e.default=$.exports}});
//# sourceMappingURL=109.987b035549a793809dd0.js.map
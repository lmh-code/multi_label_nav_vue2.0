webpackJsonp([29],{YcA9:function(t,e){},eNSl:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("pFYg"),o=i.n(a),n=i("lHA8"),r=i.n(n),s=i("c/Tr"),c=i.n(s),l=i("Gu7T"),u=i.n(l),d=i("Dd8w"),p=i.n(d),h=i("BO1k"),v=i.n(h),m=i("ylbZ"),f=i("ssT3"),y=i("rNjK"),g={data:function(){return{activityType:"",pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},isDisabled:!1,isShow:!1,title:"",activityStoreGroupList:[{performanceDate:"",activityStoresCheckedList:[]}],activityEndDate:"",platformId:"",regionCode:""}},components:{"choose-store":i("hR2Z").a},methods:{setDefault:function(t){t&&(this.title=t.title,this.activityType=t.activityType,this.activityEndDate=t.activityEndDate,this.platformId=t.platformId,this.regionCode=t.regionCode),this.isDisabled=!1,this.isShow=!0,this.activityStoreGroupList=[{performanceDate:"",activityStoresCheckedList:[]}]},chooseStoreOpen:function(t){var e={title:"选择门店",groupIndex:t,platformId:this.platformId,regionCode:this.regionCode,checkedList:this.activityStoreGroupList[t].activityStoresCheckedList,otherCheckedList:this.getCheckedStores(t)};this.$refs.chooseStore.setDefault(e)},confirmChooseStore:function(t){var e=t.checkedList||[],i=t.groupIndex||0;this.activityStoreGroupList[i].activityStoresCheckedList=e},getCheckedStores:function(t){var e=[];return t||0===t?this.activityStoreGroupList.forEach(function(i,a){a!=t&&(e=[].concat(u()(e),u()(i.activityStoresCheckedList)))}):this.activityStoreGroupList.forEach(function(t){e=[].concat(u()(e),u()(t.activityStoresCheckedList))}),e},doAddStoreGroupHandel:function(){this.activityStoreGroupList.push({performanceDate:"",activityStoresCheckedList:[]})},doMinusStoreGroupHandel:function(t){this.activityStoreGroupList.splice(t,1)},deleteStoreItem:function(t,e){var i=e.erpStoreNo,a=this.activityStoreGroupList[t].activityStoresCheckedList;this.activityStoreGroupList[t].activityStoresCheckedList=a.filter(function(t){return t.erpStoreNo!==i})},confirmClose:function(){var t=this.activityStoreGroupList.map(function(t,e){return{index:e,performanceDate:t.performanceDate,storeNoList:t.activityStoresCheckedList.map(function(t){return t.erpStoreNo})}}),e=Date.parse(new Date(this.activityEndDate.replace(/\-/g,"/"))),i=!0,a=!1,o=void 0;try{for(var n,r=v()(t);!(i=(n=r.next()).done);i=!0){var s=n.value;if(!s.storeNoList||!s.storeNoList.length)return void this.$message("请选择【第"+(s.index+1)+"组】的参与门店");if(!s.performanceDate)return void this.$message("请选择【第"+(s.index+1)+"组】的履约时间");if(e>Date.parse(new Date((s.performanceDate+" 23:59:59").replace(/\-/g,"/"))))return void this.$message("【第"+(s.index+1)+"组】的履约时间不能早于活动结束时间，所选活动商品的结束时间为"+this.activityEndDate);s.performanceDatetime=s.performanceDate+" 23:59:59"}}catch(t){a=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(a)throw o}}this.isDisabled=!0;var c={reqParams:t,activityType:this.activityType};this.$emit("doBatchInsertHandel",c)},closeDialog:function(){this.isShow=!1},closeDisabled:function(){this.isDisabled=!1}}},S={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{"close-on-click-modal":!1,"close-on-press-escape":!1,title:t.title,visible:t.isShow,width:"700px"},on:{"update:visible":function(e){t.isShow=e}}},[i("div",{staticClass:"choose-store-wrap"},t._l(t.activityStoreGroupList,function(e,a){return i("div",{key:a,staticClass:"store-pre-time-item-wrap",class:a>0?"mt10":null},[i("div",{staticClass:"item-right"},[i("div",[i("span",[t._v("参与门店")]),t._v(" "),i("el-button",{attrs:{size:"small",icon:"el-icon-plus"},on:{click:function(e){return t.chooseStoreOpen(a)}}},[t._v("选择门店")]),t._v(" "),e.activityStoresCheckedList.length>0?i("div",[i("el-table",{staticClass:"fixed-height",attrs:{data:e.activityStoresCheckedList,"empty-text":"暂无选中任何门店","max-height":"250",size:"small"}},[i("el-table-column",{attrs:{"min-width":"200px",label:"门店编码/名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v("\n                      "+t._s(e.row.erpStoreNo)+"_"+t._s(e.row.erpStoreName)+"\n                    ")])]}}],null,!0)}),t._v(" "),i("el-table-column",{attrs:{"min-width":"80",prop:"cityName",label:"城市"}}),t._v(" "),i("el-table-column",{attrs:{"min-width":"80",prop:"saleTypeName",label:"门店类型"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(i){return t.deleteStoreItem(a,e.row)}}},[t._v("删除")])]}}],null,!0)})],1)],1):t._e()],1),t._v(" "),i("div",{staticClass:"mt10"},[i("span",[t._v("履约时间")]),t._v(" "),i("el-date-picker",{staticClass:"search-input",attrs:{type:"date",placeholder:"请选择履约时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",size:"small","picker-options":t.pickerOptions},model:{value:e.performanceDate,callback:function(i){t.$set(e,"performanceDate",i)},expression:"item.performanceDate"}}),t._v(" "),i("span",[t._v("门店仅支持自提则为自提时间")])],1)]),t._v(" "),i("div",{staticClass:"item-left"},[i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus",circle:""},on:{click:t.doAddStoreGroupHandel}}),t._v("\n           \n          "),t.activityStoreGroupList.length>1?i("el-button",{attrs:{size:"mini",icon:"el-icon-minus",circle:""},on:{click:function(e){return t.doMinusStoreGroupHandel(a)}}}):t._e()],1)])}),0),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"mini"},on:{click:function(e){t.isShow=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isDisabled},on:{click:t.confirmClose}},[t._v("确 定")])],1)]),t._v(" "),i("choose-store",{ref:"chooseStore",on:{confirmChooseStore:t.confirmChooseStore}})],1)},staticRenderFns:[]};var b=i("VU/8")(g,S,!1,function(t){i("pc5v")},"data-v-4839810e",null).exports,w=i("oAV5"),k=i("cpGA"),C=i("bzuE"),_=/^(0|[1-9][0-9]*)$/,x=/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,I="/foundation/qiniu/auth/file",L="/plateform/a/category/getCategoryTree",D="/plateform/a/preSale/goods/listPage",$="/plateform/a/preSale/goods/del",T="/plateform/a/preSale/goods/update",H="/plateform/a/preSale/goods/addGoodsToStore",z={data:function(){return{pageSizes:C.a.pageSizes10,loading:!1,pageNum:1,pageSize:10,total:0,searchContent:{DIFFCITY:!0,regionCode:f.a.get("regionCode")||"",platformId:5,activitySearchVal:"",categoryId:"",categoryIdList:[],goodsInfo:"",activityStatus:"",activityType:"",platformCityGoodsId:"",sfInStock:""},cateDefaultProps:{children:"categoryVoList",label:"categoryName",value:"categoryId"},activityTypeOptions:[{label:"全部",value:""},{label:"拼团",value:11},{label:"秒杀",value:21},{label:"新人专享",value:41},{label:"每日爆款",value:61}],activityStatusOptions:[{label:"全部",value:""},{label:"进行中",value:3},{label:"未发布",value:0},{label:"未开始",value:2},{label:"已结束",value:4},{label:"已终止",value:5}],categoryList:[],tableData:[],checkedList:[],showUpdate:!1,currentIndex:-1,currentFiledName:"",showChangImg:!1,currentRowMsg:{},currentChangeImgIndex:-1,imageUploadLoading:!1,sfInStockOptions:[{label:"全部",value:""},{label:"是",value:!0},{label:"否",value:!1}],saveErrorMsgList:[],saveErrTempConfig:{skuNo:"ERP商品编码",goodsName:"商品名称",storeNo:"门店编码",storeName:"门店名称"}}},created:function(){this.searchContent.activitySearchVal=this.$route.query.id&&"undefined"!==this.$route.query.id?parseInt(this.$route.query.id):"",this.getCategoryId()},mounted:function(){this.doSearchHandel(!0)},components:{"choose-store":y.a,"choose-store-and-date":b,region:m.a},methods:{RegionChange:function(t){this.searchContent.regionCode=t.regionCode,this.doSearchHandel(!0)},getCategoryId:function(){var t=this;this.$http.post(L,{DIFFCITY:!0}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var i=!0,a=!1,o=void 0;try{for(var n,r=v()(e.data);!(i=(n=r.next()).done);i=!0){var s=n.value;s.categoryVoList&&0===s.categoryVoList.length&&(s.categoryVoList=null)}}catch(t){a=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(a)throw o}}t.categoryList=e.data}else t.categoryList=[]}).catch(function(t){console.log("提示(三方平台店内分类):",t.message)})},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},doSearchHandel:function(t){var e=this;this.checkedList=[];var i=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[i],this.loading=!0,!0===t&&(this.pageNum=1),this.$http.post(D,p()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(t){if(e.loading=!1,0!==t.code)throw new Error(t.msg);t.data?(t.data.result&&t.data.result.length?e.tableData=t.data.result:e.tableData=[],e.total=t.data.total):(e.total=0,e.tableData=[])}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示",message:t.message})})},deleteHandel:function(t,e){var i=this,a={DIFFCITY:!0},o=[];if(t){var n={id:e.id,activityType:e.activityType};o.push(n),a.idAndActivityTypeList=o}else o=this.checkedList.map(function(t){return{id:t.id,activityType:t.activityType}}),a.idAndActivityTypeList=o;this.$confirm("您确定要删除所选商品吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$http.post($,p()({},a)).then(function(t){if(0===t.code)return i.$message.success("删除成功"),void i.doSearchHandel();throw new Error(t.msg)}).catch(function(t){i.$notify.error({title:"提示",message:t.message})})}).catch(function(){})},handleSelect:function(t,e){var i={},a=[];if(w.m(e.id,"id",this.checkedList))this.checkedList=w.q("id",e.id,this.checkedList);else{a.push(e);var o=[].concat(a,u()(this.checkedList));this.checkedList=o.reduceRight(function(t,e){return!i[e.id]&&(i[e.id]=t.push(e)),t},[])}},handleSelectAll:function(t){var e={};if(t.length>0){var i=!0,a=!1,o=void 0;try{for(var n,r=v()(t);!(i=(n=r.next()).done);i=!0){var s=n.value;this.checkedList.push(s)}}catch(t){a=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(a)throw o}}this.checkedList=this.checkedList.reduceRight(function(t,i){return!e[i.id]&&(e[i.id]=t.push(i)),t},[])}else{var c=[],l=!0,u=!1,d=void 0;try{for(var p,h=v()(this.tableData);!(l=(p=h.next()).done);l=!0){var m=p.value;c.push(m)}}catch(t){u=!0,d=t}finally{try{!l&&h.return&&h.return()}finally{if(u)throw d}}var f=w.i(this.checkedList,c,"id");this.checkedList=f&&f.length>0?f:[]}},importStore:function(){if(0!==this.checkedList.length){var t=this.checkedList.map(function(t){return t.activityType}),e=c()(new r.a(t)),i=this.checkedList.map(function(t){return t.activityId}),a=c()(new r.a(i));if(a.length>1)this.$notify.warning({title:"温馨提示",message:"请选择同一个活动的商品"});else{var o=this.activityTypeOptions.filter(function(t){return t.value===e[0]})[0],n=this.checkedList.filter(function(t){return t.activityId===a[0]})[0].activityEndDate,s="";if(s=o?o.label:"-",21===e[0]||61===e[0]){var l={title:"批量引入门店 【"+s+"】",platformId:this.searchContent.platformId,regionCode:this.searchContent.regionCode,activityType:e[0],activityEndDate:n};this.$refs.chooseStoreAndDate.setDefault(l)}else{var u={title:"批量引入门店 【"+s+"】",platformId:this.searchContent.platformId,regionCode:this.searchContent.regionCode,activityType:e[0],activityEndDate:n};this.$refs.chooseStore.setDefault(u)}}}else this.$message("请选择商品")},activityStatusFormatter:function(t,e,i,a){return 0===i?"未发布":1==i?"已发布":2==i?"未开始[发布中]":3==i?"进行中[发布中]":4==i?11===t.activityType?"已结束[发布中]":"已结束":5==i?"已终止":6==i?"已失效":void 0},onFocusHandel:function(t,e){var i=this;setTimeout(function(){i.tableData[t][e+"Temp"]=i.tableData[t][e],i.showUpdate=!0,i.currentIndex=t,i.currentFiledName=e},400)},onBlurHandel:function(){var t=this;setTimeout(function(){var e=t.currentIndex,i=t.currentFiledName;t.tableData[e][i]=t.tableData[e][i+"Temp"],t.showUpdate=!1,t.currentIndex=-1,t.currentFiledName=""},400)},sureUpdateHandel:function(t){var e=this,i=(this.currentIndex,this.currentFiledName);if("price"===i){if(!x.test(t[i])||0===parseFloat(t[i]))return void this.$message.warning("原价是大于0，小数保留小数点后2位");if(parseFloat(t[i])<=parseFloat(t.preSalePrice))return void this.$message.warning("原价必须大于活动价")}else if("preSalePrice"===i){if(!x.test(t[i])||0===parseFloat(t[i]))return void this.$message.warning("活动价是大于0，小数保留小数点后2位");if(parseFloat(t[i])>=parseFloat(t.price))return void this.$message.warning("原价必须大于活动价")}else if("platformCurStock"===i){if(!_.test(t[i]))return void this.$message.warning("区域限售库存为大于等于0的正整数")}else if("limitCount"===i){if(t[i]&&0!=t[i]&&!_.test(t[i]))return void this.$message.warning("每人限购为大于等于0的正整数")}else if("sortNum"===i&&!_.test(t[i]))return void this.$message.warning("排序为大于等于0的正整数");t.stock=t.platformCurStock;var a=p()({},t),o={DIFFCITY:!0,idAndActivityTypeList:[{id:a.id,activityType:a.activityType}],updateGoodsData:a};w.r(),this.$http.post(T,p()({},o)).then(function(t){if(w.c(),0===t.code)return e.$message.success("更新成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){w.c(),e.$notify.error({title:"提示",message:t.message})})},confirmHandel:function(t){var e=this,i=t.checkedList.map(function(t){return t.storeNo}),a=this.checkedList.map(function(t){return t.id}),o=this.checkedList[0].activityId,n=t.activityType||"";this.$http.post(H,{ids:a,storeNos:i,activityType:n,activityId:o,DIFFCITY:!0}).then(function(t){if(0===t.code)return e.$refs.chooseStore.closeDialog(),e.$refs.chooseStore.closeDisabled(),e.$message.success("引入门店成功"),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.$refs.chooseStore.closeDisabled(),e.$notify.error({title:"提示",message:t.message})})},mouseEnterImg:function(t,e){4!==e.activityStatus&&5!==e.activityStatus&&!0!==this.imageUploadLoading&&(this.showChangImg=!0,this.currentChangeImgIndex=t,this.currentRowMsg=p()({},e))},mouseLeaveImg:function(){this.showChangImg=!1,this.currentChangeImgIndex=-1},imageUploadReg:function(t){var e=-1!==t.type.indexOf("image/"),i="image/jpeg"===t.type||"image/png",a=t.size<=307200;return e&&i&&a||this.$message.error("商品图片建议上传大小不超过300K的710*420像素的jpg或png图片"),e&&i&&a},getToken:function(){var t=this;return this.$http.post(I,{}).then(function(t){if(0==t.code){var e=t.data.token;return{fileName:t.data.key,token:e}}throw new Error(t.msg)}).catch(function(e){t.imageUploadLoading=!1,t.$notify.error({title:"获取七牛token提示",message:e.message})})},emitUpload:function(t){var e=this;this.imageUploadLoading=!0,w.r(),this.getToken().then(function(i){k.upload(t.file,i.fileName,i.token).subscribe({error:function(){e.imageUploadLoading=!1,w.c()},complete:function(t){var i="http://retailimg01.benlailife.com/"+t.key;e.imageUploadLoading=!1,w.c(),e.currentRowMsg.preSaleImageUrl=i,e.sureUpdateHandel(e.currentRowMsg)},next:function(t){}})})},doBatchInsertHandel:function(t){var e=this,i={DIFFCITY:!0,ids:this.checkedList.map(function(t){return t.id}),activityStoreGroupList:t.reqParams?t.reqParams:[],activityId:this.checkedList[0].activityId,activityType:t.activityType||""};this.$http.post(H,p()({},i)).then(function(t){if(0===t.code)return e.$refs.chooseStoreAndDate.closeDialog(),e.doSearchHandel(),void(t.data&&"object"===o()(t.data)&&t.data.length>0?e.$alert("<div><p>引入门店成功</p><p style='color: red;'>有商品在门店线上不可售</p></div>","温馨提示",{dangerouslyUseHTMLString:!0,showCancelButton:!0,cancelButtonText:"下载明细",showConfirmButton:!0,confirmButtonText:"关闭"}).then(function(){}).catch(function(){e.saveErrorMsgList=t.data,e.downLoadSaveErrorMsg()}):e.$message.success("引入门店成功"));throw new Error(t.msg)}).catch(function(t){e.$refs.chooseStoreAndDate.closeDisabled(),e.$notify.error({title:"提示",message:t.message})})},downLoadSaveErrorMsg:function(){var t=this,e=p()({},this.saveErrTempConfig),i=w.o(e,!1),a=w.o(e,!0);exportSheet.ExportJsonToExcel({header:i,filterVal:a,data:this.saveErrorMsgList,filename:"活动保存失败商品明细"}),setTimeout(function(){t.$notify.success({title:"温馨提示",message:"活动保存失败商品明细下载成功"}),t.isDisabled=!1},500)}}},N={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"search-form-wraper"},[i("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[i("region",{staticClass:"region-wrap",attrs:{refresh:!1},on:{RegionChange:t.RegionChange}}),t._v(" "),i("el-form-item",{attrs:{label:"商品分类"}},[i("el-cascader",{staticClass:"search-input",attrs:{placeholder:"请选择分类",options:t.categoryList,"change-on-select":"",size:"small",clearable:"",filterable:"",props:t.cateDefaultProps},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.categoryIdList,callback:function(e){t.$set(t.searchContent,"categoryIdList",e)},expression:"searchContent.categoryIdList"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"SKU编码/商品名称"}},[i("el-input",{staticClass:"search-input",attrs:{placeholder:"SKU编码/商品名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.goodsInfo,callback:function(e){t.$set(t.searchContent,"goodsInfo","string"==typeof e?e.trim():e)},expression:"searchContent.goodsInfo"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"区域商品ID"}},[i("el-input",{staticClass:"search-input",attrs:{type:"number",placeholder:"区域商品ID",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.platformCityGoodsId,callback:function(e){t.$set(t.searchContent,"platformCityGoodsId","string"==typeof e?e.trim():e)},expression:"searchContent.platformCityGoodsId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"活动ID/名称"}},[i("el-input",{staticClass:"search-input",attrs:{placeholder:"活动ID/名称",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(!0)}},model:{value:t.searchContent.activitySearchVal,callback:function(e){t.$set(t.searchContent,"activitySearchVal","string"==typeof e?e.trim():e)},expression:"searchContent.activitySearchVal"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"活动类型"}},[i("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择活动类型",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.activityType,callback:function(e){t.$set(t.searchContent,"activityType",e)},expression:"searchContent.activityType"}},t._l(t.activityTypeOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"状态"}},[i("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择状态",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.activityStatus,callback:function(e){t.$set(t.searchContent,"activityStatus",e)},expression:"searchContent.activityStatus"}},t._l(t.activityStatusOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"是否顺丰仓现货"}},[i("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择状态",size:"small",clearable:""},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.sfInStock,callback:function(e){t.$set(t.searchContent,"sfInStock",e)},expression:"searchContent.sfInStock"}},t._l(t.sfInStockOptions,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSearchHandel(!0)}}},[t._v("搜索")])],1)],1)],1),t._v(" "),i("div",{staticClass:"table-wraper"},[i("div",{staticClass:"batch-handel-w"},[i("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-edit",disabled:0===t.checkedList.length},on:{click:t.importStore}},[t._v("发布至门店")]),t._v(" "),i("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-delete",disabled:0===t.checkedList.length},on:{click:function(e){return t.deleteHandel(!1,t.checkedList)}}},[t._v("批量删除")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:t.handleSelect,"select-all":t.handleSelectAll}},[i("el-table-column",{attrs:{type:"selection",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{"min-width":"160px",label:"ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"ll-erp-p-no"},[t._v("活动ID: "+t._s(e.row.activityId))]),t._v(" "),i("div",{staticClass:"ll-erp-p-no"},[t._v("活动商品ID: "+t._s(e.row.activityPlatCityGoodsId))]),t._v(" "),i("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"250px",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"p-m-w"},[i("div",{staticClass:"img-w g-m-r"},[e.row.imgUrl&&""!=e.row.imgUrl?i("img",{attrs:{src:e.row.imgUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):i("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),i("div",{staticClass:"p-m-c-r"},[i("div",[t._v(t._s(e.row.goodsName||"-"))]),t._v(" "),i("div",{staticClass:"ll-erp-p-no"},[t._v("商品编码："+t._s(e.row.skuNo||"--"))]),t._v(" "),i("div",{staticClass:"ll-erp-p-no"},[t._v("区域商品ID："+t._s(e.row.platformCityGoodsId||"--"))])])])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"100px",prop:"spec",label:"规格"}}),t._v(" "),i("el-table-column",{attrs:{label:"原价","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"price"===t.currentFiledName&&t.currentIndex===e.$index?i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.price,callback:function(i){t.$set(e.row,"price",i)},expression:"scope.row.price"}})],1),t._v(" "),i("el-button-group",[i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(i){return t.sureUpdateHandel(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(i){return t.onFocusHandel(e.$index,"price")}},model:{value:e.row.price,callback:function(i){t.$set(e.row,"price",i)},expression:"scope.row.price"}})],1)],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"活动价","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"preSalePrice"===t.currentFiledName&&t.currentIndex===e.$index?i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.preSalePrice,callback:function(i){t.$set(e.row,"preSalePrice",i)},expression:"scope.row.preSalePrice"}})],1),t._v(" "),i("el-button-group",[i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(i){return t.sureUpdateHandel(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(i){return t.onFocusHandel(e.$index,"preSalePrice")}},model:{value:e.row.preSalePrice,callback:function(i){t.$set(e.row,"preSalePrice",i)},expression:"scope.row.preSalePrice"}})],1)],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"区域库存","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"platformCurStock"===t.currentFiledName&&t.currentIndex===e.$index?i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.platformCurStock,callback:function(i){t.$set(e.row,"platformCurStock",i)},expression:"scope.row.platformCurStock"}})],1),t._v(" "),i("el-button-group",[i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(i){return t.sureUpdateHandel(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(i){return t.onFocusHandel(e.$index,"platformCurStock")}},model:{value:e.row.platformCurStock,callback:function(i){t.$set(e.row,"platformCurStock",i)},expression:"scope.row.platformCurStock"}})],1)],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"每人限购","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"limitCount"===t.currentFiledName&&t.currentIndex===e.$index?i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.limitCount,callback:function(i){t.$set(e.row,"limitCount",i)},expression:"scope.row.limitCount"}})],1),t._v(" "),i("el-button-group",[i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(i){return t.sureUpdateHandel(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(i){return t.onFocusHandel(e.$index,"limitCount")}},model:{value:e.row.limitCount,callback:function(i){t.$set(e.row,"limitCount",i)},expression:"scope.row.limitCount"}})],1)],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"排序","min-width":"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.showUpdate&&"sortNum"===t.currentFiledName&&t.currentIndex===e.$index?i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini"},on:{blur:t.onBlurHandel},model:{value:e.row.sortNum,callback:function(i){t.$set(e.row,"sortNum",i)},expression:"scope.row.sortNum"}})],1),t._v(" "),i("el-button-group",[i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-check",size:"mini"},on:{click:function(i){return t.sureUpdateHandel(e.row)}}}),t._v(" "),i("el-button",{staticStyle:{width:"25px"},attrs:{icon:"el-icon-close",size:"mini"},on:{click:t.onBlurHandel}})],1)],1):i("div",{staticClass:"stock-num"},[i("el-button-group",[i("el-input",{staticStyle:{width:"80px"},attrs:{size:"mini",disabled:4===e.row.activityStatus||5===e.row.activityStatus},on:{focus:function(i){return t.onFocusHandel(e.$index,"sortNum")}},model:{value:e.row.sortNum,callback:function(i){t.$set(e.row,"sortNum",i)},expression:"scope.row.sortNum"}})],1)],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"90px",label:"顺丰仓现货"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.sfInStock?"是":"否"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"90px",prop:"activityTypeName",label:"活动类型"}}),t._v(" "),i("el-table-column",{attrs:{"min-width":"120px",prop:"activityName",label:"活动名称"}}),t._v(" "),i("el-table-column",{attrs:{"min-width":"210px",label:"活动时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.activityStartDate&&e.row.activityEndDate?i("div",{staticClass:"date-wrap-inline"},[i("div",[i("p",[t._v(t._s(e.row.activityStartDate.substr(0,10)))]),t._v(" "),i("p",[t._v(t._s(e.row.activityStartDate.substr(11,8)))])]),t._v(" "),i("div",[t._v(" - ")]),t._v(" "),i("div",[i("p",[t._v(t._s(e.row.activityEndDate.substr(0,10)))]),t._v(" "),i("p",[t._v(t._s(e.row.activityEndDate.substr(11,8)))])])]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"120px",prop:"activityStatus",label:"活动状态",formatter:t.activityStatusFormatter}}),t._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(i){return t.deleteHandel(!0,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.total>0?i("el-pagination",{staticClass:"tc mt20",attrs:{background:"","current-page":t.pageNum,"page-sizes":t.pageSizes,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}}):t._e()],1),t._v(" "),i("choose-store",{ref:"chooseStore",on:{confirmHandel:t.confirmHandel}}),t._v(" "),i("choose-store-and-date",{ref:"chooseStoreAndDate",on:{doBatchInsertHandel:t.doBatchInsertHandel}})],1)},staticRenderFns:[]};var F=i("VU/8")(z,N,!1,function(t){i("YcA9")},null,null);e.default=F.exports},pc5v:function(t,e){}});
//# sourceMappingURL=29.deb9cc08e436c1017269.js.map
webpackJsonp([25],{"3Nbf":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Gu7T"),i=a.n(n),s=a("BO1k"),r=a.n(s),o=a("Dd8w"),l=a.n(o),c=a("NYxO"),h=a("FzCZ"),m=a("oAV5"),d=a("ssT3"),u={props:{handelType:{type:String,value:""},cityOptions:{type:Array,value:[]},storeOptionsProps:{type:Array,value:[]},isDisabled:{type:Boolean,value:!1},visible:{type:Boolean,value:!1}},data:function(){return{title:"",checkedList:[],cityId:d.a.get("cityId"),changeBelongStoreNo:""}},methods:{setDefauleMsg:function(e){this.title=e.title,this.checkedList=e.checkedList},cityChange:function(e){this.changeBelongStoreNo="",this.$emit("cityChange",e)},closeHandel:function(){this.$emit("closeHandel",!1)},doConfirmHandel:function(){var e=this.checkedList.map(function(e){return e.id});if("1"===this.handelType){if(!this.cityId)return void this.$message("请选择城市");if(!this.changeBelongStoreNo)return void this.$message("请选择门店");var t={changeBelongStoreNo:this.changeBelongStoreNo,memberIdList:e};this.$emit("changeStore",t)}else if("2"===this.handelType){var a={clearInfo:this.checkedList.map(function(e){return{curAmount:e.storeAmount,memberId:e.id}})};this.$emit("clearAmount",a)}else if("3"===this.handelType){var n={clearInfo:this.checkedList.map(function(e){return{curAmount:e.point,memberId:e.id}})};this.$emit("clearPoint",n)}}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.title,visible:e.visible,width:"550px","before-close":e.closeHandel},on:{"update:visible":function(t){e.visible=t}}},["1"===e.handelType?a("el-form",{attrs:{"label-width":"120px","label-position":"right"}},[a("el-form-item",{attrs:{label:"选择城市"}},[a("el-select",{staticClass:"search-date-picker",attrs:{filterable:"",placeholder:"请选择城市",size:"small"},on:{change:e.cityChange},model:{value:e.cityId,callback:function(t){e.cityId=t},expression:"cityId"}},e._l(e.cityOptions,function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityId}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"选择门店"}},[a("el-select",{staticClass:"search-date-picker",attrs:{filterable:"",placeholder:"选择门店",clearable:"",size:"small"},model:{value:e.changeBelongStoreNo,callback:function(t){e.changeBelongStoreNo=t},expression:"changeBelongStoreNo"}},e._l(e.storeOptionsProps,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1):e._e(),e._v(" "),"2"===e.handelType||"3"===e.handelType?a("el-table",{staticClass:"fixed-height",attrs:{data:e.checkedList,"empty-text":"没有查询到您想要的数据","max-height":"320",size:"small"}},[a("el-table-column",{attrs:{"min-width":"80px",prop:"id",label:"会员编码"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"phone",label:"会员手机号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100px",prop:"name",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"storeName",label:"注册门店"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"80px",prop:"point",label:"当前积分"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"storeAmount",label:"当前余额"}})],1):e._e(),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:e.closeHandel}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.isDisabled},on:{click:e.doConfirmHandel}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var f=a("VU/8")(u,p,!1,function(e){a("JH3Y")},null,null).exports,v="/plateform/a/store/condition/search",b="/plateform/a/mall/reportForm/member/search",g="/plateform/a/mall/reportForm/member/export",y="/member/a/shop/mem/operation/change/store",C="/member/a/shop/mem/operation/clear/OLPoint",k="/member/a/shop/mem/operation/clear/OLDeposit",x={data:function(){return{keyStr:this.$route.path,exportLoading:!1,loading:!1,pageNum:1,pageSize:20,total:0,searchContent:{registerStartDate:null,registerEndDate:null,phone:null,storeNo:null,minSaleAmount:null,maxSaleAmount:null,id:null,maxPoint:null,minPoint:null},storeOptions:[],tableData:[],exportConfig:{id:"会员编码",inviteMemberId:"邀请人会员编码",phone:"会员手机号",name:"姓名",birthdayDate:"生日",sexStr:"性别",storeName:"注册门店",vestStoreName:"归属门店",address:"会员地址",registerDate:"注册时间",firstSaleTime:"首次消费时间",firstSaleStoreName:"首次消费门店",saleAmount:"累计消费金额",saleTimes:"客单量",saleTimesPrice:"平均客单价",storeAmount:"当前余额",point:"当前积分",totalStoreAmount:"累计充值金额",totalPoint:"累计积分",tagName:"标签"},checkedList:[],handelType:"",storeOptionsProps:[],isDisabled:!1,visible:!1}},created:function(){this.getStoreList(),this.getStoreListForProps(d.a.get("cityId"))},mounted:function(){this.doSearchHandel(!0)},computed:l()({showClearAmountBtn:function(){return this.permissionMap[this.keyStr]&&this.permissionMap[this.keyStr].includes("清除余额")},showClearPointBtn:function(){return this.permissionMap[this.keyStr]&&this.permissionMap[this.keyStr].includes("清除积分")},showChangeStoreBtn:function(){return this.permissionMap[this.keyStr]&&this.permissionMap[this.keyStr].includes("修改归属门店")}},Object(c.b)("common",{permissionMap:"getPermissionMap",cityOptions:"getCityOptions"})),components:{"btn-handle":f},methods:{emptyFormater:function(e,t,a){return a||"-"},sexFormater:function(e,t,a){return 0===a?"未知":1===a?"男":2===a?"女":void 0},getStoreList:function(){var e=this;this.$http.post(v).then(function(t){if(0!==t.code)throw new Error(t.msg);if(t.data&&t.data.length){var a=[],n=!0,i=!1,s=void 0;try{for(var o,l=r()(t.data);!(n=(o=l.next()).done);n=!0){var c=o.value,h={value:c.storeNo,label:c.storeNo+"-"+c.storeName};a.push(h)}}catch(e){i=!0,s=e}finally{try{!n&&l.return&&l.return()}finally{if(i)throw s}}a.unshift({value:null,label:"全部"}),e.storeOptions=a}}).catch(function(e){console.log("提示(获取门店列表):",e.message)})},changeSize:function(e){this.pageSize=e,this.doSearchHandel()},changeCurrent:function(e){this.pageNum=e,this.doSearchHandel()},doSearchHandel:function(e){var t=this;this.checkedList=[],this.loading=!0,!0===e&&(this.pageNum=1),this.$http.post(b,l()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(e){if(t.loading=!1,0!==e.code)throw new Error(e.msg);if(e.data&&e.data.result&&e.data.result.length){var a=e.data.result.map(function(e,t){return e.saleAmount&&e.saleTimes?e.saleTimesPrice=100*parseFloat(e.saleAmount)/parseFloat(e.saleTimes)/100:e.saleTimesPrice=0,e});t.tableData=a}else t.tableData=[];t.total=e.data.total}).catch(function(e){t.loading=!1,t.$notify.error({title:"提示(会员基础数据):",message:e.message})})},exportData:function(){var e=this;this.exportLoading=!0,this.$http.post(g,l()({},this.searchContent)).then(function(t){if(e.exportLoading=!1,0!==t.code)throw new Error(t.msg);if(t.data&&t.data.result&&t.data.result.length){var a=t.data.result.map(function(e,t){return e.saleAmount&&e.saleTimes?e.saleTimesPrice=100*parseFloat(e.saleAmount)/parseFloat(e.saleTimes)/100:e.saleTimesPrice=0,0===e.sex?e.sexStr="未知":1===e.sex?e.sexStr="男":2===e.sex&&(e.sexStr="女"),e});h.a.exportFileByConfig(a,"会员基础数据.xlsx",e.exportConfig),setTimeout(function(){e.$message.success("导出成功")},500)}else e.$notify.warning({title:"温馨提示",message:"没有查询到要导出的数据"})}).catch(function(t){e.exportLoading=!1,e.$notify.error({title:"提示(导出数据)：",message:t.message})})},handleSelect:function(e,t){var a={},n=[];if(m.m(t.id,"id",this.checkedList))this.checkedList=m.q("id",t.id,this.checkedList);else{n.push(t);var s=[].concat(n,i()(this.checkedList));this.checkedList=s.reduceRight(function(e,t){return!a[t.id]&&(a[t.id]=e.push(t)),e},[])}},handleSelectAll:function(e){var t={};if(e.length>0){var a=!0,n=!1,i=void 0;try{for(var s,o=r()(e);!(a=(s=o.next()).done);a=!0){var l=s.value;this.checkedList.push(l)}}catch(e){n=!0,i=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw i}}this.checkedList=this.checkedList.reduceRight(function(e,a){return!t[a.id]&&(t[a.id]=e.push(a)),e},[])}else{var c=[],h=!0,d=!1,u=void 0;try{for(var p,f=r()(this.tableData);!(h=(p=f.next()).done);h=!0){var v=p.value;c.push(v)}}catch(e){d=!0,u=e}finally{try{!h&&f.return&&f.return()}finally{if(d)throw u}}var b=m.i(this.checkedList,c,"id");this.checkedList=b&&b.length>0?b:[]}},getStoreListForProps:function(e){var t=this;this.$http.post(v,{DIFFCITY:!0,cityId:e}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=[],n=!0,i=!1,s=void 0;try{for(var o,l=r()(e.data);!(n=(o=l.next()).done);n=!0){var c=o.value,h={value:c.storeNo,label:c.storeNo+"-"+c.storeName};a.push(h)}}catch(e){i=!0,s=e}finally{try{!n&&l.return&&l.return()}finally{if(i)throw s}}t.storeOptionsProps=a}}).catch(function(e){console.log("提示(获取门店列表):",e.message)})},doChangeUserStoreHandel:function(){this.handelType="1",this.visible=!0;var e={title:"修改归属门店",checkedList:this.checkedList};this.$refs.btnHandel.setDefauleMsg(e)},changeStoreConfirm:function(e){var t=this;this.isDisabled=!0;var a=e.changeBelongStoreNo,n=e.memberIdList;this.$http.post(y,{changeBelongStoreNo:a,memberIdList:n}).then(function(e){if(setTimeout(function(){t.isDisabled=!1},800),0===e.code)return t.visible=!1,t.$message.success("修改归属门店成功"),t.doSearchHandel(),void(t.checkedList=[]);throw new Error(e.msg)}).catch(function(e){setTimeout(function(){t.isDisabled=!1},800),t.$notify.error({title:"提示",message:e.message})})},doClearAmountHandel:function(){this.handelType="2",this.visible=!0;var e={title:"确定清除以下客户的余额吗？",checkedList:this.checkedList};this.$refs.btnHandel.setDefauleMsg(e)},clearAmountConfirm:function(e){var t=this;this.isDisabled=!0;var a=e.clearInfo;this.$http.post(k,{clearInfo:a}).then(function(e){if(setTimeout(function(){t.isDisabled=!1},800),0===e.code)return t.visible=!1,t.$message.success("清除余额成功"),t.doSearchHandel(),void(t.checkedList=[]);throw new Error(e.msg)}).catch(function(e){setTimeout(function(){t.isDisabled=!1},800),t.$notify.error({title:"提示",message:e.message})})},doClearPointHandel:function(){this.handelType="3",this.visible=!0;var e={title:"确定清除以下客户的积分吗？",checkedList:this.checkedList};this.$refs.btnHandel.setDefauleMsg(e)},clearPointConfirm:function(e){var t=this;this.isDisabled=!0;var a=e.clearInfo;this.$http.post(C,{clearInfo:a}).then(function(e){if(setTimeout(function(){t.isDisabled=!1},800),0===e.code)return t.visible=!1,t.$message.success("清除积分成功"),t.doSearchHandel(),void(t.checkedList=[]);throw new Error(e.msg)}).catch(function(e){setTimeout(function(){t.isDisabled=!1},800),t.$notify.error({title:"提示",message:e.message})})},closeHandel:function(){this.visible=!1}}},S={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:e.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"注册开始时间"}},[a("el-date-picker",{staticClass:"search-input",attrs:{type:"datetime",placeholder:"注册开始时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",size:"small"},on:{change:function(t){return e.doSearchHandel(!0)}},model:{value:e.searchContent.registerStartDate,callback:function(t){e.$set(e.searchContent,"registerStartDate",t)},expression:"searchContent.registerStartDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"注册结束时间"}},[a("el-date-picker",{staticClass:"search-input",attrs:{type:"datetime",placeholder:"注册结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",size:"small"},on:{change:function(t){return e.doSearchHandel(!0)}},model:{value:e.searchContent.registerEndDate,callback:function(t){e.$set(e.searchContent,"registerEndDate",t)},expression:"searchContent.registerEndDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"会员手机号"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"会员手机号",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(!0)}},model:{value:e.searchContent.phone,callback:function(t){e.$set(e.searchContent,"phone","string"==typeof t?t.trim():t)},expression:"searchContent.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"注册门店"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择注册门店",clearable:"",size:"small"},on:{change:function(t){return e.doSearchHandel(!0)}},model:{value:e.searchContent.storeNo,callback:function(t){e.$set(e.searchContent,"storeNo",t)},expression:"searchContent.storeNo"}},e._l(e.storeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"会员编码"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"会员编码",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(!0)}},model:{value:e.searchContent.id,callback:function(t){e.$set(e.searchContent,"id","string"==typeof t?t.trim():t)},expression:"searchContent.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"当前积分（大于）"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"当前积分",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(!0)}},model:{value:e.searchContent.minPoint,callback:function(t){e.$set(e.searchContent,"minPoint","string"==typeof t?t.trim():t)},expression:"searchContent.minPoint"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"当前积分（小于）"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"当前积分",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(!0)}},model:{value:e.searchContent.maxPoint,callback:function(t){e.$set(e.searchContent,"maxPoint","string"==typeof t?t.trim():t)},expression:"searchContent.maxPoint"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.doSearchHandel(!0)}}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{size:"mini",loading:e.exportLoading},on:{click:e.exportData}},[e._v("导出")])],1)],1)],1),e._v(" "),a("div",{staticClass:"table-wraper"},[e.showChangeStoreBtn||e.showClearAmountBtn||e.showClearPointBtn?a("div",{staticClass:"sp-handel-w"},[e.showChangeStoreBtn?a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",disabled:0===this.checkedList.length,icon:"el-icon-sort"},on:{click:e.doChangeUserStoreHandel}},[e._v("修改归属门店")]):e._e(),e._v(" "),e.showClearAmountBtn?a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",disabled:0===this.checkedList.length,icon:"el-icon-circle-close"},on:{click:e.doClearAmountHandel}},[e._v("清除余额")]):e._e(),e._v(" "),e.showClearPointBtn?a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",disabled:0===this.checkedList.length,icon:"el-icon-circle-close"},on:{click:e.doClearPointHandel}},[e._v("清除积分")]):e._e()],1):e._e(),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:e.tableData,"empty-text":"没有查询到您想要的数据",size:"small"},on:{select:e.handleSelect,"select-all":e.handleSelectAll}},[e.showChangeStoreBtn||e.showClearAmountBtn||e.showClearPointBtn?a("el-table-column",{attrs:{type:"selection",label:"全选",align:"center",width:"50"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{"min-width":"80px",prop:"id",label:"会员编码"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"130px",prop:"inviteMemberId",label:"邀请人会员编码",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"phone",label:"会员手机号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100px",prop:"name",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110px",prop:"birthdayDate",label:"生日",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"70px",prop:"sex",label:"性别",formatter:e.sexFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"storeName",label:"注册门店",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"vestStoreName",label:"归属门店",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"130px",prop:"address",label:"会员地址",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"160px",prop:"registerDate",label:"注册时间",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"160px",prop:"firstSaleTime",label:"首次消费时间",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"firstSaleStoreName",label:"首次消费门店",formatter:e.emptyFormater}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90px",prop:"storeAmount",label:"当前余额"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"80px",prop:"point",label:"当前积分"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110px",prop:"totalStoreAmount",label:"累计充值金额"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"80px",prop:"totalPoint",label:"累计积分"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150px",prop:"tagName",label:"标签",formatter:e.emptyFormater}})],1),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.tableData.length>0,expression:"tableData.length>0"}],staticClass:"tc mt20",attrs:{background:"","current-page":e.pageNum,"page-sizes":[20,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.changeSize,"current-change":e.changeCurrent,"update:currentPage":function(t){e.pageNum=t},"update:current-page":function(t){e.pageNum=t}}})],1),e._v(" "),a("btn-handle",{ref:"btnHandel",attrs:{handelType:e.handelType,cityOptions:e.cityOptions,storeOptionsProps:e.storeOptionsProps,isDisabled:e.isDisabled,visible:e.visible},on:{cityChange:e.getStoreListForProps,changeStore:e.changeStoreConfirm,closeHandel:e.closeHandel,clearAmount:e.clearAmountConfirm,clearPoint:e.clearPointConfirm}})],1)},staticRenderFns:[]};var w=a("VU/8")(x,S,!1,function(e){a("aeCn")},null,null);t.default=w.exports},JH3Y:function(e,t){},aeCn:function(e,t){}});
//# sourceMappingURL=25.101cb6ae667cdb433eb6.js.map
webpackJsonp([126],{GzlG:function(t,e){},hCT0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Dd8w"),o=a.n(n),s=a("BO1k"),r=a.n(s),l="/plateform/a/category/getCategoryTree",i="/plateform/a/store/condition/search",c="/plateform/a/product/getPlatformList",u="/plateform/a/category/getCategorySyncList",d="/plateform/a/category/getSyncStatus",h="/plateform/a/category/syncCategory",p={data:function(){return{loading:!1,pageNum:1,pageSize:20,total:0,searchContent:{platformId:"",storeNo:"",syncStatus:"",categoryIdList:[],categoryId:""},storeOptions:[],platformIdOptions:[],categoryList:[],syncStatusOptions:[],tableData:[],cateDefaultProps:{children:"categoryVoList",label:"categoryName",value:"categoryId"},publishLoading:!1}},created:function(){},mounted:function(){this.getStoreList(),this.getOrderOrigion(),this.getCategoryId(),this.getSyncStatus(),this.doSearchHandel(!0)},methods:{getStoreList:function(){var t=this;this.$http.post(i).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=[],n=!0,o=!1,s=void 0;try{for(var l,i=r()(e.data);!(n=(l=i.next()).done);n=!0){var c=l.value,u={value:c.storeNo,label:c.storeNo+"-"+c.storeName};a.push(u)}}catch(t){o=!0,s=t}finally{try{!n&&i.return&&i.return()}finally{if(o)throw s}}t.storeOptions=a}}).catch(function(t){console.log("提示(获取门店列表):",t.message)})},getOrderOrigion:function(){var t=this;this.$http.get(c).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){e.data.unshift({name:"全部",platformId:""}),t.platformIdOptions=e.data}}).catch(function(t){console.log("提示(手动补单-获取平台列表):",t.message)})},getCategoryId:function(){var t=this;this.$http.post(l).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=!0,n=!1,o=void 0;try{for(var s,l=r()(e.data);!(a=(s=l.next()).done);a=!0){var i=s.value;i.categoryVoList&&0===i.categoryVoList.length&&(i.categoryVoList=null)}}catch(t){n=!0,o=t}finally{try{!a&&l.return&&l.return()}finally{if(n)throw o}}t.categoryList=e.data}else t.categoryList=[]}).catch(function(t){console.log("提示(三方平台店内分类):",t.message)})},getSyncStatus:function(){var t=this;this.$http.post(d).then(function(e){if(0!==e.code)throw new Error(e.msg);e.data&&e.data.length&&(t.syncStatusOptions=e.data)}).catch(function(t){console.log("提示(获取分类同步状态枚举):",t.message)})},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.pageNum=t,this.doSearchHandel()},doSearchHandel:function(t){var e=this,a=this.searchContent.categoryIdList.length-1;this.searchContent.categoryId=this.searchContent.categoryIdList[a],this.loading=!0,!0===t&&(this.pageNum=1),this.$http.post(u,o()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(t){if(e.loading=!1,0===t.code)return t.data&&t.data.result&&t.data.result.length?e.tableData=t.data.result:e.tableData=[],void(e.total=t.data.total);throw new Error(t.msg)}).catch(function(t){e.loading=!1,e.$notify.error({title:"提示",message:t.message})})},doPublishHandel:function(){var t=this;this.$confirm("您确定要执行一键同步操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.publishLoading=!0,t.$http.post(h).then(function(e){if(t.publishLoading=!1,0!==e.code)throw new Error(e.msg);t.$message.success("一键同步成功")}).catch(function(e){t.publishLoading=!1,t.$notify.error({title:"提示",message:e.message})})}).catch(function(){})}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:t.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"平台"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择平台",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.platformId,callback:function(e){t.$set(t.searchContent,"platformId",e)},expression:"searchContent.platformId"}},t._l(t.platformIdOptions,function(t){return a("el-option",{key:t.platformId,attrs:{label:t.name,value:t.platformId}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"门店"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择门店",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.storeNo,callback:function(e){t.$set(t.searchContent,"storeNo",e)},expression:"searchContent.storeNo"}},t._l(t.storeOptions,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"分类"}},[a("el-cascader",{staticClass:"search-input",attrs:{placeholder:"请选择分类",options:t.categoryList,"change-on-select":"",size:"small",clearable:"",filterable:"",props:t.cateDefaultProps},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.categoryIdList,callback:function(e){t.$set(t.searchContent,"categoryIdList",e)},expression:"searchContent.categoryIdList"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"同步状态"}},[a("el-select",{staticClass:"search-input",attrs:{filterable:"",placeholder:"请选择同步状态",clearable:"",size:"small"},on:{change:function(e){return t.doSearchHandel(!0)}},model:{value:t.searchContent.syncStatus,callback:function(e){t.$set(t.searchContent,"syncStatus",e)},expression:"searchContent.syncStatus"}},t._l(t.syncStatusOptions,function(t){return a("el-option",{key:t.syncStatus,attrs:{label:t.desc,value:t.syncStatus}})}),1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSearchHandel(!0)}}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",{staticClass:"table-wraper"},[a("div",{staticClass:"sp-handel-w"},[a("el-button",{staticClass:"sup-mini",attrs:{size:"mini",icon:"el-icon-upload",loading:t.publishLoading},on:{click:t.doPublishHandel}},[t._v("一键同步")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据",size:"small"}},[a("el-table-column",{attrs:{"min-width":"180px",label:"门店信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.platformId?a("div",[t._v("\n            "+t._s(e.row.platformName)+"（所有门店）\n          ")]):a("div",[t._v("\n            "+t._s(e.row.storeNo)+" - "+t._s(e.row.platformName)+"（"+t._s(e.row.storeName)+"）\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"categoryName",label:"分类"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100px",prop:"platformName",label:"三方平台"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",label:"同步状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{class:2===e.row.syncStatus||5===e.row.syncStatu||8===e.row.syncStatu?"status-err-wrap":""},[t._v("\n            "+t._s(e.row.syncStatusName)+"\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",label:"失败原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[2===e.row.syncStatus||5===e.row.syncStatus||8===e.row.syncStatus?a("div",[t._v("\n            "+t._s(e.row.syncStatusDesc)+"\n          ")]):t._e()]}}])})],1),t._v(" "),t.tableData.length>0?a("el-pagination",{staticClass:"tc mt20",attrs:{background:"","current-page":t.pageNum,"page-sizes":[20,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.pageNum=e},"update:current-page":function(e){t.pageNum=e}}}):t._e()],1)])},staticRenderFns:[]};var f=a("VU/8")(p,g,!1,function(t){a("GzlG")},null,null);e.default=f.exports}});
//# sourceMappingURL=126.0ca5f22e6b1cac51fb32.js.map
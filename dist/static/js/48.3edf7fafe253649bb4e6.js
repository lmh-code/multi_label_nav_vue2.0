webpackJsonp([48],{"9U1s":function(e,t){},ePbP:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),n=a.n(i),s=a("32kd"),o=a("ylbZ"),r=a("ssT3"),d=a("bzuE"),l={passwordReg:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d`~!@#$%^&*()_+-=,.?]{8,20}$/,phoneReg:/^1[3|4|5|6|7|8|9][0-9]{9}$/,numReg:/^\d+$/,salePriceReg:/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/},c=a("OVbB"),u={data:function(){var e=this;return{idDisabled:!1,loading:!1,pageNum:1,pageSize:20,pageSizes:d.a.pageSizes20,total:0,searchContent:{DIFFCITY:!0,regionCode:r.a.get("regionCode")||""},tableData:[],visible:!1,addParamMsg:{id:"",regionCode:r.a.get("regionCode")||"",discount:""},discount:"",rules:{discountReg:[{required:!0,validator:function(t,a,i){if(!e.addParamMsg.discount)return i(new Error("请输入折扣"));l.salePriceReg.test(e.addParamMsg.discount)?i():i(new Error("折扣限制只可输入数字，最多可输入2位小数"))},trigger:"blur"}]}}},components:{Region:o.a,"region-city-store":s.a},mounted:function(){this.doSearchHandel(!0)},methods:{StoreGroupChange:function(e){this.searchContent.regionCode=e.regionCode,this.doSearchHandel(!0)},changeSize:function(e){this.pageSize=e,this.doSearchHandel()},changeCurrent:function(e){this.pageNum=e,this.doSearchHandel()},showAddDialog:function(){this.visible=!0,this.addParamMsg.regionCode=r.a.get("regionCode")||"",this.addParamMsg.discount="",this.addParamMsg.id=""},doSearchHandel:function(e){var t=this;this.loading=!0,!0===e&&(this.pageNum=1),this.$http.post(c.a.selectRegionDiscountList,n()({},this.searchContent,{pageNum:this.pageNum,pageSize:this.pageSize})).then(function(e){if(t.loading=!1,0===e.code)return t.tableData=e.data&&e.data.result&&e.data.result.length?e.data.result:[],void(t.total=e.data.total);throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$notify.error({title:"提示",message:e.message})})},editItem:function(e){this.visible=!0,this.addParamMsg.discount=e.discount,this.addParamMsg.id=e.id,this.addParamMsg.regionCode=e.regionCode||""},deleteItem:function(e){var t=this;this.$confirm("您确定要执行删除操作吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.post(c.a.deleteRegionDiscount,{id:e.id,DIFFCITY:!0}).then(function(e){if(0===e.code)return t.$message.success("删除成功"),void t.doSearchHandel();throw new Error(e.msg)}).catch(function(e){t.$notify.error({title:"提示",message:e.message})})}).catch(function(){})},doSetDisHandel:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.idDisabled=!0;var a=t.addParamMsg.id?c.a.editRegionDiscount:c.a.addRegionDiscount;t.$http.post(a,n()({DIFFCITY:t.searchContent.DIFFCITY},t.addParamMsg)).then(function(e){if(t.idDisabled=!1,0===e.code)return t.$message.success("保存成功"),t.visible=!1,void t.doSearchHandel(!0);throw new Error(e.msg)}).catch(function(e){t.idDisabled=!1,t.$notify.error({title:"提示",message:e.message})})})}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"handel-search-wraper"},[a("div",{staticClass:"handel-wraper"},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.showAddDialog}},[e._v("添加")])],1),e._v(" "),a("hr",{staticClass:"s-slip"}),e._v(" "),a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:e.searchContent,"label-position":"top"}},[a("region-city-store",{attrs:{label:"选择区域",className:"search-input",showCity:!1,showGroup:!1,showStore:!1},on:{StoreGroupChange:e.StoreGroupChange}}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.doSearchHandel(!0)}}},[e._v("搜索")])],1)],1)],1)]),e._v(" "),a("div",{staticClass:"table-wraper"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:e.tableData,"empty-text":"没有查询到您想要的数据",size:"small"}},[a("el-table-column",{attrs:{label:"区域","min-width":"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v("\n            "+e._s(t.row.regionCode)+"-"+e._s(t.row.regionName)+"\n          ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"discount",label:"折扣","min-width":"120px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间","min-width":"170px"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建人","min-width":"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v("\n            "+e._s(t.row.createUserId)+"-"+e._s(t.row.createUserName)+"\n          ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.editItem(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return e.deleteItem(t.row)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),e.total>0?a("el-pagination",{staticClass:"tc mt20",attrs:{background:"","current-page":e.pageNum,"page-sizes":e.pageSizes,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.changeSize,"current-change":e.changeCurrent,"update:currentPage":function(t){e.pageNum=t},"update:current-page":function(t){e.pageNum=t}}}):e._e()],1),e._v(" "),a("el-dialog",{attrs:{title:"添加",visible:e.visible,"close-on-click-modal":!1,"close-on-press-escape":!1,width:"440px"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"ruleForm",attrs:{"label-width":"100px",rules:e.rules,model:e.addParamMsg}},[e.visible?a("region",{attrs:{label:"选择区域",className:"search-input",refresh:!1,required:"",disabled:""}}):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"折扣",prop:"discountReg"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入折扣",size:"small",clearable:""},model:{value:e.addParamMsg.discount,callback:function(t){e.$set(e.addParamMsg,"discount","string"==typeof t?t.trim():t)},expression:"addParamMsg.discount"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.idDisabled,loading:e.idDisabled},on:{click:function(t){return e.doSetDisHandel("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var h=a("VU/8")(u,g,!1,function(e){a("9U1s")},"data-v-c48eddbc",null);t.default=h.exports}});
//# sourceMappingURL=48.3edf7fafe253649bb4e6.js.map
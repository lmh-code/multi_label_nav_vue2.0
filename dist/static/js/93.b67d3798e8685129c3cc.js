webpackJsonp([93],{"3efN":function(e,t){},jVdd:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),n=a("ssT3"),o=a("u4Bf"),r=a.n(o),l=a("oAV5"),d="/plateform/a/group/list",u="/plateform/a/group/add",c="/plateform/a/group/sort",p="/plateform/a/group/update",v="/plateform/a/group/del",m="/plateform/a/group/updateStatus",h={data:function(){return{loading:!1,isDisabled:!1,isDisabledAdd:!1,isDisabledEdit:!1,canMove:!1,addGroupDialogVisible:!1,editGroupDialogVisible:!1,deleteGroupDialogVisible:!1,activeName:"abled",currentPage:1,pageSize:20,total:0,searchContent:{name:"",status:""},abledTableData:[],disabledTableData:[],addGroupContent:{name:""},editGroupContent:{name:"",id:""},deleteGroupContent:{id:"",isDeleted:""}}},mounted:function(){this.doSearchHandel(!0)},components:{draggable:r.a},methods:{changeSize:function(e){this.pageSize=e,this.doSearchHandel()},changeCurrent:function(e){this.doSearchHandel(e,"changeCurrent")},doSearchHandel:function(e,t){var a=this;this.loading=!0,this.currentPage="changeCurrent"==t?e:1,this.searchContent.status=0,this.$http.post(d,s()({},this.searchContent,{pageNum:1,pageSize:400})).then(function(e){if(a.loading=!1,0!==e.code)throw new Error(e.msg);e.data&&e.data.list&&e.data.list.length?(e.data.list.forEach(function(e,t){e.index=t+1}),a.abledTableData=e.data.list,a.addGroupContent.name=""):a.abledTableData=[]}).catch(function(e){a.loading=!1,a.$notify.error({title:"提示",message:e.message})}),this.searchContent.status=1,this.$http.post(d,s()({},this.searchContent,{pageNum:this.currentPage,pageSize:this.pageSize})).then(function(e){if(a.loading=!1,0===e.code)return e.data&&e.data.list&&e.data.list.length?(e.data.list.forEach(function(e,t){e.index=(a.currentPage-1)*a.pageSize+t+1}),a.disabledTableData=e.data.list):a.disabledTableData=[],void(a.total=e.data.total);throw new Error(e.msg)}).catch(function(e){console.log("提示(获取禁用分组列表):",e.message)})},doSortOnceHandel:function(){0!=this.abledTableData.length&&(this.canMove=!0)},doSaveSortHandel:function(){var e=this;if(!0!==this.isDisabled){var t=[];this.abledTableData.forEach(function(e,a){var i={id:e.id,level:a+1};t.push(i)}),this.isDisabled=!0,l.r(),this.$http.post(c,{groupLevelList:t}).then(function(t){var a=e;if(setTimeout(function(){a.isDisabled=!1},800),l.c(),0===t.code)return e.$message.success("重新排序成功"),e.canMove=!1,void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){var a=e;setTimeout(function(){a.isDisabled=!1},800),l.c(),e.$notify.error({title:"提示",message:t.message})})}},addGroup:function(){this.addGroupDialogVisible=!0},sureAddGroup:function(){var e=this;""!=this.addGroupContent.name?this.addGroupContent.name.length>4?this.$message("分组名称限制4位"):(this.isDisabledAdd=!0,this.$http.post(u,s()({},this.addGroupContent)).then(function(t){if(0===t.code)return e.addGroupDialogVisible=!1,e.isDisabledAdd=!1,e.$message({message:"添加分组成功",type:"success"}),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.isDisabledAdd=!1,e.$notify.error({title:"提示",message:t.message})})):this.$message("分组名称不能为空")},editGroup:function(e){this.editGroupContent.name=e.name,this.editGroupContent.id=e.id,this.editGroupDialogVisible=!0},sureEditGroup:function(){var e=this;""!=this.editGroupContent.name?this.editGroupContent.name.length>4?this.$message("分组名称限制4位"):(this.isDisabledEdit=!0,this.$http.post(p,s()({},this.editGroupContent)).then(function(t){if(0===t.code)return e.editGroupDialogVisible=!1,e.isDisabledEdit=!1,e.$message({message:"编辑分组成功",type:"success"}),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.isDisabledEdit=!1,e.$notify.error({title:"提示",message:t.message})})):this.$message("分组名称不能为空")},deleteGroup:function(e){this.deleteGroupContent.isDeleted=1,this.deleteGroupContent.id=e.id,this.deleteGroupDialogVisible=!0},sureDeleteGroup:function(){var e=this;this.$http.post(v,s()({},this.deleteGroupContent)).then(function(t){if(0===t.code)return e.deleteGroupDialogVisible=!1,e.$message({message:"删除分组成功",type:"success"}),void e.doSearchHandel();throw new Error(t.msg)}).catch(function(t){e.$notify.error({title:"提示",message:t.message})})},disabledGroup:function(e,t){var a=this,i=void 0;i="true"==t?{id:e.id,status:0}:{id:e.id,status:1},this.$http.post(m,s()({},i)).then(function(e){if(0===e.code)return"true"==t?a.$message({message:"开启分组成功",type:"success"}):a.$message({message:"禁用分组成功",type:"success"}),void a.doSearchHandel();throw new Error(e.msg)}).catch(function(e){a.$notify.error({title:"提示",message:e.message})})},mgGroupProducts:function(e){var t=n.a.get("cityName");n.a.set("groupProductsCityName",t),n.a.set("groupProducts",e),this.$router.push("/group_mgt/mg_groupProducts")}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"handel-search-wraper"},[a("div",{staticClass:"handel-wraper"},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.addGroup}},[e._v("新增分组")])],1),e._v(" "),a("hr",{staticClass:"s-slip"}),e._v(" "),a("div",{staticClass:"search-form-wraper"},[a("el-form",{attrs:{model:e.searchContent,"label-position":"top"}},[a("el-form-item",{attrs:{label:"分组名称"}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入名称关键字",size:"small",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.doSearchHandel(t)}},model:{value:e.searchContent.name,callback:function(t){e.$set(e.searchContent,"name","string"==typeof t?t.trim():t)},expression:"searchContent.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.doSearchHandel}},[e._v("搜索")])],1),e._v(" "),"abled"!=e.activeName||e.canMove?"abled"==e.activeName?a("el-button",{staticStyle:{float:"right","margin-top":"26px"},attrs:{type:"primary",disabled:e.isDisabled,size:"mini"},on:{click:e.doSaveSortHandel}},[e._v("保存排序")]):e._e():a("el-button",{staticStyle:{float:"right","margin-top":"26px"},attrs:{type:"primary",size:"mini"},on:{click:e.doSortOnceHandel}},[e._v("编辑排序")])],1)],1)]),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"tab-wraper table-wraper"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"abled"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("启用 "+e._s(this.abledTableData.length))])]),e._v(" "),a("el-tab-pane",{attrs:{name:"disabled"}},[a("span",{attrs:{slot:"label"},slot:"label"},[e._v("禁用 "+e._s(this.total))])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"abled"==e.activeName,expression:"activeName == 'abled'"}],staticStyle:{"background-color":"#fff"}},[a("div",{staticClass:"group-draggable-header group-draggable-width"},[a("div",[e._v("序号")]),e._v(" "),a("div",[e._v("名称")]),e._v(" "),a("div",[e._v("修改时间")]),e._v(" "),a("div",[e._v("状态")]),e._v(" "),a("div",[e._v("操作")]),e._v(" "),e.canMove?a("div"):e._e()]),e._v(" "),e.canMove?a("draggable",{model:{value:e.abledTableData,callback:function(t){e.abledTableData=t},expression:"abledTableData"}},[a("transition-group",e._l(e.abledTableData,function(t,i){return a("div",{key:t.index,staticClass:"group-draggable-td group-draggable-width"},[a("div",[e._v(e._s(t.index))]),e._v(" "),a("div",[e._v(e._s(t.name))]),e._v(" "),a("div",[e._v(e._s(t.updateTime))]),e._v(" "),a("div",[e._v(e._s(t.statusName))]),e._v(" "),a("div",[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.editGroup(t)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.deleteGroup(t)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.disabledGroup(t)}}},[e._v("禁用")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.mgGroupProducts(t)}}},[e._v("管理商品")])],1),e._v(" "),e.canMove?a("div",{staticClass:"group-mgt-move"},[a("img",{attrs:{src:"/shop/static/imgs/move.png",alt:""}}),e._v(" "),a("span",[e._v("按住拖拽")])]):e._e()])}),0)],1):e._l(e.abledTableData,function(t,i){return a("div",{key:t.index,staticClass:"group-draggable-td group-draggable-width"},[a("div",[e._v(e._s(t.index))]),e._v(" "),a("div",[e._v(e._s(t.name))]),e._v(" "),a("div",[e._v(e._s(t.updateTime))]),e._v(" "),a("div",[e._v(e._s(t.statusName))]),e._v(" "),a("div",[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.editGroup(t)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.deleteGroup(t)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.disabledGroup(t)}}},[e._v("禁用")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.mgGroupProducts(t)}}},[e._v("管理商品")])],1),e._v(" "),e.canMove?a("div"):e._e()])}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.abledTableData.length<=0,expression:"abledTableData.length <= 0"}],staticClass:"no-data-wrap"},[e._v("没有查询到您想要的数据")])],2),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"disabled"==e.activeName,expression:"activeName == 'disabled'"}],staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:e.disabledTableData,"empty-text":"没有查询到您想要的数据",size:"small"}},[a("el-table-column",{attrs:{"min-width":"60",prop:"index",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"160",prop:"updateTime",label:"修改时间"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"80",prop:"statusName",label:"状态"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"340",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.editGroup(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.deleteGroup(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.disabledGroup(t.row,"true")}}},[e._v("开启")]),e._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.mgGroupProducts(t.row)}}},[e._v("管理商品")])]}}])})],1),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:"disabled"==e.activeName&&e.disabledTableData.length>0,expression:"activeName == 'disabled' && disabledTableData.length>0"}],staticClass:"tc mt20",attrs:{background:"","current-page":e.currentPage,"page-sizes":[20,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.changeSize,"current-change":e.changeCurrent,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"新增分组",visible:e.addGroupDialogVisible,width:"360px"},on:{"update:visible":function(t){e.addGroupDialogVisible=t}}},[a("el-form",{attrs:{model:e.addGroupContent,"label-width":"90px","label-position":"right"}},[a("el-form-item",{attrs:{label:"分组名称",required:""}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入分组名称",size:"small",clearable:""},model:{value:e.addGroupContent.name,callback:function(t){e.$set(e.addGroupContent,"name","string"==typeof t?t.trim():t)},expression:"addGroupContent.name"}}),e._v(" "),a("div",{staticStyle:{"line-height":"18px"}},[e._v("分组名称限制4个字")])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.addGroupDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.isDisabledAdd},on:{click:e.sureAddGroup}},[e._v("保 存")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑分组",visible:e.editGroupDialogVisible,width:"360px"},on:{"update:visible":function(t){e.editGroupDialogVisible=t}}},[a("el-form",{attrs:{model:e.editGroupContent,"label-width":"90px","label-position":"right"}},[a("el-form-item",{attrs:{label:"分组名称",required:""}},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入分组名称",size:"small",clearable:""},model:{value:e.editGroupContent.name,callback:function(t){e.$set(e.editGroupContent,"name","string"==typeof t?t.trim():t)},expression:"editGroupContent.name"}}),e._v(" "),a("div",{staticStyle:{"line-height":"18px"}},[e._v("分组名称限制4个字")])],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.editGroupDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini",disabled:e.isDisabledEdit},on:{click:e.sureEditGroup}},[e._v("保 存")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"删除分组",visible:e.deleteGroupDialogVisible,width:"360px"},on:{"update:visible":function(t){e.deleteGroupDialogVisible=t}}},[a("span",[e._v("您确定要删除所选分组吗？")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.deleteGroupDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.sureDeleteGroup}},[e._v("确 认")])],1)])],1)},staticRenderFns:[]};var b=a("VU/8")(h,g,!1,function(e){a("3efN")},null,null);t.default=b.exports}});
//# sourceMappingURL=93.b67d3798e8685129c3cc.js.map
webpackJsonp([17],{"B27/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("//Fk"),i=a.n(n),r=a("Dd8w"),s=a.n(r),o=a("ssT3"),l=a("o9i3"),c=(a("oAV5"),a("cpGA")),d="/foundation/qiniu/auth/file",u="/plateform/a/banner/list",p="/plateform/a/banner/update",h="/plateform/a/mall/groupProduct/getPreProduct",g={data:function(){return{loading:!1,saveLoading:!1,isDisabled:!1,imageUploadLoading:!1,isShowProductList:!1,statusBannerDialogVisible:!1,product:{},transitionList:[{value:0,label:"商品详情"},{value:1,label:"静态展示不跳转"}],editBanner:{id:"",productNo:"",presaleId:"",name:"",url:"",status:"",type:""},canStatus:!0}},created:function(){},mounted:function(){var t=o.a.get("bannerMeg");this.editBanner.type=t.type,0!=this.editBanner.type?this.editBanner.productNo="":(this.editBanner.productNo=t.productNo,this.getProduct()),this.editBanner.name=t.name,this.editBanner.url=t.url,this.editBanner.status=t.statusName,this.editBanner.id=t.id},components:{"choose-product":l.a},methods:{doSearchHandel:function(){var t=this;this.$http.post(u,{status:0}).then(function(e){if(t.loading=!1,0!==e.code)throw new Error(e.msg);if(e.data&&e.data.list&&e.data.list.length){var a=e.data.list;t.canStatus=a.length<6,a.forEach(function(e,a){t.editBanner.id==e.id&&(t.canStatus=!0)})}else t.canStatus=!0}).catch(function(t){console.log("提示(获取启用banner):",t.message)})},getProduct:function(){var t=this;this.$http.post(h,{productNo:this.editBanner.productNo}).then(function(e){if(t.loading=!1,0===e.code)return e.data&&e.data.result&&e.data.result.length?t.product=e.data.result[0]:(t.product={},t.editBanner.productNo=""),void(1==t.currentPage&&(t.total=e.data.total));throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$notify.error({title:"提示",message:e.message})})},chooseProduct:function(){this.isShowProductList=!0;var t=this;setTimeout(function(){t.$refs.ProductListDialog.setDefault()},200)},doSaveHandel:function(t){var e=this;""!=this.editBanner.name?this.editBanner.name.length>20?this.$message("展示名称限制长度不超过20"):""!=this.editBanner.url?""!==this.editBanner.type?0!=this.editBanner.type||""!=this.editBanner.productNo?""!=this.editBanner.status?"启用"!=this.editBanner.status||0!=this.canStatus?("启用"==this.editBanner.status?this.editBanner.status=0:"禁用"==this.editBanner.status&&(this.editBanner.status=1),this.loading=!0,this.isDisabled=!0,this.$http.post(p,s()({},this.editBanner)).then(function(t){if(e.loading=!1,e.isDisabled=!1,0===t.code)return e.$message({message:"编辑Banner成功",type:"success"}),void e.$router.push("/banner_mgt?status="+e.editBanner.status);throw new Error(t.msg)}).catch(function(t){e.loading=!1,e.isDisabled=!1,0==e.editBanner.status?e.editBanner.status="启用":1==e.editBanner.status&&(e.editBanner.status="禁用"),e.$notify.error({title:"提示",message:t.message})})):this.statusBannerDialogVisible=!0:this.$message("请选择启用状态"):this.$message("请选择商品"):this.$message("请选择跳转类型"):this.$message("请添加Banner图片"):this.$message("请输入展示名称")},doCancelHandel:function(){this.$router.push("/banner_mgt")},imageUploadReg:function(t){var e=this,a=-1!==t.type.indexOf("image/"),n="image/jpeg"===t.type;a||this.$message.error("Banner图片文件必须是图片格式!"),n||this.$message.error("Banner图片只能是JPG格式!");var r=new i.a(function(e,a){var n=window.URL||window.webkitURL,i=new Image;i.onload=function(){750==i.width&&280==i.height?e():a()},i.src=n.createObjectURL(t)}).then(function(){return t},function(){return e.$message.error("请上传750*280像素的JPG图片!"),i.a.reject()});return a&&n&&r},emitUpload:function(t){var e=this;this.imageUploadLoading=!0,this.getToken().then(function(a){c.upload(t.file,a.fileName,a.token).subscribe({error:function(){e.imageUploadLoading=!1},complete:function(t){var a="http://retailimg01.benlailife.com/"+t.key;e.editBanner.url=a,e.imageUploadLoading=!1},next:function(t){}})})},getToken:function(){var t=this;return this.$http.post(d,{}).then(function(t){if(0==t.code){var e=t.data.token;return{fileName:t.data.key,token:e}}throw new Error(t.msg)}).catch(function(e){t.imageUploadLoading=!1,t.$notify.error({title:"提示",message:e.message})})},closeDialog:function(t){this.isShowProductList=t.isShowGoods,t.chooseProduct&&(this.product=t.chooseProduct,this.editBanner.productNo=this.product.productNo,this.editBanner.presaleId=this.product.presaleId)}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"add-form-wraper"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"form",attrs:{model:t.editBanner,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"名称",required:""}},[a("el-input",{staticClass:"add-input",attrs:{size:"small",placeholder:"请输入Banner名称"},model:{value:t.editBanner.name,callback:function(e){t.$set(t.editBanner,"name",e)},expression:"editBanner.name"}}),t._v(" "),a("span",[t._v("请输入展示名称，长度不超过20个字")])],1),t._v(" "),a("el-form-item",{staticClass:"banner-uploader",attrs:{label:"Banner图片",required:""}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","show-file-list":!1,"before-upload":t.imageUploadReg,"http-request":t.emitUpload}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.imageUploadLoading,expression:"imageUploadLoading"}]},[t.editBanner.url?a("img",{staticClass:"avatar",attrs:{src:t.editBanner.url}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])]),t._v(" "),a("div",{staticClass:"tip-txt-w"},[a("span",[t._v("请上传750*280像素的JPG图片，大小不能超过2M")])])],1),t._v(" "),a("el-form-item",{attrs:{label:"跳转类型",required:""}},[a("el-select",{staticClass:"add-input",attrs:{size:"small",placeholder:"请选择跳转类型"},model:{value:t.editBanner.type,callback:function(e){t.$set(t.editBanner,"type",e)},expression:"editBanner.type"}},t._l(t.transitionList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0==t.editBanner.type,expression:"editBanner.type == 0"}],attrs:{label:"选择商品",required:""}},[a("p",{directives:[{name:"show",rawName:"v-show",value:t.product.productName,expression:"product.productName"}],staticStyle:{display:"inline-block"}},[t._v(t._s(t.product.productName)+"  "+t._s(t.product.spec)+"  ")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.chooseProduct}},[t._v("选择")])],1),t._v(" "),a("el-form-item",{attrs:{label:"启用状态",required:""}},[a("el-radio-group",{attrs:{size:"small"},model:{value:t.editBanner.status,callback:function(e){t.$set(t.editBanner,"status",e)},expression:"editBanner.status"}},[a("el-radio-button",{attrs:{label:"启用"}}),t._v(" "),a("el-radio-button",{attrs:{label:"禁用"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small",disabled:t.isDisabled},on:{click:t.doSaveHandel}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.doCancelHandel}},[t._v("取消")])],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"选择商品",visible:t.isShowProductList,width:"700px"},on:{"update:visible":function(e){t.isShowProductList=e}}},[a("choose-product",{ref:"ProductListDialog",on:{closeDialog:t.closeDialog}})],1),t._v(" "),a("el-dialog",{attrs:{title:"启用失败",visible:t.statusBannerDialogVisible,width:"360px"},on:{"update:visible":function(e){t.statusBannerDialogVisible=e}}},[a("span",[t._v("已经超过Banner的启用数量，限制6个")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.statusBannerDialogVisible=!1}}},[t._v("确 认")])],1)])],1)},staticRenderFns:[]};var f=a("VU/8")(g,m,!1,function(t){a("R0uP")},null,null);e.default=f.exports},R0uP:function(t,e){},YwTt:function(t,e){},o9i3:function(t,e,a){"use strict";var n=a("Dd8w"),i=a.n(n),r=(a("ssT3"),a("oAV5"),"/plateform/a/category/getCategoryTree"),s="/plateform/a/mall/groupProduct/getPreProduct",o={data:function(){return{loading:!1,currentPage:1,pageSize:10,total:0,categoriesList:[],searchContent:{categoryCode:"",productNo:"",productName:""},tableData:[],categoriesSelectList:[]}},watch:{categoriesSelectList:function(t,e){this.searchContent.categoryCode=t,this.doSearchHandel()}},created:function(){this.getCategoriesList()},mounted:function(){},components:{},methods:{setDefault:function(t){this.doSearchHandel()},timeFormatter:function(t,e,a){return t.preStartDate&&t.preEndDate&&t.preStartTime&&t.preEndTime?t.preStartDate+"-"+t.preEndDate+" "+t.preStartTime+"-"+t.preEndTime:""},getCategoriesList:function(){var t=this;this.$http.post(r).then(function(e){if(0!==e.code)throw new Error(e.msg);e.data&&e.data.length?t.categoriesList=e.data.map(function(t){var e=t.categoryName,a=t.categoryId;return t.categoryVoList&&t.categoryVoList.length?{label:e,value:a,children:t.categoryVoList.map(function(t){return{label:t.categoryName,value:t.categoryId}})}:{label:e,value:a}}):t.categoriesList=[]}).catch(function(t){console.log("提示(获取分类列表):",t.message)})},changeSize:function(t){this.pageSize=t,this.doSearchHandel()},changeCurrent:function(t){this.currentPage=t,this.doSearchHandel()},doSearchHandel:function(){var t=this;this.loading=!0,this.$http.post(s,i()({},this.searchContent,{pageNum:this.currentPage,pageSize:this.pageSize,queryCode:null,queryType:null})).then(function(e){if(t.loading=!1,0===e.code)return e.data&&e.data.result&&e.data.result.length?t.tableData=e.data.result:t.tableData=[],void(1==t.currentPage&&(t.total=e.data.total));throw new Error(e.msg)}).catch(function(e){t.loading=!1,t.$notify.error({title:"提示",message:e.message})})},chooseProduct:function(t){var e={isShowGoods:!1,chooseProduct:t};this.$emit("closeDialog",e)}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入商品ERP编码",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(e)}},model:{value:t.searchContent.productNo,callback:function(e){t.$set(t.searchContent,"productNo","string"==typeof e?e.trim():e)},expression:"searchContent.productNo"}}),t._v(" "),a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入名称关键字",size:"small",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doSearchHandel(e)}},model:{value:t.searchContent.productName,callback:function(e){t.$set(t.searchContent,"productName","string"==typeof e?e.trim():e)},expression:"searchContent.productName"}}),t._v(" "),a("el-cascader",{staticClass:"search-input",attrs:{"expand-trigger":"click",options:t.categoriesList,placeholder:"请选择分类","change-on-select":"",size:"small",clearable:""},model:{value:t.categoriesSelectList,callback:function(e){t.categoriesSelectList=e},expression:"categoriesSelectList"}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.doSearchHandel}},[t._v("搜索")])],1),t._v(" "),a("el-row",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"tableRef",staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:t.tableData,"empty-text":"没有查询到您想要的数据","max-height":"320",size:"small"}},[a("el-table-column",{attrs:{"min-width":"210",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"ll-p-m-w"},[a("div",{staticClass:"ll-img-w"},[e.row.productImg&&""!=e.row.productImg?a("img",{attrs:{src:e.row.productImg,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):a("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),a("div",{staticClass:"ll-p-m-c-r"},[a("div",[t._v(t._s(e.row.productName))]),t._v(" "),a("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo||"--"))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"65",prop:"presalePrice",label:"预售价"}}),t._v(" "),a("el-table-column",{attrs:{width:"185",label:"预售时间",formatter:t.timeFormatter}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"80",prop:"productStatusStr",label:"有效状态"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"75",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.chooseProduct(e.row)}}},[t._v("选择")])]}}])})],1),t._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.tableData.length>0,expression:"tableData.length>0"}],staticClass:"tc mt20",staticStyle:{"margin-bottom":"10px"},attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100,150,200],layout:"total, sizes, prev, pager, next, jumper","pager-count":5,total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,l,!1,function(t){a("YwTt")},null,null);e.a=c.exports}});
//# sourceMappingURL=17.5256a420b8e8da758582.js.map
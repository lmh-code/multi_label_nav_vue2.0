webpackJsonp([72],{"ZD+P":function(t,e){},l7cM:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),a=s.n(i),o=s("Dd8w"),r=s.n(o),n=s("BO1k"),l=s.n(n),c=(s("oAV5"),s("ssT3")),d=s("ylbZ"),m=s("hR2Z"),h=s("yi9+"),v=s("tV3t"),u=s("9y6z"),f="/plateform/a/activityRule/addDiscount",p={data:function(){return{pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},isDisabled:!1,addParamMesg:{DIFFCITY:!0,platformId:5,regionCode:c.a.get("regionCode")||"",activityType:"",activityTypeName:"",shopType:"",shopTypeName:"",isMember:1,activityName:"",activityStartDate:"",activityEndDate:"",activityCode:"",activityStoreList:[],platCityGoodsInfos:[]},activityStoresCheckedList:[],activityGoodsCheckedList:[],offlineStoresCheckedList:[],offlineGoodsCheckedList:[],setItemDiscountMsg:{},setDisDialogShow:!1}},created:function(){var t=this.$route.params.activityType,e=this.$route.params.shopType;11==t?(this.addParamMesg.activityType=t,this.addParamMesg.activityTypeName="拼团"):21==t?(this.addParamMesg.activityType=t,this.addParamMesg.activityTypeName="秒杀"):31==t&&(this.addParamMesg.activityType=t,this.addParamMesg.activityTypeName="包装折扣"),1==e?(this.addParamMesg.shopType=e,this.addParamMesg.shopTypeName="商城"):2==e&&(this.addParamMesg.shopType=e,this.addParamMesg.shopTypeName="门店")},components:{region:d.a,"choose-store":m.a,"choose-goods":h.a,"choose-offline-store":v.a,"choose-offline-goods":u.a},methods:{doSaveHandel:function(){var t=this,e=/^[1-9]*[1-9][0-9]*$/;if(this.addParamMesg.activityName)if(this.addParamMesg.activityName.length>30)this.$message("活动名称限制30个汉字");else if(this.addParamMesg.activityStartDate)if(this.addParamMesg.activityEndDate){var s=Date.parse(new Date(this.addParamMesg.activityStartDate)),i=Date.parse(new Date(this.addParamMesg.activityEndDate));if(s<(new Date).getTime())this.$message("活动开始时间不能早于当前时间");else if(s>i)this.$message("活动结束时间不能早于开始时间");else{if(this.addParamMesg.activityStoreList=[],this.addParamMesg.platCityGoodsInfos=[],1==this.addParamMesg.shopType){if(this.activityStoresCheckedList&&this.activityStoresCheckedList.length){var a=!0,o=!1,n=void 0;try{for(var c,d=l()(this.activityStoresCheckedList);!(a=(c=d.next()).done);a=!0){var m=c.value;this.addParamMesg.activityStoreList.push(m.erpStoreNo)}}catch(t){o=!0,n=t}finally{try{!a&&d.return&&d.return()}finally{if(o)throw n}}}if(this.activityGoodsCheckedList&&this.activityGoodsCheckedList.length){var h=!0,v=!1,u=void 0;try{for(var p,y=l()(this.activityGoodsCheckedList);!(h=(p=y.next()).done);h=!0){var g=p.value;if(g.limitGoodsCount&&!e.test(g.limitGoodsCount))return void this.$message("("+g.goodsName+")的限购次数为大于零的正整数");if(!g.curStock)return void this.$message("请输入("+g.goodsName+")的活动库存");if(!e.test(g.curStock))return void this.$message("("+g.goodsName+")的活动库存为大于零的正整数");if(!g.activityDiscounts||!g.activityDiscounts.length)return void this.$message("请设置("+g.goodsName+")的活动规则");var _=!0,C=!1,k=void 0;try{for(var S,M=l()(g.activityDiscounts);!(_=(S=M.next()).done);_=!0){var D=S.value;if(!D.qty||!D.amount)return void this.$message("请设置("+g.goodsName+")的活动规则")}}catch(t){C=!0,k=t}finally{try{!_&&M.return&&M.return()}finally{if(C)throw k}}var b={activityStartTime:this.addParamMesg.activityStartDate.split(" ")[1],activityEndTime:this.addParamMesg.activityEndDate.split(" ")[1],activityDiscounts:g.activityDiscounts,activityGoodsName:g.goodsName,curStock:g.curStock,platformCityGoodsId:g.platformCityGoodsId,sortNum:"",activityStartDate:this.addParamMesg.activityStartDate,activityEndDate:this.addParamMesg.activityEndDate,categoryCode:g.categoryId,categoryName:g.categoryName,goodsNo:g.goodsNo,limitGoodsCount:g.limitGoodsCount,platformCityGoodsName:g.goodsName,spec:g.spec};this.addParamMesg.platCityGoodsInfos.push(b)}}catch(t){v=!0,u=t}finally{try{!h&&y.return&&y.return()}finally{if(v)throw u}}}}else{if(this.offlineStoresCheckedList&&this.offlineStoresCheckedList.length){var w=!0,P=!1,L=void 0;try{for(var N,G=l()(this.offlineStoresCheckedList);!(w=(N=G.next()).done);w=!0){var T=N.value;this.addParamMesg.activityStoreList.push(T.storeNo)}}catch(t){P=!0,L=t}finally{try{!w&&G.return&&G.return()}finally{if(P)throw L}}}if(this.offlineGoodsCheckedList&&this.offlineGoodsCheckedList.length){var x=!0,$=!1,I=void 0;try{for(var O,z=l()(this.offlineGoodsCheckedList);!(x=(O=z.next()).done);x=!0){var q=O.value;if(q.limitGoodsCount&&!e.test(q.limitGoodsCount))return void this.$message("("+q.name+")的限购次数为大于零的正整数");if(!q.curStock)return void this.$message("请输入("+q.name+")的活动库存");if(!e.test(q.curStock))return void this.$message("("+q.name+")的活动库存为大于零的正整数");if(!q.activityDiscounts||!q.activityDiscounts.length)return void this.$message("请设置("+q.name+")的活动规则");var E=!0,H=!1,F=void 0;try{for(var U,R=l()(q.activityDiscounts);!(E=(U=R.next()).done);E=!0){var J=U.value;if(!J.qty||!J.amount)return void this.$message("请设置("+q.name+")的活动规则")}}catch(t){H=!0,F=t}finally{try{!E&&R.return&&R.return()}finally{if(H)throw F}}var Z={activityStartTime:this.addParamMesg.activityStartDate.split(" ")[1],activityEndTime:this.addParamMesg.activityEndDate.split(" ")[1],activityDiscounts:q.activityDiscounts,activityGoodsName:q.name,curStock:q.curStock,platformCityGoodsId:q.id,sortNum:"",activityStartDate:this.addParamMesg.activityStartDate,activityEndDate:this.addParamMesg.activityEndDate,categoryCode:q.categoryNo,categoryName:q.categoryNoName,goodsNo:q.goodsNo,limitGoodsCount:q.limitGoodsCount,platformCityGoodsName:q.name,spec:q.spec};this.addParamMesg.platCityGoodsInfos.push(Z)}}catch(t){$=!0,I=t}finally{try{!x&&z.return&&z.return()}finally{if($)throw I}}}}0!==this.addParamMesg.activityStoreList.length?0!==this.addParamMesg.platCityGoodsInfos.length?(this.isDisabled=!0,this.$http.post(f,r()({},this.addParamMesg)).then(function(e){if(setTimeout(function(){t.isDisabled=!1},800),0===e.code)return t.$message.success("保存成功"),void t.$router.push("/store_act");throw new Error(e.msg)}).catch(function(e){t.isDisabled=!1,t.$notify.error({title:"提示",message:e.message})})):this.$message("请选择参与商品"):this.$message("请选择参与门店")}}else this.$message("请输入活动结束时间");else this.$message("请输入活动开始时间");else this.$message("请输入活动名称")},doCancelHandel:function(){var t=this;this.$confirm("确定取消吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$router.push("/store_act")}).catch(function(){})},chooseStoreOpen:function(){var t={title:"选择门店",platformId:this.addParamMesg.platformId,regionCode:this.addParamMesg.regionCode,checkedList:this.activityStoresCheckedList};this.$refs.chooseStore.setDefault(t)},chooseGoodsOpen:function(){if(!this.activityStoresCheckedList||this.activityStoresCheckedList.length<=0)this.$message.warning("请先选择参与门店");else{var t=this.activityStoresCheckedList.map(function(t,e,s){return t.erpStoreNo}),e={title:"选择商品",regionCode:this.addParamMesg.regionCode,checkedList:this.activityGoodsCheckedList,storeNos:t};this.$refs.chooseGoods.setDefault(e)}},confirmChooseStore:function(t){var e=[];e=t.checkedList&&t.checkedList.length?t.checkedList:[],this.activityStoresCheckedList=e},confirmChooseGoods:function(t){var e=[];e=t.checkedList&&t.checkedList.length?t.checkedList:[],this.activityGoodsCheckedList=e},deleteStoreItem:function(t,e){var s=e;if(1==s){var i=t.erpStoreNo;this.activityStoresCheckedList=this.activityStoresCheckedList.filter(function(t){return t.erpStoreNo!==i})}else if(2==s){var a=t.storeNo;this.offlineStoresCheckedList=this.offlineStoresCheckedList.filter(function(t){return t.storeNo!==a})}},deleteGoodsItem:function(t,e){var s=e;if(1==s){var i=t.platformCityGoodsId;this.activityGoodsCheckedList=this.activityGoodsCheckedList.filter(function(t){return t.platformCityGoodsId!==i})}else if(2==s){var a=t.goodsNo;this.offlineGoodsCheckedList=this.offlineGoodsCheckedList.filter(function(t){return t.goodsNo!==a})}},chooseOfflineStoreOpen:function(){var t={title:"选择门店",chooseStoreTOF:!0,checkedList:this.offlineStoresCheckedList};this.$refs.chooseOfflineStore.setDefault(t,"noExclude")},chooseOfflineGoodsOpen:function(t){var e={title:"选择门店商品",checkedList:this.offlineGoodsCheckedList};this.$refs.chooseOfflineGoods.setDefault(e,!1,"noExclude")},confirmChooseOfflineGoods:function(t){t.checkedList&&t.checkedList.length?this.offlineGoodsCheckedList=t.checkedList:this.offlineGoodsCheckedList=[]},confirmChooseOfflineStore:function(t){t.checkedList&&t.checkedList.length?this.offlineStoresCheckedList=t.checkedList:this.offlineStoresCheckedList=[]},setDiscount:function(t){if(!t.activityDiscounts||0===t.activityDiscounts.length){t.activityDiscounts=[],t.activityDiscounts.push({amount:"",qty:""})}this.setItemDiscountMsg=JSON.parse(a()(t)),this.setDisDialogShow=!0},addDisItems:function(t){var e=this.setItemDiscountMsg;e.activityDiscounts.push({amount:"",qty:""}),this.setItemDiscountMsg=JSON.parse(a()(e))},removeDisItems:function(t){var e=this.setItemDiscountMsg;e.activityDiscounts.splice(t,1),this.setItemDiscountMsg=JSON.parse(a()(e))},doSetDisSaveHandel:function(t){var e=/^[1-9]*[1-9][0-9]*$/,s=/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,i=t,a=this.setItemDiscountMsg.activityDiscounts,o=!0,r=!1,n=void 0;try{for(var c,d=l()(a);!(o=(c=d.next()).done);o=!0){var m=c.value;if(!m.amount||!m.qty)return void this.$message.warning("请输入活动规则中的份数和金额");if(!e.test(m.qty))return void this.$message.warning("活动规则中份数为大于0的正整数");if(!s.test(m.amount))return void this.$message.warning("活动规则中金额为大于0，小数保留小数点后2位");var h=(100*parseFloat(m.amount)/parseInt(m.qty)/100).toString().split(".");if(h[1]&&h[1].length>2)return void this.$message.warning("该商品的价格无法被数量除尽，请重新填写。")}}catch(t){r=!0,n=t}finally{try{!o&&d.return&&d.return()}finally{if(r)throw n}}for(var v=0;v<a.length;v++)for(var u=0;u<a.length;u++)if(v!=u){if(parseFloat(a[v].qty)===parseFloat(a[u].qty))return void this.$message.warning("同一商品活动规则不允许件数相同");if(parseFloat(a[v].amount)===parseFloat(a[u].amount))return void this.$message.warning("同一商品活动规则不允许价格相同")}var f=this.addParamMesg.shopType;if(1==f){var p=!0,y=!1,g=void 0;try{for(var _,C=l()(this.activityGoodsCheckedList);!(p=(_=C.next()).done);p=!0){var k=_.value;k.goodsNo===i&&(k.activityDiscounts=this.setItemDiscountMsg.activityDiscounts)}}catch(t){y=!0,g=t}finally{try{!p&&C.return&&C.return()}finally{if(y)throw g}}}else if(2==f){var S=!0,M=!1,D=void 0;try{for(var b,w=l()(this.offlineGoodsCheckedList);!(S=(b=w.next()).done);S=!0){var P=b.value;P.goodsNo===i&&(P.activityDiscounts=this.setItemDiscountMsg.activityDiscounts)}}catch(t){M=!0,D=t}finally{try{!S&&w.return&&w.return()}finally{if(M)throw D}}}this.setDisDialogShow=!1}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"add-form-wraper"},[s("el-form",{ref:"form",attrs:{model:t.addParamMesg,"label-width":"140px"}},[s("el-form-item",{attrs:{label:"活动类型",required:""}},[s("p",{staticStyle:{color:"#222","font-size":"16px","font-weight":"bold"}},[t._v(t._s(t.addParamMesg.activityTypeName))])]),t._v(" "),s("region",{staticClass:"region-wrap",attrs:{className:"add-input",label:"选择区域",required:!0}}),t._v(" "),s("el-form-item",{attrs:{label:"活动名称",required:""}},[s("el-input",{staticClass:"add-input",attrs:{size:"small",placeholder:"请输入活动名称",clearable:""},model:{value:t.addParamMesg.activityName,callback:function(e){t.$set(t.addParamMesg,"activityName",e)},expression:"addParamMesg.activityName"}}),t._v(" "),s("span",[t._v("活动名称,限制30个汉字")])],1),t._v(" "),s("el-form-item",{attrs:{label:"开始时间",required:""}},[s("el-date-picker",{staticClass:"add-input",attrs:{type:"datetime",placeholder:"请选择活动开始时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",size:"small","picker-options":t.pickerOptions},model:{value:t.addParamMesg.activityStartDate,callback:function(e){t.$set(t.addParamMesg,"activityStartDate",e)},expression:"addParamMesg.activityStartDate"}}),t._v(" "),s("span",[t._v("活动开始时间")])],1),t._v(" "),s("el-form-item",{attrs:{label:"结束时间",required:""}},[s("el-date-picker",{staticClass:"add-input",attrs:{type:"datetime",placeholder:"请选择活动结束时间",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",size:"small","picker-options":t.pickerOptions},model:{value:t.addParamMesg.activityEndDate,callback:function(e){t.$set(t.addParamMesg,"activityEndDate",e)},expression:"addParamMesg.activityEndDate"}}),t._v(" "),s("span",[t._v("活动结束时间")])],1),t._v(" "),2==t.addParamMesg.shopType?s("el-form-item",{attrs:{label:"参加活动人",required:""}},[s("el-radio-group",{model:{value:t.addParamMesg.isMember,callback:function(e){t.$set(t.addParamMesg,"isMember",e)},expression:"addParamMesg.isMember"}},[s("el-radio",{attrs:{label:1}},[t._v("会员")]),t._v(" "),s("el-radio",{attrs:{label:2}},[t._v("非会员")]),t._v(" "),s("el-radio",{attrs:{label:0}},[t._v("全部")])],1)],1):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"参与门店",required:""}},[1==t.addParamMesg.shopType?s("el-button",{attrs:{size:"small",icon:"el-icon-plus"},on:{click:t.chooseStoreOpen}},[t._v("选择门店")]):t._e(),t._v(" "),1==t.addParamMesg.shopType&&t.activityStoresCheckedList.length>0?s("div",{staticClass:"store-check-wraper"},[s("el-table",{staticClass:"fixed-height",attrs:{data:t.activityStoresCheckedList,"max-height":"300",size:"small"}},[s("el-table-column",{attrs:{"min-width":"220px",label:"门店编码/名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v("\n                  "+t._s(e.row.erpStoreNo)+"_"+t._s(e.row.erpStoreName)+"\n                ")])]}}],null,!1,3945522565)}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80",prop:"cityName",label:"城市"}}),t._v(" "),s("el-table-column",{attrs:{"min-width":"80",prop:"saleTypeName",label:"门店类型"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(s){return t.deleteStoreItem(e.row,t.addParamMesg.shopType)}}},[t._v("删除")])]}}],null,!1,3550260604)})],1)],1):t._e(),t._v(" "),2==t.addParamMesg.shopType?s("el-button",{attrs:{size:"small",icon:"el-icon-plus"},on:{click:t.chooseOfflineStoreOpen}},[t._v("选择门店")]):t._e(),t._v(" "),2==t.addParamMesg.shopType&&t.offlineStoresCheckedList.length>0?s("div",{staticClass:"store-check-wraper"},[s("el-table",{staticClass:"fixed-height",attrs:{data:t.activityStoresCheckedList,"max-height":"300",size:"small"}},[s("el-table-column",{attrs:{"min-width":"226px",label:"门店编码/名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[t._v("\n                  "+t._s(e.row.erpStoreNo)+"_"+t._s(e.row.erpStoreName)+"\n                ")])]}}],null,!1,3945522565)}),t._v(" "),s("el-table-column",{attrs:{"min-width":"100",prop:"saleTypeName",label:"门店类型"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(s){return t.deleteStoreItem(e.row,t.addParamMesg.shopType)}}},[t._v("删除")])]}}],null,!1,3550260604)})],1)],1):t._e()],1),t._v(" "),s("el-form-item",{attrs:{label:"参与商品",required:""}},[1==t.addParamMesg.shopType?s("el-button",{attrs:{size:"small",icon:"el-icon-plus"},on:{click:t.chooseGoodsOpen}},[t._v("选择商品")]):t._e(),t._v(" "),2==t.addParamMesg.shopType?s("el-button",{attrs:{size:"small",icon:"el-icon-plus"},on:{click:t.chooseOfflineGoodsOpen}},[t._v("选择商品")]):t._e(),t._v(" "),(1==t.addParamMesg.shopType?t.activityGoodsCheckedList.length>0:t.offlineGoodsCheckedList.length>0)?s("div",[s("el-table",{staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{data:1==t.addParamMesg.shopType?t.activityGoodsCheckedList:t.offlineGoodsCheckedList,"empty-text":"暂无选中任何商品","max-height":"400",size:"small"}},[1==t.addParamMesg.shopType?s("el-table-column",{attrs:{"min-width":"220px",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"ll-p-m-w"},[s("div",{staticClass:"ll-img-w"},[e.row.imgUrl&&""!=e.row.imgUrl?s("img",{attrs:{src:e.row.imgUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):s("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),s("div",{staticClass:"ll-p-m-c-r"},[s("div",[t._v("\n                      "+t._s(e.row.goodsName||"-")+"\n                    ")]),t._v(" "),s("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(e.row.goodsNo||"--"))])])])]}}],null,!1,2385194324)}):t._e(),t._v(" "),2==t.addParamMesg.shopType?s("el-table-column",{attrs:{"min-width":"170px",label:"商品信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"ll-p-m-w"},[s("div",{staticClass:"ll-p-m-c-r"},[s("div",[t._v("\n                      "+t._s(e.row.name||"-")+"\n                    ")]),t._v(" "),s("div",{staticClass:"ll-erp-p-no"},[t._v("ERP编码："+t._s(e.row.goodsNo||"--"))])])])]}}],null,!1,3777865820)}):t._e(),t._v(" "),s("el-table-column",{attrs:{"min-width":"100px",prop:"spec",label:"规格"}}),t._v(" "),1==t.addParamMesg.shopType?s("el-table-column",{attrs:{"min-width":"90px",prop:"storeMinPrice",label:"门店最低价"}}):t._e(),t._v(" "),s("el-table-column",{attrs:{"min-width":"150px",label:"限购次数(为空不限)"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[s("el-input",{attrs:{size:"small",placeholder:"输入限购次数"},model:{value:e.row.limitGoodsCount,callback:function(s){t.$set(e.row,"limitGoodsCount",s)},expression:"scope.row.limitGoodsCount"}})],1)]}}],null,!1,3599963105)}),t._v(" "),s("el-table-column",{attrs:{"min-width":"110px",label:"活动库存"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",[s("el-input",{attrs:{size:"small",placeholder:"输入库存"},model:{value:e.row.curStock,callback:function(s){t.$set(e.row,"curStock",s)},expression:"scope.row.curStock"}})],1)]}}],null,!1,132284644)}),t._v(" "),s("el-table-column",{attrs:{label:"活动规则",fixed:"right",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-setting"},on:{click:function(s){return t.setDiscount(e.row)}}},[t._v("设置")])]}}],null,!1,1469606823)}),t._v(" "),s("el-table-column",{attrs:{label:"操作",fixed:"right",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text",size:"mini",icon:"el-icon-delete"},on:{click:function(s){return t.deleteGoodsItem(e.row,t.addParamMesg.shopType)}}},[t._v("删除")])]}}],null,!1,1412196115)})],1),t._v(" "),1==t.addParamMesg.shopType?s("div",[s("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("注意：权重排序，先创建的活动商品在前；剩余的按前端规则走。\n          ")]):t._e(),t._v(" "),2==t.addParamMesg.shopType?s("div",[s("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("注意：如遇特殊情况（pos机断网等），可能导致限购次数和活动库存不准。\n          ")]):t._e()],1):t._e()],1),t._v(" "),s("hr",{staticClass:"s-slip-tb"}),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",size:"small",disabled:t.isDisabled},on:{click:t.doSaveHandel}},[t._v("保存")]),t._v(" "),s("el-button",{attrs:{size:"small"},on:{click:t.doCancelHandel}},[t._v("取消")])],1)],1)],1),t._v(" "),s("choose-store",{ref:"chooseStore",on:{confirmChooseStore:t.confirmChooseStore}}),t._v(" "),s("choose-goods",{ref:"chooseGoods",on:{confirmChooseGoods:t.confirmChooseGoods}}),t._v(" "),s("choose-offline-store",{ref:"chooseOfflineStore",on:{confirmChooseStore:t.confirmChooseOfflineStore}}),t._v(" "),s("choose-offline-goods",{ref:"chooseOfflineGoods",on:{confirmChooseOfflineGoods:t.confirmChooseOfflineGoods}}),t._v(" "),s("el-dialog",{staticStyle:{"padding-top":"0"},attrs:{title:"设置活动规则",visible:t.setDisDialogShow,width:"440px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.setDisDialogShow=e}}},[s("div",[s("div",{staticClass:"set-goods-table-tr"},[s("div",{staticClass:"set-goods-table-th tr1"},[t._v("商品信息")]),t._v(" "),s("div",{staticClass:"set-goods-table-th tr2"},[t._v("规格")]),t._v(" "),1==t.addParamMesg.shopType?s("div",{staticClass:"set-goods-table-th tr3"},[t._v("零售价")]):t._e()]),t._v(" "),s("div",{staticClass:"set-goods-table-tr"},[s("div",{staticClass:"set-goods-table-td tr1"},[1==t.addParamMesg.shopType?s("div",{staticClass:"ll-p-m-w"},[s("div",{staticClass:"ll-img-w"},[t.setItemDiscountMsg.imgUrl&&""!=t.setItemDiscountMsg.imgUrl?s("img",{attrs:{src:t.setItemDiscountMsg.imgUrl,alt:"",onerror:"onerror=null;src='/shop/static/img_error.png'"}}):s("img",{attrs:{src:"/shop/static/img_error.png",alt:""}})]),t._v(" "),s("div",{staticClass:"ll-p-m-c-r"},[s("div",[t._v("\n                "+t._s(t.setItemDiscountMsg.goodsName||"-")+"\n              ")]),t._v(" "),s("div",{staticClass:"ll-erp-p-no"},[t._v("SKU编码："+t._s(t.setItemDiscountMsg.goodsNo||"-"))])])]):t._e(),t._v(" "),2==t.addParamMesg.shopType?s("div",{staticClass:"ll-p-m-w"},[s("div",{staticClass:"ll-p-m-c-r"},[s("div",[t._v("\n                "+t._s(t.setItemDiscountMsg.name||"-")+"\n              ")]),t._v(" "),s("div",{staticClass:"ll-erp-p-no"},[t._v("ERP编码："+t._s(t.setItemDiscountMsg.goodsNo||"-"))])])]):t._e()]),t._v(" "),s("div",{staticClass:"set-goods-table-td tr2"},[t._v(t._s(t.setItemDiscountMsg.spec||"-"))]),t._v(" "),1==t.addParamMesg.shopType?s("div",{staticClass:"set-goods-table-td tr3"},[t._v(t._s(t.setItemDiscountMsg.price||"-"))]):t._e()]),t._v(" "),s("div",{staticClass:"set-dis-msg-list-wrap"},t._l(t.setItemDiscountMsg.activityDiscounts,function(e,i){return s("div",{key:i,staticClass:"set-dis-msg-item",staticStyle:{"margin-top":"10px"}},[s("el-input",{staticClass:"search-input-small-width",attrs:{size:"small",placeholder:"请输入"},model:{value:e.qty,callback:function(s){t.$set(e,"qty",s)},expression:"item.qty"}}),t._v(" "),s("span",{staticStyle:{padding:"0 5px",color:"#222"}},[t._v("份")]),t._v(" "),s("el-input",{staticClass:"search-input-small-width",attrs:{size:"small",placeholder:"请输入"},model:{value:e.amount,callback:function(s){t.$set(e,"amount",s)},expression:"item.amount"}}),t._v(" "),s("span",{staticStyle:{padding:"0 5px",color:"#222"}},[t._v("元")]),t._v(" "),s("el-button",{staticClass:"sup-mini",attrs:{type:"primary",icon:"el-icon-plus",circle:"",size:"mini"},on:{click:function(e){return t.addDisItems(i)}}}),t._v(" "),0!==i?s("el-button",{staticClass:"sup-mini",attrs:{type:"primary",icon:"el-icon-minus",circle:"",size:"mini"},on:{click:function(e){return t.removeDisItems(i)}}}):t._e()],1)}),0)]),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"mini"},on:{click:function(e){t.setDisDialogShow=!1}}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.doSetDisSaveHandel(t.setItemDiscountMsg.goodsNo)}}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var g=s("VU/8")(p,y,!1,function(t){s("ZD+P")},null,null);e.default=g.exports}});
//# sourceMappingURL=72.280a7b1dfa90f8d8c972.js.map
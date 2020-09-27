webpackJsonp([108],{"6R+G":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=t("Dd8w"),i=t.n(s),o=t("BO1k"),d=t.n(o),l=t("ssT3"),r=t("oAV5"),n="/plateform/a/mall/storeLogistics/saveLogistics",c="/plateform/a/mall/storeLogistics/getStoreLogisticsScope",m="/plateform/a/mall/storeLogistics/detail",h=void 0,g=void 0,v=void 0,u=void 0,p=void 0,C=void 0,f=void 0,k=void 0,_=void 0,M={data:function(){return{cityStr:l.a.get("cityName"),isDisabled:!1,addParamMesg:{id:"",dcCloseTime:"",dcOpenTime:"",dcScope:[],logisticsCompanyId:"",logisticsCompanyName:"",sortNum:"",storeNo:"",storeName:"",district:""},storeOptions:[],logisticsCompanyOptList:[{label:"门店自配送",value:1001},{label:"美团配送",value:1002},{label:"达达配送",value:1003},{label:"顺丰同城配送",value:1004}],sortNumOptList:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],storeLocation:{longitude:116.403322,latitude:39.920255},thirdDcScopeList:[],mtChecked:!1,blxChecked:!1,ddChecked:!1,sfChecked:!1,radiusNum:""}},created:function(){this.addParamMesg.id=this.$route.params.id||"",this.addParamMesg.storeNo=this.$route.params.storeNo||""},mounted:function(){this.getStoreLogisticsScope(),this.getDetailMsg()},methods:{getDetailMsg:function(){var e=this;r.r(),this.$http.post(m,{id:this.addParamMesg.id,storeNo:this.addParamMesg.storeNo}).then(function(a){if(r.c(),0!==a.code)throw new Error(a.msg);if(a.data){var t=a.data;e.addParamMesg.logisticsCompanyId=t.logisticsCompanyId,e.addParamMesg.logisticsCompanyName=t.logisticsCompanyName,e.addParamMesg.storeNo=t.storeNo,e.addParamMesg.storeName=t.storeName,e.addParamMesg.sortNum=t.sortNum,e.addParamMesg.dcOpenTime=t.dcOpenTime,e.addParamMesg.dcCloseTime=t.dcCloseTime,t.dcScope&&(e.addParamMesg.dcScope=JSON.parse(t.dcScope)||[]),t.latitude&&t.longitude?(e.storeLocation.longitude=t.longitude,e.storeLocation.latitude=t.latitude):0!=t.latitude&&0!=t.longitude||(e.storeLocation.longitude=t.longitude,e.storeLocation.latitude=t.latitude),e.initMap(),e.addParamMesg.storeNo&&e.createMarker();var s=e.addParamMesg.logisticsCompanyId,i=e.addParamMesg.storeNo;if(i&&1001===s||i&&1003===s||i&&1004===s){var o="",d="";1001===s?(o="#3080fe",d="#3080fe"):1003===s?(o="#67C23A",d="#67C23A"):1004===s&&(o="#F39800",d="#F39800"),e.createPolyEditor(o,d)}else i&&1002===s&&setTimeout(function(){e.mtChecked=!0,e.mtCheckedChange(!0)},500)}}).catch(function(a){r.c(),e.$notify.error({title:"提示",message:a.message})})},getStoreLogisticsScope:function(){var e=this;this.platIdList=[],this.$http.post(c,{storeNo:this.addParamMesg.storeNo}).then(function(a){if(0!==a.code)throw new Error(a.msg);a.data&&a.data.length?e.thirdDcScopeList=a.data:e.thirdDcScopeList=[]}).catch(function(e){console.log("提示(获取门店三方配置信息):",e.message)})},initMap:function(){var e=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);h=new AMap.Map("mapContainer",{center:[e.lng,e.lat],resizeEnable:!0,zoom:12}),AMap.plugin(["AMap.ToolBar","AMap.Scale","AMap.PolyEditor","AMap.LngLat","AMap.Geocoder"],function(){h.addControl(new AMap.ToolBar),h.addControl(new AMap.Scale),h.addControl(new AMap.Geocoder)})},createMarker:function(){var e=this,a=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);u=new AMap.Marker({position:[a.lng,a.lat]}),h.add(u),(p=new AMap.InfoWindow({autoMove:!0,offset:{x:0,y:-30}})).setContent(this.addParamMesg.storeNo+"-"+this.addParamMesg.storeName),p.open(h,u.getPosition());var t=[a.lng,a.lat];new AMap.Geocoder({}).getAddress(t,function(a,t){if("complete"===a&&"OK"===t.info){console.log("result.regeocode:",t.regeocode);var s=t.regeocode.addressComponent.district;e.addParamMesg.district=s}else e.addParamMesg.district=""})},createPolyEditor:function(e,a){var t=e,s=a,i=[],o=(new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude),this.addParamMesg.dcScope),l=!0,r=!1,n=void 0;try{for(var c,m=d()(o);!(l=(c=m.next()).done);l=!0){var u=c.value;i.push(new AMap.LngLat(u.y,u.x))}}catch(e){r=!0,n=e}finally{try{!l&&m.return&&m.return()}finally{if(r)throw n}}v=new AMap.Polygon({path:i,strokeColor:t,strokeWeight:6,strokeOpacity:1,fillOpacity:.4,fillColor:s,zIndex:50}),h.add(v),h.setFitView([v]),AMap.plugin(["AMap.PolyEditor"],function(){g=new AMap.PolyEditor(h,v)})},createCircleMarkGroup:function(){_&&h.remove([_]);if(this.addParamMesg.storeNo)if(this.radiusNum)if("0"!==this.radiusNum)if(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.radiusNum)){var e=1e3*parseInt(this.radiusNum),a=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);_=new AMap.Circle({center:[a.lng,a.lat],radius:e,strokeColor:"#a0a0a0",strokeOpacity:1,strokeWeight:2,fillColor:"#FFFFFF",fillOpacity:0,strokeStyle:"dashed",zIndex:60}),h.add(_),h.setFitView([_])}else this.$message("半径值为为大于0，小数保留小数点后2位");else this.$message("半径值为为大于0，小数保留小数点后2位");else this.$message("请输入半径值");else this.$message("请先选择门店")},polyEditorOpen:function(){g.open()},mtCheckedChange:function(e){f&&h.remove([f]);var a=e;this.createPolygon(a,1002,"#FF0000","#FF0000")},blxCheckedChange:function(e){C&&h.remove([C]);var a=e;this.createPolygon(a,1001,"#3080fe","#3080fe")},ddCheckedChange:function(e){k&&h.remove([k]);var a=e;this.createPolygon(a,1003,"#67C23A","#67C23A")},sfCheckedChange:function(e){var a=e;this.createPolygon(a,1004,"#F39800","#F39800")},createPolygon:function(e,a,t,s){var i=a,o=t,l=s,r=this.thirdDcScopeList.filter(function(e){return e.logisticsCompanyId===i})[0];if(!r){var n="";return 1001===i?n="门店自配送":1002===i?n="美团配送":1003===i?n="达达配送":1004===i&&(n="顺丰同城配送"),void(!0===e&&this.$notify.warning({title:"温馨提示",message:"该门店暂未设置"+n+"范围"}))}var c=[],m=JSON.parse(r.dcScope),g=!0,v=!1,u=void 0;try{for(var p,_=d()(m);!(g=(p=_.next()).done);g=!0){var M=p.value;c.push(new AMap.LngLat(M.y,M.x))}}catch(e){v=!0,u=e}finally{try{!g&&_.return&&_.return()}finally{if(v)throw u}}if(!0===e){var b=new AMap.Polygon({path:c,strokeColor:o,strokeWeight:6,strokeOpacity:1,fillOpacity:.4,fillColor:l,zIndex:50});1001===i?(C=b,h.add([C]),h.setFitView([C])):1002===i?(f=b,h.add([f]),h.setFitView([f])):1003===i&&(k=b,h.add([k]),h.setFitView([k]))}else 1001===i?h.remove([C]):1002===i?h.remove([f]):1003===i&&h.remove([k])},doSaveHandel:function(){var e=this;if(g&&v){g.close();var a=v.getPath(),t=[],s=!0,o=!1,l=void 0;try{for(var c,m=d()(a);!(s=(c=m.next()).done);s=!0){var h=c.value,u={x:h.lat,y:h.lng};t.push(u)}}catch(e){o=!0,l=e}finally{try{!s&&m.return&&m.return()}finally{if(o)throw l}}this.addParamMesg.dcScope=t}this.addParamMesg.logisticsCompanyId?this.addParamMesg.storeNo?this.addParamMesg.sortNum?this.addParamMesg.dcOpenTime&&this.addParamMesg.dcCloseTime?r.b(this.addParamMesg.dcCloseTime)<=r.b(this.addParamMesg.dcOpenTime)?this.$message("最晚可接单时间不能早于最早可接单时间"):1001==this.addParamMesg.logisticsCompanyId&&this.addParamMesg.dcScope.length<=0?this.$message("请在地图上编辑门店自配送范围"):(r.r(),this.isDisabled=!0,this.$http.post(n,i()({},this.addParamMesg)).then(function(a){if(r.c(),setTimeout(function(){e.isDisabled=!1},800),0===a.code)return e.$message.success("保存成功"),void e.$router.push("/blx_delivery");throw new Error(a.msg)}).catch(function(a){r.c(),e.isDisabled=!1,e.$notify.error({title:"提示",message:a.message})})):this.$message("请选择立即送时间"):this.$message("请选择派单优先级"):this.$message("请选择门店"):this.$message("请选择配送公司")},doCancelHandel:function(){var e=this;this.$confirm("确定取消吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$router.push("/blx_delivery")}).catch(function(){})}},beforeRouteLeave:function(e,a,t){e.meta.keepAlive=!0,t()}},b={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"add-form-wraper"},[t("el-form",{ref:"form",attrs:{model:e.addParamMesg,"label-width":"140px"}},[t("el-form-item",{attrs:{label:"配送公司"}},[t("el-input",{staticClass:"add-input",attrs:{size:"small",disabled:""},model:{value:e.addParamMesg.logisticsCompanyName,callback:function(a){e.$set(e.addParamMesg,"logisticsCompanyName",a)},expression:"addParamMesg.logisticsCompanyName"}}),e._v(" "),t("span",[e._v("编辑时配送公司不可更换")])],1),e._v(" "),t("el-form-item",{attrs:{label:"选择门店",required:""}},[t("el-input",{staticClass:"add-input",attrs:{size:"small",disabled:""},model:{value:e.addParamMesg.storeName,callback:function(a){e.$set(e.addParamMesg,"storeName",a)},expression:"addParamMesg.storeName"}}),e._v(" "),t("span",[e._v("编辑时门店不可更换")])],1),e._v(" "),e.addParamMesg.storeNo&&e.addParamMesg.district?t("el-form-item",{attrs:{label:"门店区域",required:""}},[t("el-input",{staticClass:"add-input-inline",attrs:{size:"small",disabled:""},model:{value:e.cityStr,callback:function(a){e.cityStr=a},expression:"cityStr"}}),e._v(" "),t("el-input",{staticClass:"add-input-inline",attrs:{size:"small"},model:{value:e.addParamMesg.district,callback:function(a){e.$set(e.addParamMesg,"district",a)},expression:"addParamMesg.district"}}),e._v(" "),t("span",[e._v("地图中门店地址的区域和第三方平台区域不一致时可修改区域")])],1):e._e(),e._v(" "),t("el-form-item",{attrs:{label:"派单优先级",required:""}},[t("el-select",{staticClass:"add-input",attrs:{placeholder:"请选择派单优先级",size:"small",clearable:""},model:{value:e.addParamMesg.sortNum,callback:function(a){e.$set(e.addParamMesg,"sortNum",a)},expression:"addParamMesg.sortNum"}},e._l(e.sortNumOptList,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),t("span",[e._v("请选择派单优先级，越小越优先，如果选择的优先级已有其他的配送公司，保存后则自动将其他的配送公司降级")])],1),e._v(" "),t("el-form-item",{attrs:{label:"立即送时间",required:""}},[t("el-time-picker",{staticClass:"add-input-inline",attrs:{format:"HH:mm:ss","value-format":"HH:mm:ss",size:"small",clearable:"",placeholder:"最早可接单时间"},model:{value:e.addParamMesg.dcOpenTime,callback:function(a){e.$set(e.addParamMesg,"dcOpenTime",a)},expression:"addParamMesg.dcOpenTime"}}),e._v("\n        -\n        "),t("el-time-picker",{staticClass:"add-input-inline",attrs:{format:"HH:mm:ss","value-format":"HH:mm:ss",size:"small",clearable:"",placeholder:"最晚可接单时间"},model:{value:e.addParamMesg.dcCloseTime,callback:function(a){e.$set(e.addParamMesg,"dcCloseTime",a)},expression:"addParamMesg.dcCloseTime"}}),e._v(" "),t("span",[e._v("每天骑手最早的接单时间和最晚的可接单时间")])],1),e._v(" "),t("el-form-item",{attrs:{label:"配送范围",required:""}},[1001==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?t("div",{staticClass:"h-btn-w"},[t("div",[t("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit"},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),t("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),t("div",[t("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(a){e.mtChecked=a},expression:"mtChecked"}},[e._v("美团配送("),t("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.ddCheckedChange},model:{value:e.ddChecked,callback:function(a){e.ddChecked=a},expression:"ddChecked"}},[e._v("达达配送("),t("span",{staticStyle:{color:"#67C23A"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.sfCheckedChange},model:{value:e.sfChecked,callback:function(a){e.sfChecked=a},expression:"sfChecked"}},[e._v("顺丰同城配送("),t("span",{staticStyle:{color:"#F39800"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),1002==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?t("div",{staticClass:"h-btn-w"},[t("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),t("div",[t("el-checkbox",{on:{change:e.blxCheckedChange},model:{value:e.blxChecked,callback:function(a){e.blxChecked=a},expression:"blxChecked"}},[e._v("门店自配送("),t("span",{staticStyle:{color:"#3080fe"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(a){e.mtChecked=a},expression:"mtChecked"}},[e._v("美团配送("),t("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.ddCheckedChange},model:{value:e.ddChecked,callback:function(a){e.ddChecked=a},expression:"ddChecked"}},[e._v("达达配送("),t("span",{staticStyle:{color:"#67C23A"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.sfCheckedChange},model:{value:e.sfChecked,callback:function(a){e.sfChecked=a},expression:"sfChecked"}},[e._v("顺丰同城配送("),t("span",{staticStyle:{color:"#F39800"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),1003==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?t("div",{staticClass:"h-btn-w"},[t("div",[t("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit"},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),t("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),t("div",[t("el-checkbox",{on:{change:e.blxCheckedChange},model:{value:e.blxChecked,callback:function(a){e.blxChecked=a},expression:"blxChecked"}},[e._v("门店自配送("),t("span",{staticStyle:{color:"#3080fe"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(a){e.mtChecked=a},expression:"mtChecked"}},[e._v("美团配送("),t("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.sfCheckedChange},model:{value:e.sfChecked,callback:function(a){e.sfChecked=a},expression:"sfChecked"}},[e._v("顺丰同城配送("),t("span",{staticStyle:{color:"#F39800"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),1004==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?t("div",{staticClass:"h-btn-w"},[t("div",[t("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit",disabled:!e.addParamMesg.storeNo},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),t("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),t("div",[t("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(a){e.mtChecked=a},expression:"mtChecked"}},[e._v("美团配送("),t("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.blxCheckedChange},model:{value:e.blxChecked,callback:function(a){e.blxChecked=a},expression:"blxChecked"}},[e._v("门店自配送("),t("span",{staticStyle:{color:"#409EFF"}},[e._v("—")]),e._v(")")]),e._v(" "),t("el-checkbox",{on:{change:e.ddCheckedChange},model:{value:e.ddChecked,callback:function(a){e.ddChecked=a},expression:"ddChecked"}},[e._v("达达配送("),t("span",{staticStyle:{color:"#67C23A"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),t("div",{staticClass:"blx-map-contianer"},[e.addParamMesg.storeNo?t("div",{staticClass:"reference-range-wrap"},[e._v("\n            参考范围：以门店为中心半径\n            "),t("el-input",{staticClass:"add-input-inline-left",attrs:{size:"mini"},model:{value:e.radiusNum,callback:function(a){e.radiusNum=a},expression:"radiusNum"}}),e._v("\n            公里\n            "),t("el-button",{attrs:{size:"mini",type:"primary",disabled:!e.radiusNum},on:{click:e.createCircleMarkGroup}},[e._v("显示")])],1):e._e(),e._v(" "),t("div",{attrs:{id:"mapContainer",tabindex:"0"}})])]),e._v(" "),t("hr",{staticClass:"s-slip-tb"}),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small",disabled:e.isDisabled},on:{click:e.doSaveHandel}},[e._v("保存")]),e._v(" "),t("el-button",{attrs:{size:"small"},on:{click:e.doCancelHandel}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]};var y=t("VU/8")(M,b,!1,function(e){t("mwTL")},"data-v-3f0be58e",null);a.default=y.exports},mwTL:function(e,a){}});
//# sourceMappingURL=108.a85c76bf850fd0c873b3.js.map
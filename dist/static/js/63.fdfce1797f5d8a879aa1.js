webpackJsonp([63],{"/kut":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),o=a("BO1k"),l=a.n(o),r=a("ssT3"),n=a("oAV5"),d="/plateform/a/mall/storeLogistics/selectCityStore",c="/plateform/a/mall/storeLogistics/saveLogistics",m="/plateform/a/mall/storeLogistics/getStoreLogisticsScope",h=void 0,u=void 0,v=void 0,p=void 0,g=void 0,f=void 0,C=void 0,k=void 0,b=void 0,_=void 0,y={data:function(){return{cityStr:r.a.get("cityName"),isDisabled:!1,addParamMesg:{dcCloseTime:"",dcOpenTime:"",dcScope:[],logisticsCompanyId:"",sortNum:"",storeNo:"",storeName:"",district:""},storeOptions:[],logisticsCompanyOptList:[{label:"门店自配送",value:1001},{label:"美团配送",value:1002},{label:"达达配送",value:1003},{label:"顺丰同城配送",value:1004}],sortNumOptList:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],storeLocation:{longitude:116.403322,latitude:39.920255},thirdDcScopeList:[],mtChecked:!1,blxChecked:!1,ddChecked:!1,sfChecked:!1,radiusNum:""}},created:function(){},mounted:function(){this.initMap()},methods:{getStoreList:function(e){var t=this;this.addParamMesg.storeNo="",this.mtChecked=!1,this.initMap();var a=e;this.$http.post(d,{logisticsCompanyId:a}).then(function(e){if(0!==e.code)throw new Error(e.msg);if(e.data&&e.data.length){var a=!0,s=!1,i=void 0;try{for(var o,r=l()(e.data);!(a=(o=r.next()).done);a=!0){var n=o.value;n.value=n.storeNo,n.label=n.storeNo+"-"+n.storeName}}catch(e){s=!0,i=e}finally{try{!a&&r.return&&r.return()}finally{if(s)throw i}}t.storeOptions=e.data}else t.storeOptions=[]}).catch(function(e){console.log("提示(获取门店列表):",e.message)})},getStoreLogisticsScope:function(){var e=this;this.platIdList=[],this.$http.post(m,{storeNo:this.addParamMesg.storeNo}).then(function(t){if(0!==t.code)throw new Error(t.msg);t.data&&t.data.length?e.thirdDcScopeList=t.data:e.thirdDcScopeList=[]}).catch(function(e){console.log("提示(获取门店三方配置信息):",e.message)})},storeChange:function(e){this.getStoreLogisticsScope();var t=e,a=this.storeOptions.filter(function(e){return e.storeNo===t})[0];a&&(this.storeLocation={latitude:a.latitude,longitude:a.longitude},this.addParamMesg.storeName=a.storeName),this.initMap(),this.mtChecked=!1;var s=this.addParamMesg.logisticsCompanyId;if(t&&this.createMarker(),t&&1001===s||t&&1003===s||t&&1004===s){var i="",o="";1001===s?(i="#3080fe",o="#3080fe"):1003===s?(i="#67C23A",o="#67C23A"):1004===s&&(i="#F39800",o="#F39800"),this.createPolyEditor(i,o)}},initMap:function(){var e=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);h=new AMap.Map("mapContainer",{center:[e.lng,e.lat],resizeEnable:!0,zoom:12}),AMap.plugin(["AMap.ToolBar","AMap.Scale","AMap.PolyEditor","AMap.LngLat","AMap.Geocoder"],function(){h.addControl(new AMap.ToolBar),h.addControl(new AMap.Scale),h.addControl(new AMap.Geocoder)})},createMarker:function(){var e=this,t=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);p=new AMap.Marker({position:[t.lng,t.lat]}),h.add(p),(g=new AMap.InfoWindow({autoMove:!0,offset:{x:0,y:-30}})).setContent(this.addParamMesg.storeNo+"-"+this.addParamMesg.storeName),g.open(h,p.getPosition());var a=[t.lng,t.lat];new AMap.Geocoder({}).getAddress(a,function(t,a){if("complete"===t&&"OK"===a.info){console.log("result.regeocode:",a.regeocode);var s=a.regeocode.addressComponent.district;e.addParamMesg.district=s}else e.addParamMesg.district=""})},createPolyEditor:function(e,t){var a,s=e,i=t,o=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude),l=o.offset(0,500),r=o.offset(0,-500),n=o.offset(500,0),d=o.offset(-500,0);a=[[l.lng,l.lat],[n.lng,n.lat],[r.lng,r.lat],[d.lng,d.lat]],v=new AMap.Polygon({path:a,strokeColor:s,strokeWeight:6,strokeOpacity:1,fillOpacity:.4,fillColor:i,zIndex:50}),h.add(v),h.setFitView([v]),AMap.plugin(["AMap.PolyEditor"],function(){u=new AMap.PolyEditor(h,v)})},createCircleMarkGroup:function(){_&&h.remove([_]);if(this.addParamMesg.storeNo)if(this.radiusNum)if("0"!==this.radiusNum)if(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.radiusNum)){var e=1e3*parseInt(this.radiusNum),t=new AMap.LngLat(this.storeLocation.longitude,this.storeLocation.latitude);_=new AMap.Circle({center:[t.lng,t.lat],radius:e,strokeColor:"#a0a0a0",strokeOpacity:1,strokeWeight:2,fillColor:"#FFFFFF",fillOpacity:0,strokeStyle:"dashed",zIndex:60}),h.add(_),h.setFitView([_])}else this.$message("半径值为为大于0，小数保留小数点后2位");else this.$message("半径值为为大于0，小数保留小数点后2位");else this.$message("请输入半径值");else this.$message("请先选择门店")},polyEditorOpen:function(){u.open()},blxCheckedChange:function(e){var t=e;this.createPolygon(t,1001,"#3080fe","#3080fe")},mtCheckedChange:function(e){var t=e;this.createPolygon(t,1002,"#FF0000","#FF0000")},ddCheckedChange:function(e){var t=e;this.createPolygon(t,1003,"#67C23A","#67C23A")},sfCheckedChange:function(e){var t=e;this.createPolygon(t,1004,"#F39800","#F39800")},createPolygon:function(e,t,a,s){var i=t,o=a,r=s,n=this.thirdDcScopeList.filter(function(e){return e.logisticsCompanyId===i})[0];if(!n){var d="";return 1001===i?d="门店自配送":1002===i?d="美团配送":1003===i?d="达达配送":1004===i&&(d="顺丰同城配送"),void(!0===e&&this.$notify.warning({title:"温馨提示",message:"该门店暂未设置"+d+"范围"}))}var c=[],m=JSON.parse(n.dcScope),u=!0,v=!1,p=void 0;try{for(var g,_=l()(m);!(u=(g=_.next()).done);u=!0){var y=g.value;c.push(new AMap.LngLat(y.y,y.x))}}catch(e){v=!0,p=e}finally{try{!u&&_.return&&_.return()}finally{if(v)throw p}}if(!0===e){var M=new AMap.Polygon({path:c,strokeColor:o,strokeWeight:6,strokeOpacity:1,fillOpacity:.4,fillColor:r,zIndex:50});1001===i?(f=M,h.add([f]),h.setFitView([f])):1002===i?(C=M,h.add([C]),h.setFitView([C])):1003===i?(k=M,h.add([k]),h.setFitView([k])):1004===i&&(b=M,h.add([b]),h.setFitView([b]))}else 1001===i?h.remove([f]):1002===i?h.remove([C]):1003===i?h.remove([k]):1004===i&&h.remove([b])},doSaveHandel:function(){var e=this;if(u&&v){u.close();var t=v.getPath(),a=[],s=!0,o=!1,r=void 0;try{for(var d,m=l()(t);!(s=(d=m.next()).done);s=!0){var h=d.value,p={x:h.lat,y:h.lng};a.push(p)}}catch(e){o=!0,r=e}finally{try{!s&&m.return&&m.return()}finally{if(o)throw r}}this.addParamMesg.dcScope=a}this.addParamMesg.logisticsCompanyId?this.addParamMesg.storeNo?this.addParamMesg.sortNum?this.addParamMesg.dcOpenTime&&this.addParamMesg.dcCloseTime?n.b(this.addParamMesg.dcCloseTime)<=n.b(this.addParamMesg.dcOpenTime)?this.$message("最晚可接单时间不能早于最早可接单时间"):1001==this.addParamMesg.logisticsCompanyId&&this.addParamMesg.dcScope.length<=0?this.$message("请在地图上编辑门店自配送范围"):(n.r(),this.isDisabled=!0,this.$http.post(c,i()({},this.addParamMesg)).then(function(t){if(n.c(),setTimeout(function(){e.isDisabled=!1},800),0===t.code)return e.$message.success("保存成功"),void e.$router.push("/blx_delivery");throw new Error(t.msg)}).catch(function(t){n.c(),e.isDisabled=!1,e.$notify.error({title:"提示",message:t.message})})):this.$message("请选择立即送时间"):this.$message("请选择派单优先级"):this.$message("请选择门店"):this.$message("请选择配送公司")},doCancelHandel:function(){var e=this;this.$confirm("确定取消吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$router.push("/blx_delivery")}).catch(function(){})}}},M={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"add-form-wraper"},[a("el-form",{ref:"form",attrs:{model:e.addParamMesg,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"配送公司",required:""}},[a("el-select",{staticClass:"add-input",attrs:{placeholder:"请选择配送公司",size:"small",clearable:""},on:{change:e.getStoreList},model:{value:e.addParamMesg.logisticsCompanyId,callback:function(t){e.$set(e.addParamMesg,"logisticsCompanyId",t)},expression:"addParamMesg.logisticsCompanyId"}},e._l(e.logisticsCompanyOptList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",[e._v("请选择一家配送公司（顺丰同城配送、达达、门店自配送默认东、西、南、北500m）")])],1),e._v(" "),a("el-form-item",{attrs:{label:"选择门店",required:""}},[a("el-select",{staticClass:"add-input",attrs:{filterable:"",placeholder:"请选择门店",clearable:"",size:"small"},on:{change:e.storeChange},model:{value:e.addParamMesg.storeNo,callback:function(t){e.$set(e.addParamMesg,"storeNo",t)},expression:"addParamMesg.storeNo"}},e._l(e.storeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",[e._v("请先选择配送公司再选择门店，禁用的门店或已添加当前配送公司的门店不在列表中")])],1),e._v(" "),e.addParamMesg.storeNo&&e.addParamMesg.district?a("el-form-item",{attrs:{label:"门店区域",required:""}},[a("el-input",{staticClass:"add-input-inline",attrs:{size:"small",disabled:""},model:{value:e.cityStr,callback:function(t){e.cityStr=t},expression:"cityStr"}}),e._v(" "),a("el-input",{staticClass:"add-input-inline",attrs:{size:"small"},model:{value:e.addParamMesg.district,callback:function(t){e.$set(e.addParamMesg,"district",t)},expression:"addParamMesg.district"}}),e._v(" "),a("span",[e._v("地图中门店地址的区域和第三方平台区域不一致时可修改区域")])],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"派单优先级",required:""}},[a("el-select",{staticClass:"add-input",attrs:{placeholder:"请选择派单优先级",size:"small",clearable:""},model:{value:e.addParamMesg.sortNum,callback:function(t){e.$set(e.addParamMesg,"sortNum",t)},expression:"addParamMesg.sortNum"}},e._l(e.sortNumOptList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),a("span",[e._v("请选择派单优先级，越小越优先，如果选择的优先级已有其他的配送公司，保存后则自动将其他的配送公司降级")])],1),e._v(" "),a("el-form-item",{attrs:{label:"立即送时间",required:""}},[a("el-time-picker",{staticClass:"add-input-inline",attrs:{format:"HH:mm:ss","value-format":"HH:mm:ss",size:"small",clearable:"",placeholder:"最早可接单时间"},model:{value:e.addParamMesg.dcOpenTime,callback:function(t){e.$set(e.addParamMesg,"dcOpenTime",t)},expression:"addParamMesg.dcOpenTime"}}),e._v("\n        -\n        "),a("el-time-picker",{staticClass:"add-input-inline",attrs:{format:"HH:mm:ss","value-format":"HH:mm:ss",size:"small",clearable:"",placeholder:"最晚可接单时间"},model:{value:e.addParamMesg.dcCloseTime,callback:function(t){e.$set(e.addParamMesg,"dcCloseTime",t)},expression:"addParamMesg.dcCloseTime"}}),e._v(" "),a("span",[e._v("每天骑手最早的接单时间和最晚的可接单时间")])],1),e._v(" "),a("el-form-item",{attrs:{label:"配送范围",required:""}},[1001==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?a("div",{staticClass:"h-btn-w"},[a("div",[a("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit",disabled:!e.addParamMesg.storeNo},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),a("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),a("div",[a("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(t){e.mtChecked=t},expression:"mtChecked"}},[e._v("美团配送("),a("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.ddCheckedChange},model:{value:e.ddChecked,callback:function(t){e.ddChecked=t},expression:"ddChecked"}},[e._v("达达配送("),a("span",{staticStyle:{color:"#67C23A"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.sfCheckedChange},model:{value:e.sfChecked,callback:function(t){e.sfChecked=t},expression:"sfChecked"}},[e._v("顺丰同城配送("),a("span",{staticStyle:{color:"#F39800"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),1002==e.addParamMesg.logisticsCompanyId?a("div",{staticClass:"h-btn-w"},[e._v("\n          美团配送无需画配送范围，保存后系统自动获取\n        ")]):e._e(),e._v(" "),1003==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?a("div",{staticClass:"h-btn-w"},[a("div",[a("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit",disabled:!e.addParamMesg.storeNo},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),a("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),a("div",[a("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(t){e.mtChecked=t},expression:"mtChecked"}},[e._v("美团配送("),a("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.blxCheckedChange},model:{value:e.blxChecked,callback:function(t){e.blxChecked=t},expression:"blxChecked"}},[e._v("门店自配送("),a("span",{staticStyle:{color:"#409EFF"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.sfCheckedChange},model:{value:e.sfChecked,callback:function(t){e.sfChecked=t},expression:"sfChecked"}},[e._v("顺丰同城配送("),a("span",{staticStyle:{color:"#F39800"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),1004==e.addParamMesg.logisticsCompanyId&&e.addParamMesg.storeNo?a("div",{staticClass:"h-btn-w"},[a("div",[a("el-button",{staticStyle:{"margin-right":"20px"},attrs:{size:"small",type:"text",icon:"el-icon-edit",disabled:!e.addParamMesg.storeNo},on:{click:e.polyEditorOpen}},[e._v("编辑配送范围")])],1),e._v(" "),a("div",{staticStyle:{"margin-right":"10px"}},[e._v("\n            查看配送范围:\n          ")]),e._v(" "),a("div",[a("el-checkbox",{on:{change:e.mtCheckedChange},model:{value:e.mtChecked,callback:function(t){e.mtChecked=t},expression:"mtChecked"}},[e._v("美团配送("),a("span",{staticStyle:{color:"#FF0000"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.blxCheckedChange},model:{value:e.blxChecked,callback:function(t){e.blxChecked=t},expression:"blxChecked"}},[e._v("门店自配送("),a("span",{staticStyle:{color:"#409EFF"}},[e._v("—")]),e._v(")")]),e._v(" "),a("el-checkbox",{on:{change:e.ddCheckedChange},model:{value:e.ddChecked,callback:function(t){e.ddChecked=t},expression:"ddChecked"}},[e._v("达达配送("),a("span",{staticStyle:{color:"#67C23A"}},[e._v("—")]),e._v(")")])],1)]):e._e(),e._v(" "),a("div",{staticClass:"blx-map-contianer"},[e.addParamMesg.storeNo?a("div",{staticClass:"reference-range-wrap"},[e._v("\n            参考范围：以门店为中心半径\n            "),a("el-input",{staticClass:"add-input-inline-left",attrs:{size:"mini"},model:{value:e.radiusNum,callback:function(t){e.radiusNum=t},expression:"radiusNum"}}),e._v("\n            公里\n            "),a("el-button",{attrs:{size:"mini",type:"primary",disabled:!e.radiusNum},on:{click:e.createCircleMarkGroup}},[e._v("显示")])],1):e._e(),e._v(" "),a("div",{attrs:{id:"mapContainer",tabindex:"0"}})])]),e._v(" "),a("hr",{staticClass:"s-slip-tb"}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small",disabled:e.isDisabled},on:{click:e.doSaveHandel}},[e._v("保存")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:e.doCancelHandel}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]};var P=a("VU/8")(y,M,!1,function(e){a("Simz")},"data-v-919fe08c",null);t.default=P.exports},Simz:function(e,t){}});
//# sourceMappingURL=63.fdfce1797f5d8a879aa1.js.map
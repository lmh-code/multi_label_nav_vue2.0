webpackJsonp([85],{UemG:function(t,o,r){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=r("BO1k"),s=r.n(e),a=r("oAV5"),i="/member/zt/group/groupInfo",u="/member/zt/group/groupOrderList",n={data:function(){return{groupNo:"",groupInfo:{goodsNo:"",skuNo:"",goodsSpec:"",createTime:"",groupJoinedNum:"",groupNo:"",groupStatus:"",groupStatusStr:"",joinLimitNum:"",lastFor:"",platCityActivityGoodsName:"",successTime:""},groupOrderList:[]}},created:function(){this.groupNo=this.$route.params.groupNo},mounted:function(){this.groupNo&&(this.getOrderDetail(),this.getGroupOrderList())},methods:{getOrderDetail:function(){var t=this;a.r(),this.$http.post(i,{source:"web",groupNo:this.groupNo,DIFFCITY:!0}).then(function(o){if(a.c(),0!==o.code)throw new Error(o.msg);if(o.data){var r=o.data;switch(t.groupInfo.goodsNo=r.goodsNo||"--",t.groupInfo.skuNo=r.skuNo||"--",t.groupInfo.goodsSpec=r.goodsSpec||"--",t.groupInfo.createTime=r.createTime||"--",t.groupInfo.groupJoinedNum=r.groupJoinedNum||"0",t.groupInfo.groupNo=r.groupNo||"--",t.groupInfo.groupStatus=r.groupStatus||"--",r.groupStatus){case 10:t.groupInfo.groupStatusStr="待成团";break;case 20:t.groupInfo.groupStatusStr="成团成功";break;case 30:t.groupInfo.groupStatusStr="成团失败";break;case 40:t.groupInfo.groupStatusStr="已关闭";break;default:t.groupInfo.groupStatusStr="--"}t.groupInfo.joinLimitNum=r.joinLimitNum||"0",t.groupInfo.lastFor=r.lastFor||"--",t.groupInfo.platCityActivityGoodsName=r.platCityActivityGoodsName||"--",t.groupInfo.successTime=r.successTime||"--"}}).catch(function(o){a.c(),t.$notify.error({title:"提示",message:o.message})})},getGroupOrderList:function(){var t=this;a.r(),this.$http.post(u,{source:"web",groupNo:this.groupNo,DIFFCITY:!0}).then(function(o){if(a.c(),0!==o.code)throw new Error(o.msg);if(o.data&&o.data.list&&o.data.list.length){var r=!0,e=!1,i=void 0;try{for(var u,n=s()(o.data.list);!(r=(u=n.next()).done);r=!0){var p=u.value;p.redirectUrl="/order_mgt/detail/"+p.orderNo}}catch(t){e=!0,i=t}finally{try{!r&&n.return&&n.return()}finally{if(e)throw i}}t.groupOrderList=o.data.list}}).catch(function(o){a.c(),t.$notify.error({title:"提示",message:o.message})})},orderTypeFormater:function(t,o,r){var e="";switch(r){case 1:e="及时送";break;case 2:e="预约送";break;case 3:e="自提";break;case 5:e="快递配送";break;default:e="--"}return e},emptyValFormater:function(t,o,r){return r&&""!=r?r:"--"}},beforeRouteLeave:function(t,o,r){t.meta.keepAlive=!0,r()}},p={render:function(){var t=this,o=t.$createElement,r=t._self._c||o;return r("div",{staticClass:"group-order-detail-wraper"},[r("div",{staticClass:"detail-mesg-item-wraper"},[r("div",{staticClass:"first-detail-mesg-item"},[r("p",{staticClass:"group-no-msg"},[t._v("\n        拼团号  "+t._s(t.groupInfo.groupNo)+"\n      ")]),t._v(" "),r("p",{staticClass:"o-status"},[t._v("\n        "+t._s(t.groupInfo.groupStatusStr)+"\n      ")])])]),t._v(" "),r("div",{staticClass:"detail-mesg-item-wraper"},[r("p",{staticClass:"group-no-msg"},[t._v("\n      拼团商品\n    ")]),t._v(" "),r("div",{staticClass:"second-detail-mesg-item"},[r("p",{staticClass:"goods-msg"},[t._v("\n        "+t._s(t.groupInfo.goodsNo)+" - "+t._s(t.groupInfo.platCityActivityGoodsName)+"   约"+t._s(t.groupInfo.goodsSpec)+"/份\n      ")]),t._v(" "),r("p",{staticClass:"g-o-limit-p-c"},[t._v("\n        "+t._s(t.groupInfo.joinLimitNum)+" 人团\n      ")]),t._v(" "),r("p",{staticClass:"has-p-c"},[t._v("\n        已成团 "+t._s(t.groupInfo.groupJoinedNum)+"人\n      ")])])]),t._v(" "),r("div",{staticClass:"detail-mesg-item-wraper"},[r("p",{staticClass:"group-no-msg"},[t._v("\n      成团时间\n    ")]),t._v(" "),r("div",{staticClass:"third-detail-mesg-item"},[r("p",[r("span",[t._v("成团时长：")]),r("span",{staticClass:"color-2-bold"},[t._v(t._s(t.groupInfo.lastFor)+" 分钟")])]),t._v(" "),r("p",{staticClass:"ml50"},[r("span",[t._v("开团时间：")]),r("span",{staticClass:"color-2-bold"},[t._v(t._s(t.groupInfo.createTime))])]),t._v(" "),r("p",{staticClass:"ml50"},[r("span",[t._v("成团时间：")]),r("span",{staticClass:"color-2-bold"},[t._v(t._s(t.groupInfo.successTime))])])])]),t._v(" "),r("div",{staticClass:"detail-mesg-item-wraper"},[r("p",{staticClass:"group-no-msg"},[t._v("\n      成团订单\n    ")]),t._v(" "),r("div",{staticClass:"fourth-detail-mesg-item"},[r("el-table",{staticClass:"fixed-height",staticStyle:{width:"100%"},attrs:{"empty-text":"没有查询到您想要的数据",data:t.groupOrderList,size:"small"}},[r("el-table-column",{attrs:{"min-width":"178px",prop:"orderNo",label:"订单号"},scopedSlots:t._u([{key:"default",fn:function(o){return[20===t.groupInfo.groupStatus?r("div",{staticClass:"order-id"},[r("router-link",{attrs:{to:o.row.redirectUrl,target:"_blank"}},[t._v(t._s(o.row.orderNo))])],1):r("div",[t._v(t._s(o.row.orderNo))])]}}])}),t._v(" "),r("el-table-column",{attrs:{"min-width":"86px",prop:"orderType",label:"配送类型",formatter:t.orderTypeFormater}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"130px",prop:"storeName",label:"所属门店"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"120px",prop:"receiverName",label:"收货人",formatter:t.emptyValFormater}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"120px",prop:"receiverPhone",label:"收货手机",formatter:t.emptyValFormater}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"86px",prop:"orderPayAmount",label:"订单实付"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"86px",prop:"orderStatusDesc",label:"订单状态"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"156px",prop:"createTime",label:"下单时间"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"156px",prop:"preDeliveryTime",label:"要求送达/自提时间",formatter:t.emptyValFormater}})],1)],1)])])},staticRenderFns:[]};var l=r("VU/8")(n,p,!1,function(t){r("rhxM")},null,null);o.default=l.exports},rhxM:function(t,o){}});
//# sourceMappingURL=85.bb7d4d5d76e7a931159d.js.map
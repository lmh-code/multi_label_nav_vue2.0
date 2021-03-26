import config from '@/utils/config'
const qualificationUrl = {
  // 供应商资质管理
  // 查询供应商资质列表
  qualificationList: `${config.reqUrl}/supplier/a/qualification/list`,
  // 查询供应商资质详情
  qualificationMsgDetail: `${config.reqUrl}/supplier/a/qualification/detail`,
  // 查询供应商资质详情
  qualificationMsgEdit: `${config.reqUrl}/supplier/a/qualification/edit`,
  // 上传供应商资质
  uploadQualification: `${config.reqUrl}/supplier/a/qualification/upload`,
  // 查询供应商商品资质列表
  supplierGoodsList: `${config.reqUrl}/supplier/a/qualification/supplierGoodsList`,
  // 查询供应商商品资质详情
  getGoodsDetail: `${config.reqUrl}/supplier/a/qualification/getGoodsDetail`,
  // 供应商商品资质上传编辑
  goodsEdit: `${config.reqUrl}/supplier/a/qualification/goodsEdit`,
  // 上传供应商商品资质
  uploadGoodsUpload: `${config.reqUrl}/supplier/a/qualification/goodsUpload`
}

export default qualificationUrl;

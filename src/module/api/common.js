/*
 * @Descripttion: 存放接口地址
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 15:22:58
 * @LastEditTime: 2020-12-10 17:02:50
 */
import config from '@/utils/config'
let baseUrl = config.reqUrl
const requestUrl = {
  getVendors: `${baseUrl}/foundation/user/vendor`, // 获取用户有权限的供应商
  getRegions: `${baseUrl}/foundation/storeGroup/areaStoreGroupList`, // 获取用户有权限的区域
  queryContractGoods: `${baseUrl}/foundation/contract/queryVendorGoodsList`, // 查询合同商品分页列表
  // 获取区域数据
  areaStoreGroupList: `${baseUrl}/foundation/storeGroup/areaStoreGroupList`,
  // 区域分类商品查询
  queryRegionCategoryGoodsList: `${baseUrl}/foundation/regionStoreGroupGoods/queryRegionCategoryGoodsList`,
  userDeliveryCenterList: `${config.reqUrl}/foundation/store/userDeliveryCenterList`, // 获取仓配中心数据
  moduleIdDetail: `${baseUrl}/supplier/a/print/detail/`, // 打印配置详情
  queryVendorGoodsPageList: `${config.reqUrl}/foundation/region/goods/info/queryVendorGoodsPageList`, // 查询供应商商品
  listByCommonCodes: `${config.reqUrl}/foundation/businessConfig/listByCommonCodes`, // 根据批量CommonCode查询
  userAreaStoreGroupList: `${config.reqUrl}/foundation/storeGroup/userAreaStoreGroupList`, // 获取区域数据
  queryStoreBySv: `${config.reqUrl}/foundation/store/queryStoreBySv` // 查询供应商分店 
}
export default requestUrl

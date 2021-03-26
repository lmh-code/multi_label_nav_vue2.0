import config from '@/utils/config'
let BASEURL = config.reqUrl
const perfectSCMUrl = {
  // 检查应商名称是否存在[创建供应链账号之前调用]
  checkVendorName: `${BASEURL}/supplier/p/vendor/checkVendorName`, 
  // 创建供应链账号（通过短信验证码）
  createVendorAccountBySmsCode: `${BASEURL}/foundation/p/user/createVendorAccountBySmsCode`, 
  // 获取URL跳转信息
  getUrlGuide: `${BASEURL}/supplier/vendor/getUrlGuide`, 
  // 获取供应商信息
  vendorInfo: `${BASEURL}/supplier/vendor/vendorInfo`, 
  // 新增供应商信息
  perfectSCMInfo: `${BASEURL}/supplier/vendor/add`, 
  // 修改供应商信息 
  editSCMInfo: `${BASEURL}/supplier/vendor/edit`,
  // 修改供应商状态
  editVendorStatus: `${BASEURL}/supplier/vendor/editStatus` 
}
export default perfectSCMUrl

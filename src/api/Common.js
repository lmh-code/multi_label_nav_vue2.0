import config from '@/utils/config'
let BASEURL = config.reqUrl
const commonUrl = {
  // 通过指定code获取共通资料中的信息
  listByCommonCodes: `${BASEURL}/foundation/businessConfig/listByCommonCodes`,
  // 获取菜单 
  queryMenu: `${BASEURL}/foundation/user/func/list`, 
  // 查询用户系统列表
  sysList: `${BASEURL}/foundation/user/systemType/list`, 
  login: `${BASEURL}/authorization/login`, 
  // 修改密码
  modifyPwd: `${BASEURL}/foundation/user/selfPassword/update`, 
  // 获取短信验证码
  smsCode: `${BASEURL}/authorization/verificationCode/smsCode/`, 
  // 通过手机号修改密码
  updatePasswordBySmsCode: `${BASEURL}/backstage/p/user/updatePasswordBySmsCode`, 
  // 【供应商端】获取短信验证码，用来修改密码
  vendorSmsCodeForUpdPwd: `${BASEURL}/authorization/verificationCode/vendorSmsCodeForUpdPwd`, 
  // 【供应商端】通过手机号修改供应商密码
  updateVendorPasswordBySmsCode: `${BASEURL}/foundation/p/user/updateVendorPasswordBySmsCode`, 
  // 获取钉钉appid和回调url
  qrParams: `${BASEURL}/authorization/p/ding/appId`,
  // 获取区域城市信息
  regionTree: `${BASEURL}/foundation/region/regionTree`, 
  // 通用控件-一级分类 
  getFirstCategory: `${BASEURL}/foundation/a/category/boom/list1`, 
  // 获取省份信息
  provinceList: `${BASEURL}/foundation/region/provinceList`, 
  // 根据省份获取市的信息
  cityList: `${BASEURL}/foundation/region/cityList/`, 
  // 获取银行信息
  bankList: `${BASEURL}/foundation/bank/list`,
  getUserAccountSetList: `${config.reqUrl}/nfmsservice/userAuthor/getUserAccountSetList`, // 【FMS专用接口】根据用户搜索可操作结算主体列表接口
  // 获取用户有权限的城市列表信息
  userStoreCityList: `${config.reqUrl}/foundation/store/userStoreCityList`
}
export default commonUrl

import config from '@/utils/config'
// 设置baseUrl
let baseUrl = config.reqUrl
// 登录相关接口
const commonUrl = {
  queryMenu: "/foundation/user/func/list", // 获取菜单
  sysList: '/foundation/user/systemType/list', // 查询用户系统列表
  token: baseUrl + '/authorization/login', // 登录
  modifyPwd: '/foundation/user/selfPassword/update' // 修改密码
}
export default commonUrl

/*
 * 切记： 初始化业务git不能删除此文件
 * @Descripttion: 配置文件，会影响到项目配置
 * port {number} 本地调试端口号，默认8081
 * baseRouter {string} 根路由，不传便为默认根路径
 * sysName {string} 系统名称
 * clientId {number} 每一个系统所对应的id 获取系统菜单时用
 * logoImgUrl {string} 系统logo
 * loginBgImgUrl {string} 登录页背景图
 * visibleChangePlatform {boolean}是否显示菜单顶部的切换系统的按钮
 * loginTypeIncludes {array} 扩展登录形式 默认账号密码，dd/phone/forget/scm 钉钉扫码登录/手机验证登录/忘记密码/供应商入驻 
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 17:34:59
 * @LastEditTime: 2020-12-28 16:37:49
 */
module.exports = {
  port: 8081, // 本地调试端口号，默认8081
  sysName: '供应商系统', // 系统名称
  baseRouter: '', // 根路由，不传便为默认根路径
  clientId: 6,
  logoImgUrl: 'http://retailimg01.benlailife.com/67646067f6cb4f249aa6e0944880a281.jpg', // 系统logo
  loginBgImgUrl: '', // 登录页背景图
  visibleChangePlatform: false, // 是否显示菜单顶部的切换系统的按钮
  loginTypeIncludes: ['phone', 'forget', 'scm'] // 扩展登录形式
}

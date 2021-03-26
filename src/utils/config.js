/*
 * @Descripttion: 系统引用配置文件
 * maxTags {number} 默认值30   顶部tab标签最多可打开多少个tab，超出控制范围，系统会自动释放缓存单不清除tab标签，后期可根据系统配置来配置
 * reqUrl {string} 请求需要的根路径
 * sysStr {string} 系统当前所处环境
 * port {number} 本地调试端口号，默认8081
 * baseRouter {string} 根路由，不传便为默认根路径
 * sysName {string} 系统名称
 * clientId {number} 每一个系统所对应的id 获取系统菜单时用
 * logoImgUrl {string} 系统logo
 * loginBgImgUrl {string} 登录页背景图
 * visibleChangePlatform {boolean}是否显示菜单顶部的切换系统的按钮
 * loginTypeIncludes {array} 扩展登录形式 默认账号密码，dd/phone/forgetPass/scm 钉钉扫码登录/手机验证登录/忘记密码/供应商入驻 
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-10-21 14:26:30
 * @LastEditTime: 2020-12-18 17:06:37
 */
let reqUrl = 'https://api-blx-test.benlai.com'
let boomdebug = 'https://api-blx-test.benlai.com/boomdebug'
let sysStr = 'local环境'
let environment = 'test'
const testHost = ['192.168.60.155:5555', '192.168.60.155:6161', '192.168.60.155:6222'] // 测试环境域名
const preHost = ['newretail.benlai.com', 'supplier-pre.benlai.com', '192.168.114.45:6222'] // 预发布环境域名
const prodHost = ['retail.benlai.com', 'supplier.benlai.com'] // 线上环境域名
// test dev trunk
if (window && window.location && testHost.includes(window.location.host)) {
  reqUrl = 'https://api-blx-test.benlai.com'
  boomdebug = 'https://api-blx-test.benlai.com/boomdebug'
  sysStr = '测试环境'
  environment = 'test'
}
// 预发布环境
if (window && window.location && preHost.includes(window.location.host)) {
  reqUrl = 'https://api-blx-pre.benlai.com'
  boomdebug = 'https://api-blx-pre.benlai.com'
  sysStr = '预发环境'
  environment = 'pre'
}
// 生产环境
if (window && window.location && prodHost.includes(window.location.host)) {
  reqUrl = 'https://api-blx.benlai.com'
  boomdebug = 'https://api-blx.benlai.com'
  sysStr = '生产环境'
  environment = 'prod'
}

const moduleCon = require('../module/module.config')
export default {
  maxTags: 30,
  reqUrl,
  sysStr,
  environment,
  boomdebug,
  port: moduleCon.port,
  baseRouter: moduleCon.baseRouter,
  homeRouter: moduleCon.homeRouter,
  sysName: moduleCon.sysName,
  clientId: moduleCon.clientId,
  logoImgUrl: moduleCon.logoImgUrl,
  loginBgImgUrl: moduleCon.loginBgImgUrl,
  visibleChangePlatform: moduleCon.visibleChangePlatform,
  loginTypeIncludes: moduleCon.loginTypeIncludes && moduleCon.loginTypeIncludes.length ? moduleCon.loginTypeIncludes : []
}


const rootCon = require('../../rootCon')
// 默认本地开发环境
let reqUrl = 'https://api-blx-test.benlai.com'
let sysStr = 'local环境'
// test dev trunk
if (window && window.location.host === '192.168.60.47:5555') {
  reqUrl = 'https://api-blx-test.benlai.com'
  sysStr = '测试环境'
}

// 预发布环境
if (window && window.location.hostname === 'newretail.benlai.com') {
  reqUrl = 'https://api-blx-pre.benlai.com'
  sysStr = '预发环境'
}
// 生产环境
if (window && window.location.hostname === 'retail.benlai.com') {
  reqUrl = 'https://api-blx.benlai.com'
  sysStr = '生产环境'
}

const pageSizeStart10 = [10, 150, 300, 450, 600]
const pageSizeStart20 = [20, 150, 300, 450, 600]
const baseRouter = rootCon.baseRouter
const sysName = rootCon.sysName
const clientId = rootCon.clientId
module.exports = {
  reqUrl,
  sysStr,
  pageSizeStart10,
  pageSizeStart20,
  baseRouter,
  sysName,
  clientId
}


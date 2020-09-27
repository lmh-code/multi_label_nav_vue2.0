/*
 * @Descripttion: 需要根据每一个模块在config中的配置来配置
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 16:25:27
 * @LastEditTime: 2020-09-27 16:33:33
 */

const moduleConfig = require('./src/module/config')
const baseRouter = moduleConfig.baseRouter || '/'
const sysName = moduleConfig.sysName || ''
const clientId = moduleConfig.clientId || 1
const port = moduleConfig.port || 8081
module.exports = {
  baseRouter,
  sysName,
  clientId,
  port
}

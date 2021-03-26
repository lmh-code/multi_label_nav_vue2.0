/*
 * @Descripttion: 可动态获取port和baseRouter，动态修改webpack中的配置
 * port {number} 本地调试端口号 默认8081
 * baseRouter {string} 根路由，为空默认根路径
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 16:25:27
 * @LastEditTime: 2021-03-26 10:49:26
 */
const fs = require("fs")
fs.access('./src/module/module.config.js', function(err, fd) {
  console.log("!err && fd: ", !err && fd);
})
const moduleConfig = require('./src/module/module.config.js');
module.exports = {
  port: moduleConfig.port || 8081,
  baseRouter: moduleConfig.baseRouter
}

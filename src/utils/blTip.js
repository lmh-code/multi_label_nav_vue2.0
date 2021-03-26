import {Message, Notification} from 'element-ui'
/**
 * @description: 消息提示框
 * @param {string} message 消息内容
 * @param {string} type 消息展示类型 info/error/success/warning
 * @param {boolean} showClose 是否展示可关闭按钮
 * @return {*}
 */
function message(message, type = 'info', showClose = true) {
  if(message) {
    Message({
      showClose,
      message,
      type
    })
  }
}
/**
 * @description: 关闭所有message通知
 */
function closeAllMsg() {
  Message.closeAll()
}

/**
 * @description: 消息提示框右侧弹出
 * @param {string} title 标题头部
 * @param {string} message 消息内容
 * @param {string} type 消息展示类型 info/error/success/warning
 * @param {boolean} showClose 是否展示可关闭按钮
 * @param {string} position 自定义弹出位置 top-right/top-left/bottom-right/bottom-left
 * @return {*}
 */
function notify(message, type = 'info', title = '温馨提示', showClose = true, position = 'top-right') {
  if(message) {
    Notification({
      title,
      message,
      type,
      showClose,
      position
    });
  }
}
/**
 * @description: 关闭所有的notify通知
 */
function closeAllNotify() {
  Notification.closeAll()
}

export default {
  message,
  notify,
  closeAllMsg,
  closeAllNotify
}

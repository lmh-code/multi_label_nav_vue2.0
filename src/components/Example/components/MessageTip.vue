<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">8. Tip消息通知组件</p>
    <p>Tip消息通知组件展示说明</p>
    <p class="mt20 sub-title">8.1 Message通知展示示例</p>
    <div class="mt10">
      <el-button type="success" @click="messageTip('成功提示', 'success', true)" size="mini">成功提示</el-button>
      <el-button type="success" @click="messageTip('成功提示不显示关闭按钮', 'success', false)" size="mini">成功提示不显示关闭按钮</el-button>
      <pre class="mt10 code">
        this.$tip.message('成功提示', 'success', true)
        <br>
        this.$tip.message('成功提示不显示关闭按钮', 'success', false)
      </pre>
    </div>
    <div class="mt10">
      <el-button type="warning" @click="messageTip('警告提示', 'warning')" size="mini">警告提示</el-button>
      <pre class="mt10 code">
        this.$tip.message('警告提示', 'warning')
      </pre>
    </div>
    <div class="mt10">
      <el-button type="danger" @click="messageTip('错误提示', 'error')" size="mini">错误提示</el-button>
      <pre class="mt10 code">
        this.$tip.message('错误提示', 'error')
      </pre>
    </div>
    <div class="mt10">
      <el-button @click="messageTip('默认提示')" size="mini">默认提示</el-button>
      <pre class="mt10 code">
        this.$tip.message('默认提示')
      </pre>
    </div>
    <div class="mt10">
      <el-button type="primary" @click="closeAllMsg()" size="mini">清除所有message提示</el-button>
      <pre class="mt10 code">
        this.$tip.closeAllMsg()
      </pre>
    </div>

    <p class="mt20 sub-title">8.2 Notification通知展示示例</p>
    <div class="mt10">
      <el-button type="success" @click="notificationTip('成功提示', 'success')" size="mini">成功提示</el-button>
      <pre class="mt10 code">
        this.$tip.notify('成功提示', 'success')
      </pre>
    </div>
    <div class="mt10">
      <el-button type="warning" @click="notificationTip('警告提示', 'warning', '温馨提示')" size="mini">警告提示</el-button>
      <pre class="mt10 code">
        this.$tip.notify('警告提示', 'warning', '温馨提示')
      </pre>
    </div>
    <div class="mt10">
      <el-button type="danger" @click="notificationTip('系统提示', 'error', '系统提示')" size="mini">错误提示</el-button>
      <pre class="mt10 code">
        this.$tip.notify('错误提示', 'error', '系统提示')
      </pre>
    </div>
    <div class="mt10">
      <el-button @click="notificationTip('默认提示')" size="mini">默认提示</el-button>
      <pre class="mt10 code">
        this.$tip.notify('默认提示')
      </pre>
    </div>
    <div class="mt10">
      <el-button type="primary" @click="closeAllNotify()" size="mini">清除所有notification提示</el-button>
      <pre class="mt10 code">
        this.$tip.closeAllNotify()
      </pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    /**
     * @description: 消息提示框
     * @param {string} message 消息内容
     * @param {string} type 消息展示类型 info/error/success/warning
     * @param {boolean} showClose 是否展示可关闭按钮
     * @return {*}
     */
    messageTip(message, type = 'info', showClose = true) {
      this.$tip.message(message, type, showClose)
    },
    /**
     * @description: 消息提示框右侧弹出
     * @param {string} title 标题头部
     * @param {string} message 消息内容
     * @param {string} type 消息展示类型 info/error/success/warning
     * @param {boolean} showClose 是否展示可关闭按钮
     * @param {string} position 自定义弹出位置 top-right/top-left/bottom-right/bottom-left
     * @return {*}
     */
    notificationTip(message, type = 'info', title = '温馨提示', showClose = true, position = 'top-right') {
      this.$tip.notify(message, type, title, showClose, position)
    },
    closeAllMsg() {
      this.$tip.closeAllMsg()
    },
    closeAllNotify() {
      this.$tip.closeAllNotify()
    }
  }
}
</script>

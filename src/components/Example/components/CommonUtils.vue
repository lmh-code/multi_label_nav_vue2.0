<style scoped lang="less">
  @import "../style.less";
</style>
<template>
  <div>
    <p class="title">9. 通用方法</p>
    <p>通用方法展示说明</p>
    <p class="mt20 sub-title">9.1 全局loading显示隐藏展示示例</p>
    <div class="mt10">
      <el-button type="primary" @click="showLoading" size="mini">显示全局loading，2s后消失</el-button>
      <pre class="mt10 code">
        this.$loading.show()
        setTimeout(() => {
          this.$loading.hide()
        }, 2000);
      </pre>
    </div>
    <div class="mt10">
      <el-button size="mini">隐藏全局loading</el-button>
      <pre class="mt10 code">
        this.$loading.hide()
      </pre>
    </div>

    <p class="mt20 sub-title">9.2 ajax请求示例</p>
    <p class="tip">以下使用方式为基本使用方式，如有特殊需求，请查看 /src/utils/request 文件中封装的内容</p>
    <div class="mt10">
      <p>get请求</p>
      <pre class="mt10 code">
        this.$http.get('请求地址', '参数')
        .then(res=>{
          // 请求发送成功
        }) <br/>
        .catch(e=>{
          // 请求发送失败
        })
      </pre>
    </div>
    <div class="mt10">
      <p>post请求</p>
      <pre class="mt10 code">
        this.$http.post('请求地址', '参数')
        .then(res => {
          // 请求发送成功
        })
        .catch(e => {
          // 请求发送失败
        })
      </pre>
    </div>

    <p class="mt20 sub-title">9.3 localStorage使用</p>
    <div class="mt10">
      <p>localStorage使用说明</p>
      <pre class="mt10 code">
        this.$storage.set('缓存的key值', '要缓存的内容') // 设置缓存内容
        this.$storage.get('缓存的key值') // 获取缓存内容
        this.$storage.remove('缓存的key值') // 根据key值清除缓存内容
        this.$storage.clear() // 清除所有的缓存内容
      </pre>
    </div>

    <p class="mt20 sub-title">9.3 validate使用</p>
    <p class="tip">以下使用方式为基本使用方式，如有特殊需求，请查看 /src/utils/validate 文件中封装的内容</p>
    <div class="mt10">
      <p>validate基本验证的使用说明</p>
      <pre class="mt10 code">
        /**
        * @description: 检查传入的内容是否是指定类型
        * @param o {any} 被检查的内容
        * @param type {any} 是否是指定的类型。
        * @param type {any} String(是否是字符串)
        * @param type {any} Boolean(是否boolean)
        * @param type {any} Number(是否数字)
        * @param type {any} Null(是否为null)
        * @param type {any} Undefined(是否undefined)
        * @param type {any} Function(是否函数
        * @param type {any} Object(是否对象)
        * @param type {any} Array(是否数组)
        * @param type {any} Date(是否时间)
        * @param type {any} RegExp(是否是正则)
        * @param type {any} Symbol(是否是Symbol函数)
        * @param type {any} Promise(是否是Promise对象)
        * @param type {any} Set(是否是Set对象)
        * @return: {boolean} true：是；false：否
        */
        this.$validate.isCheckType('被检查的内容', '指定的类型')
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 检查是否为false
        * @param o {any} 被检查的内容
        * @return: {boolean} true：是；false：否
        */
        this.$validate.isFalse('被检查的内容') 
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 检查是否为true
        * @param o {any} 被检查的内容
        * @return: {boolean} true：是；false：否
        */
        this.$validate.isTrue('被检查的内容')
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 获取设备系统型号
        * @return: {String} navigator.userAgent 包含设备系统型号 
        * Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
        */
        this.$validate.userAgent()
        <br/>
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 检测是不是PC端
        * @param {type} 
        * @return: {boolean} true：是；false：否
        */
        this.$validate.isPC()
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 检查传入内容是不是指定类型
        * @param str {any} 被检测内容
        * @param type {string} 指定类型。
        * @param type {string} phone(大陆手机号)
        * @param type {string} tel(座机)
        * @param type {string} card(身份证)
        * @param type {string} pwd(密码以字母开头，长度在8~28之间，只能包含字母、数字和下划线)
        * @param type {string} postal(邮政编码)
        * @param type {string} QQ(qq号)
        * @param type {string} email(邮箱)
        * @param type {string} money(金额(小数点2位))
        * @param type {string} URL(网址)
        * @param type {string} IP(IP地址)
        * @param type {string} number(数字)
        * @param type {string} english(纯英文)
        * @param type {string} chinese(中文)
        * @param type {string} lower(小写)
        * @param type {string} upper(大写)
        * @return: true / false
        */
        this.$validate.checkStr(str, type)
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 严格的身份证校验
        * @param sId {type} 身份证id
        * @return: 
        */
        this.$validate.isCardID(sId)
      </pre>

      <p class="mt20 sub-title">9.4 tab标签页刷新和跳转通用方法</p>
      <p class="tip">以下使用方式为基本使用方式，如有特殊需求，请查看 /src/utils/route 文件中封装的内容</p>
      <pre class="mt10 code">
        /**
        * 路由刷新
        * @param route {string|route} 需要刷新的路由，不传时为当前路由，如果是字符串时请确保以'/'开头
        * @param replace {boolean}    是否使用replace进行跳转
        * @return {Promise}           返回vue-router跳转的结果
        */
        this.$jump.refreshPage(route, replace)
      </pre>
      <pre class="mt10 code">
        /**
        * 已经被缓存的路由刷新
        * @param route {string|route} 需要刷新的路由，不传时为当前路由，如果是字符串时请确保以'/'开头
        * @param replace {boolean}    是否使用replace进行跳转
        * @return {Promise}           返回vue-router跳转的结果
        */
        this.$jump.refreshCachePage(route, replace)
      </pre>
      <pre class="mt10 code">
        /**
        * 关闭当前页，如果传入next则跳转到next页面
        * @param next 跳转的目标页面，作为第一个参数传入vue-router.replace
        * @return 仅在next有值时，返回vue-router.replace的结果
        */
        this.$jump.closeCurrentPage(next)
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 设置列表页重新获取列表数据表示（一般详情编辑成功调用）
        * @param {*} key 页面路由, 此值不可为空
        * @return {*}
        */
        this.$jump.research(key)
      </pre>
      <pre class="mt10 code">
        /**
        * @description: 清除列表页重新获取列表数据表示（一般列表页面research成功后调用）
        * @param {*} key 页面路由, 此值不可为空
        * @return {*}
        */
        this.$jump.researched(key)
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
    // 显示全局loading，2s后消失
    showLoading() {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 2000);
    }
  }
}
</script>

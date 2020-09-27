import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import request from './utils/request'
import '../static/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI)
Vue.use(Vuex);
Vue.prototype.$http = request

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

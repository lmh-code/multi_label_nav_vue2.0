import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import request from './utils/request'
import loading from './utils/loading'
import blTip from './utils/blTip'
import blRoute from './utils/route'
import * as blValidate from './utils/validate'
import blStorage from './utils/localStorage'
import '../static/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/base.less'
import BlTable from './components/Common/Table/BlTable.vue'
import BlPagination from './components/Common/Table/BlPagination.vue'
import BlView from './components/Common/DomElement/BlView.vue'
import BlFormView from './components/Common/DomElement/BlFormView.vue'
import BlOptionsView from './components/Common/DomElement/BlOptionsView.vue'
import BlTableView from './components/Common/DomElement/BlTableView.vue'
import AutoComplete from './components/Common/AutoComplete/auto-complete.vue'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI)
Vue.use(Vuex);
Vue.prototype.$http = request
Vue.prototype.$loading = loading
Vue.prototype.$tip = blTip
Vue.prototype.$jump = blRoute
Vue.prototype.$validate = blValidate
Vue.prototype.$storage = blStorage

Vue.config.productionTip = false

Vue.component('bl-table', BlTable)
Vue.component('bl-pagination', BlPagination)
Vue.component('bl-form-view', BlFormView)
Vue.component('bl-options-view', BlOptionsView)
Vue.component('bl-table-view', BlTableView)
Vue.component('auto-complete', AutoComplete)
Vue.component('bl-view', BlView)

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

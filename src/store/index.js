import Vue from 'vue';
import Vuex from 'vuex';
import modulesStore from '../module/store';
const modulesFiles = require.context("./modules", true, /\.js|.ts$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    ...modules,
    ...modulesStore
  }
})

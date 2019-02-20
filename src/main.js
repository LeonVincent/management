import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/common.css'
import './common/js/jquery.js'
import './permission.js'
import store from './store'
// 引用API文件
import api from './api/index.js'
Vue.use(VueResource)
Vue.use(ElementUI)


// 将API方法绑定到全局
Vue.prototype.$api = api;
// Vue.prototype.$http = axios;




Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

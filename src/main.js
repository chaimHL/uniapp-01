import Vue from 'vue'
import App from './App'
import request from './utils/request.js'
import to from 'await-to-js';

Vue.config.productionTip = false

Vue.prototype.request = request
Vue.prototype.to = to

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

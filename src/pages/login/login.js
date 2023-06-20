import Vue from 'vue'
import login from './login.vue'
import store from '../../store'
import axios from 'axios'
Vue.config.productionTip = false

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(login)
}).$mount('#login')

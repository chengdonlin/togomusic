// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import init from '../static/js/init'
import pubSub from 'pubsub-js'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue)
//初始化


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  data(){
    return{
      p: null
    }
  },
  created () {
    this.$nextTick(()=>{
      init()
    })
  },
  mounted(){
    this.p = pubSub.subscribe("status",(message,data)=>{
      this.$store.commit('IdentityOptions/SET_IDENTITY', data)
    })
  },
  beforeDestroy(){
    pubSub.unsubscribe(this.p)
  }
}).$mount('#app')

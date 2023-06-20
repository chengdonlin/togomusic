import Vue from 'vue'
import player from './player.vue'
import store from '../../store/index'
import axios from 'axios'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'
import init from '../../../static/js/init'
import pubSub from 'pubsub-js'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#player',
  store,
  render: h => h(player),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  created () {
    this.$nextTick(()=>{
      init()
    })
  },
  mounted(){
    pubSub.subscribe("status",(message,data)=>{
      this.$store.commit('IdentityOptions/SET_IDENTITY', data)
    })
  }
})
console.log('这是player页面')

<template>
    <div class="header_opt">
        <span class="mod_login">
            <a :class="status?'top_login__link':'login_link'" @click="loginWindow" @mouseenter="openUserInfo" @mouseleave="closeUserInfo">{{status? '':'登录'}}
              <img :src="info.imgSrc.headurl" v-if="status"  class="top_login__cover"/>
              <img src="https://y.qq.com/mediastyle/yqq/img/login_qq.png?max_age=2592000" v-if="status" class="top_login__icon"/>
            </a>
            <div class="mod_select mod_select_green mod_select--open">
                <a class="select_choose">开通VIP</a>
                <ul class="select_box se1">
                    <li class="select_item" title="开通绿钻豪华版">开通绿钻豪华版</li>
                    <li class="select_item" title="开通付费包">开通付费包</li>
                </ul>
            </div>
            <div class="mod_select mod_select--pay">
                <a class="select_choose">充值</a>
                <ul class="select_box se2">
                    <li class="select_item" title="乐币用途： 用于购买数字专辑、支持明星打榜、TME Live等">购买乐币</li>
                    <li class="select_item" title="饭票用途： 用于在直播中赠送礼物、开通粉丝团、购买贵族等">充值饭票</li>
                </ul>
            </div>
        </span>
      <div class="popup_user" :class="{drop: isShow}" @mouseenter="openUserInfo" @mouseleave="closeUserInfo" v-if="Identity">
        <div class="popup_user_data">
          <a class="popup_user_data__cover_link">
            <img :src="info.imgSrc.headurl" class="popup_user_data__cover" alt="">
            <img src="//y.qq.com/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="popup_user_data__icon">
          </a>
          <div class="popup_user_data__cont">
            <div class="popup_user_data__name">
              <a>{{info.imgSrc.nick}}</a>
            </div>
            <div class="popup_user_data__lv">
              <a href="//y.qq.com/portal/vipportal/index.html" target="_blank" rel="noopener noreferrer">
                <img src="//y.qq.com/mediastyle/lv-icon/v10/vip/2x/svip2.png?max_age=2592000" alt="绿钻2级" class="popup_user_data__lv_icon">
              </a>
              <a href="//y.qq.com/vip/fufeibao/index.html" target="_blank" rel="noopener noreferrer">
                <img src="//y.qq.com/mediastyle/lv-icon/v10/pay/2x/sui1.png?max_age=2592000" alt="付费音乐包1级" class="popup_user_data__lv_icon">
              </a>
            </div>
          </div>
        </div>
        <div class="popup_user_toolbar">
          <div class="popup_user_toolbar__item">
            <div class="popup_user_toolbar__tit">
              <a href="//y.qq.com/portal/vipportal/index.html" target="_blank" rel="noopener noreferrer">绿钻豪华版</a>
            </div>
            <div class="popup_user_toolbar__desc c_tx_thin">{{info.msg.eightEndTime}} 到期</div>
            <a class="mod_btn_green popup_user_toolbar__btn_vip">续费</a>
          </div>
          <div class="popup_user_toolbar__item">
            <div class="popup_user_toolbar__tit">
              <a href="//y.qq.com/portal/msg_center.html#stat=y_new.top.pop.msg_center">评论通知</a>
            </div>
          </div>
          <div class="popup_user_toolbar__item">
            <div class="popup_user_toolbar__tit" @click="logOut">
              <a>退出登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import createLoginPage from '../../../../static/js/commonUtil'
import {mapState} from 'vuex'
export default {
  name: 'vueLogin',
  data(){
    return{
      info: null,
      isShow: false
    }
  },
  methods: {
    loginWindow () {
      createLoginPage.createLoginPage()
    },
    openUserInfo(){
      if(sessionStorage.getItem('OnlineStatus') === 'true'){
        this.isShow = true
      }
    },
    closeUserInfo(){
      if(sessionStorage.getItem('OnlineStatus') === 'true'){
        this.isShow = false
      }
    },
    logOut(){
      document.cookie = 'loginCookie='
      location.reload()
    }
  },
  computed:{
    status(){
      if(this.Identity){
        return this.info.imgSrc !== null
      }
      return false
    },
    ...mapState('IdentityOptions',['Identity'])
  },
  mounted () {
    // this.$bus.$on('handleImg',(data)=>{
    //   console.log('收到数据'+data)
    // })
  },
  watch:{
    Identity:{
      deep:true,
      handler(){
        this.info = this.Identity
      }
    }
  }
}
</script>

<style scoped>
    .top_login__link {
      position: relative;
      font-size: 16px;
      float: left;
      width: 38px;
      margin-right: 10px;
      text-align: center;
      height: 90px;
    }
  .top_login__cover {
      width: 38px;
      height: 38px;
      border-radius: 90px;
      vertical-align: -14px;
      margin-top: 24px;
    }
    .top_login__icon {
      position: absolute;
      width: 14px;
      height: 14px;
      bottom: 24px;
      right: -2px;
    }
    .header_opt, .mod_login {
        height: 90px;
        line-height: 90px;
    }
    .login_link:hover{
        color: #31c27c;;
    }
    .header_opt {
        position: absolute;
        top: 0;
        right: 0;
    }
    .mod_login {
        display: block;
        font-size: 0;
    }
    .mod_login .login_link{
        position: relative;
        font-size: 16px;
        float: left;
        width: 38px;
        margin-right: 10px;
        text-align: center;
        height: 90px;
    }
    .mod_select--open {
        width: 122px;
    }
    .mod_select {
        float: left;
        position: relative;
        height: 38px;
        font-size: 13px;
        margin-top: 24px;
    }
    .mod_select_green .select_choose, .select_choose:hover, .select_item:hover {
        background-color: #31c27c;
        color: #fff;
        border-color: #31c27c;
    }
    .select_choose {
        display: block;
        line-height: 38px;
        padding: 0 15px 0 10px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #c9c9c9;
        border-radius: 3px;
    }
    .select_box {
        display: none;
        position: absolute;
        width: 100%;
        left: 0;
        top: 38px;
        z-index: 10;
    }
    .select_box .select_item:first-of-type {
        border-top: 1px solid #c9c9c9;
    }
    .select_item {
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        background-color: #fff;
        border: 1px solid #c9c9c9;
        border-top: none;
    }
    .mod_select--pay {
        width: 83px;
        margin-left: 10px;
    }
    .select_choose:after {
        position: absolute;
        content: "";
        right: 8px;
        top: 16px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 6px solid;
    }
    .mod_select_green:hover .select_choose:after, .mod_select--pay:hover .select_choose:after{
        border-top: none;
        border-bottom: 6px solid;
    }
    .mod_select_green:hover .select_box, .mod_select--pay:hover .select_box{
        display: block;
    }

    .mod_search_other, .mod_search_result, .popup_user {
      max-height: 0;
      visibility: hidden;
      transition: max-height .6s ease-out,visibility 1ms .6s;
      overflow: hidden;
    }
    .popup_user {
      position: absolute;
      right: 0;
      top: 90px;
      width: 288px;
      background-color: #fff;
      z-index: 9;
      line-height: 1.5;
      border: 1px solid #f2f2f2;
      font-size: 13px;
    }
    .drop {
      visibility: visible;
      max-height: 800px;
      transition: max-height .6s ease-out;
    }

    .popup_user_data {
      display: table;
      height: 84px;
      overflow: hidden;
      text-align: left;
      padding: 25px 20px 0;
    }
    .popup_user_data__cover_link {
      position: relative;
      float: left;
    }
    .popup_user_data__cover {
      float: left;
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 999px;
      margin-right: 10px;
    }
    .popup_user_data__icon {
      position: absolute;
      width: 18px;
      height: 18px;
      bottom: 0;
      right: 10px;
    }
    .popup_user_data__cont {
      display: table-cell;
      vertical-align: middle;
    }
    .popup_user_data__name {
      color: #000;
      padding: 0 0 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .popup_user_data__lv {
      white-space: nowrap;
      margin-bottom: 6px;
    }
    .popup_user_data__lv_icon {
      margin-top: -7px;
      height: 23px;
    }
    .popup_user_toolbar {
      padding: 13px 20px 6px;
      font-size: 15px;
    }
    .popup_user_toolbar__item {
      position: relative;
      margin-bottom: 16px;
    }
    .popup_user_toolbar__tit a {
      display: inline-block;
      line-height: 22px;
    }
    .popup_user_toolbar__desc {
      font-size: 12px;
      height: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 85%;
    }
    .mod_btn, .mod_btn_green {
      border-radius: 2px;
      font-size: 14px;
      margin-right: 6px;
      padding: 0 23px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
      white-space: nowrap;
      box-sizing: border-box;
      overflow: hidden;
    }
    .popup_user_toolbar__btn_vip {
      position: absolute;
      top: 5px;
      right: 0;
      height: 30px;
      line-height: 30px;
      width: 70px;
      padding: 0;
      text-align: center;
      margin-right: 0;
    }

    .mod_btn_green {
      border: 1px solid #31c27c;
      background-color: #31c27c;
      color: #fff!important;
    }
    a:hover{
      color: #31c27c;
    }
</style>

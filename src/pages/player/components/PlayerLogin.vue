<template>
    <div class="mod_player_login">
      <a class="player_login__link">
        <img v-if="LoginStatus && info" :src="info?info.imgSrc.headurl : null" class="player_login__cover">
        <img v-if="LoginStatus && info" src="//y.qq.com/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="player_login__icon">
        <span class="player_login__txt">{{LoginStatus? info?info.imgSrc.nick : '登录' : '登录'}}</span>
      </a>
      <a class="player_login__link player_login__link--set">
        <span class="player_login__txt">设置</span>
      </a>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'PlayerLogin',
  data(){
    return{
      LoginStatus: false,
      info: null
    }
  },
  computed:{
    ...mapState('IdentityOptions',['Identity'])
  },
  watch:{
    Identity:{
      deep:true,
      handler(){
        this.info = this.Identity
      }
    }
  },
  mounted () {
    //判断登录状态
    if(sessionStorage.getItem('OnlineStatus')){
      this.LoginStatus = true
    }
  }
}
</script>

<style scoped>
  .mod_player_login {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9;
    text-align: right;
    padding-right: 28px;
  }
  .player_login__link {
    position: relative;
    float: left;
    margin-right: 15px;
    font-size: 0;
  }
  .player_login__link .player_login__txt {
    display: inline-block;
    max-width: 124px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    font-size: 14px;
  }
  .player_login__out, .player_login__txt {
    color: #fff;
    opacity: .3;
    filter: alpha(opacity=30);
    line-height: 30px;
  }
  .player_login__txt:hover {
    opacity: 1;
  }
  .player_login__cover {
    width: 30px;
    height: 30px;
    border-radius: 90px;
    margin-right: 5px;
    vertical-align: -10px;
  }
  .player_login__icon {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 18px;
    left: 18px;
  }

</style>

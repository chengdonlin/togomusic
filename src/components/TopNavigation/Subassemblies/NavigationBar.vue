<template>
    <ul class="mod_nav">
        <li class="nav_item">
          <router-link class="nav_link" active-class="nav_link--current"  ref="" title="音乐馆" to="/index">音乐馆</router-link>
        </li>
        <li class="nav_item">
          <router-link class="nav_link" active-class="nav_link--current" title="我的音乐"
                       :to="toPath">我的音乐</router-link>
        </li>
        <li class="nav_item nav_item_subNav">
            <a href="/" class="nav_link" title="客户端">客户端</a>
            <img src="../../../assets/img/nav_img/mark_1.png" class="nav_mark" alt="抢特权" />
            <div class="popup client_privilege">
                <div class="popup_cont">
                    <p><i class="client_privilege__icon client_privilege__icon--hq"></i>HQ高品质 全员开启</p>
                    <p><i class="client_privilege__icon client_privilege__icon--dts"></i>独家音效 全面升级</p>
                    <p><i class="client_privilege__icon client_privilege__icon--skin"></i>轻盈视觉 动态皮肤</p>
                    <a class="client_privilege__btn">下载体验</a>
                </div>
            </div></li>
        <li class="nav_item">
            <a href="/" class="nav_link" title="开放平台">开放平台</a>
        </li>
        <li class="nav_item">
            <a href="/" class="nav_link" title="VIP">VIP</a>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'NavigationBar',
  data () {
    return {
      Order: 1
    }
  },
  computed: {
    toPath(){
      return sessionStorage.getItem('OnlineStatus')==='true'? '/login/my_home': '/login'
    }
  },
  methods: {
    changeClassName (number) {
      console.log(number)
      this.Order = number
    }
  }
}
</script>

<style scoped>
    .mod_nav {
        position: absolute;
        left: 198px;
        top: 0;
    }
    .nav_item {
        position: relative;
        float: left;
        margin-right: -5px;
    }
    .nav_link--current, .nav_link--current:hover {
        background-color: #31c27c;
        color: #fff!important;
    }
    .nav_link {
        display: block;
        padding: 0 20px;
        line-height: 90px;
        height: 90px;
        text-align: center;
        font-size: 18px;
    }
    .nav_mark {
        position: absolute;
        top: 18px;
        right: 0;
        height: 14px;
    }
    body:last-child .popup {
        border: 0;
    }
    .popup.client_privilege {
        top: 68px;
        left: 20px;
        right: auto;
        width: 160px;
        display: none;
    }
    .popup {
        position: absolute;
        top: 364px;
        right: 303px;
        width: 580px;
        background: #fff;
        box-shadow: 0 0 4px rgba(0,0,0,.35);
        border-radius: 4px;
        border: 1px solid #ddd;
        z-index: 99;
    }
    .popup.client_privilege .popup_cont {
        margin: 9px 0 18px;
        max-height: none;
        overflow-y: hidden;
    }
    .popup_cont {
        max-height: 400px;
        font-size: 14px;
        line-height: 22px;
        margin: 30px 5px 30px 10px;
        overflow-y: auto;
    }
    .popup.client_privilege .popup_cont p {
        margin-left: 16px;
        margin-right: 0;
        padding: 5px 0;
        font-size: 12px;
        color: #000;
        line-height: 1.5;
    }
    .popup_cont p {
        min-height: 22px;
        text-align: justify;
        word-break: break-all;
    }

    .popup_cont p, .popup_tit {
        margin: 0 24px 0 19px;
    }
    .client_privilege__icon--hq {
        background-position: 0 0;
    }

    .client_privilege__icon {
        display: inline-block;
        vertical-align: -3px;
        margin-right: 9px;
        width: 14px;
        height: 14px;
        background-image: url("../../../assets/img/nav_img/sprite_privilege.png");
    }
    .client_privilege__btn {
        display: block;
        margin: 6px auto 0;
        width: 135px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        color: #fff!important;
        text-align: center;
        border-radius: 25px;
        background-color: #24ccaa;
        /*background-image: linear-gradient(90deg,#24ccaa,#31c27c);*/
    }
    .nav_item:hover a{
        color: #31c27c;
    }
    .nav_item_subNav:hover  .popup{
        display: block;
    }
    .client_privilege__btn:hover {
        background-color: #31c27c;
    }
</style>

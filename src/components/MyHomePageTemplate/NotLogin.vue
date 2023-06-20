<template>
  <div>
    <div class="mod_profile_unlogin play">
      <div class="section_inner">
        <h2 class="profile_unlogin__tit">
          <div class="icon_txt">听我喜欢听的歌</div></h2>
        <div class="profile_unlogin__desc"></div>
        <a class="mod_btn_green profile_unlogin__btn">立即登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotLogin'
  }
</script>

<style scoped>
  .mod_profile_unlogin {
    height: 922px;
    background: url(https://y.qq.com/ryqq/static/media/bg_profile_unlogin.69aad5de.jpg?max_age=2592000) 50% no-repeat;
    background-size: cover;
    overflow: hidden
  }

  .profile_unlogin__desc,.profile_unlogin__tit {
    background-image: url(https://y.qq.com//ryqq/static/media/profile_tit.6c77c6d6.png?max_age=2592000);
    background-image: -webkit-image-set(url(https://y.qq.com//ryqq/static/media/profile_tit.6c77c6d6.png?max_age=2592000) 1x,url(https://y.qq.com//ryqq/static/media/profile_tit@2x.ed3e105a.png?max_age=2592000) 2x);
    margin-left: auto;
    margin-right: auto
  }

  .profile_unlogin__tit {
    width: 735px;
    height: 64px;
    background-position: 0 0;
    margin-top: 350px
  }

  .profile_unlogin__desc {
    width: 345px;
    height: 30px;
    background-position: 0 -70px;
    margin-top: 30px;
    margin-bottom: 36px
  }

  .profile_unlogin__btn {
    display: block;
    font-size: 20px;
    height: 48px;
    line-height: 48px;
    width: 128px;
    text-align: center;
    margin: 0 auto
  }

  @media screen and (max-height: 800px) {
    .mod_profile_unlogin {
      height:622px
    }

    .profile_unlogin__tit {
      margin-top: 210px
    }
  }

  @supports (-webkit-appearance: none) {
    .profile_unlogin__btn,.profile_unlogin__desc,.profile_unlogin__tit {
      opacity:0;
      -webkit-transform: translateY(60px);
      -webkit-transition: all 1s
    }

    .profile_unlogin__tit {
      -webkit-transition-delay: .1s
    }

    .profile_unlogin__desc {
      -webkit-transition-delay: .2s
    }

    .profile_unlogin__btn {
      -webkit-transition-delay: .3s;
      line-height: 49px
    }

    .play .profile_unlogin__btn,.play .profile_unlogin__desc,.play .profile_unlogin__tit {
      opacity: 1;
      -webkit-transform: translate(0)
    }
  }

  .mod_btn_green {
    border: 1px solid #31c27c;
    background-color: #31c27c;
    color: #fff;
  }

</style>

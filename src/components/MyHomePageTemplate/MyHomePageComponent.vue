<template>
  <div>
    <div class="mod_loading" v-show="isShow"><i class="icon_txt">加载中</i></div>

    <div v-show="!isShow" class="mod_profile" v-if="myInfo">
      <div class="section_inner">
        <div class="profile__cover_link">
          <img :src="myInfo ?  myInfo.creator.headpic: ''" alt="" class="profile__cover">
        </div>
        <h1 class="profile__tit">
          <span class="profile__name" v-text="myInfo ? myInfo.creator.nick : ''"></span>
          <a href="//y.qq.com/portal/vipportal/index.html">
            <img src="//y.qq.com/music/icon/v1/mac/svip_g@2x.png?max_age=2592000" alt="4级绿钻过期" class="lv_icon ">
          </a>
        </h1>
        <ul class="mod_user_statistic">
          <li class="user_statistic__item">
            <a href="/n/ryqq/profile/focus/singer">
              <strong class="user_statistic__number">{{myInfo ? myInfo.creator.nums.followsingernum : '0'}}</strong>
              <span class="user_statistic__tit">关注</span>
            </a>
          </li>
          <li class="user_statistic__item user_statistic__item--last">
            <a href="/n/ryqq/profile/fans">
              <strong class="user_statistic__number">{{myInfo ? myInfo.creator.nums.fansnum : '0'}}</strong>
              <span class="user_statistic__tit">粉丝</span>
            </a>
          </li>
        </ul>
        <a class="sprite btn_lock" title="解锁">
          <span class="icon_txt">解锁</span>
        </a>
      </div>
    </div>


    <div v-show="!isShow" class="main main--profile profile_exclusive">

      <div class="mod_tab profile_nav" id="nav">
          <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/like">我喜欢</router-link>
          <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/create">我创建的歌单</router-link>
          <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/focus/singer">关注</router-link>
          <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/fans">粉丝</router-link>
          <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/uploadmv">我上传的视频</router-link>
      </div>

      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'MyHomePageComponent',
    data(){
      return {
        isShow: true,
        myInfo: null
      }
    },
    methods:{
      setInfo(){
        this.$store.commit('UserInfoOptions/SET_INFO',this.myInfo)
      }
    },
    mounted () {
      document.getElementsByClassName('mod_subNav')[0].style.display = 'none'
      this.$axios.get('/api/getMyInfo').then((response)=>{
        if (response.data.code === 0){
          this.myInfo = response.data.data
          this.setInfo()
          setTimeout(()=>{
            this.isShow = false
            this.$router.push({path: '/login/my_home/like/song'})
          }, 1000)
        }else {
          this.$router.push({path: '/login'})
        }
      })
    }
  }
</script>

<style scoped>
  .profile_exclusive .profile_nav .mod_tab__current, .profile_exclusive .profile_nav .mod_tab__item:hover {
    color: #31c27c!important;
  }
    .main, .section_inner {
      margin: 0 50px;
      min-width: 900px;
    }
    .mod_tab__item {
      color: #fff;
      margin-right: 40px;
    }

  .profile_exclusive .mod_tab {
    position: relative;
    zoom: 1;
    border-bottom: 1px solid #f7f7f7;
  }
  .profile_exclusive .mod_tab, .profile_exclusive .mod_tab__item {
    height: 56px;
    line-height: 56px;
  }
  .profile_exclusive .mod_tab {
    margin-bottom: -20px;
    overflow: hidden;
    border-bottom: 0;
  }
  .profile_exclusive .profile_nav {
    position: absolute;
    top: -56px;
    left: 0;
    margin-bottom: 0;
    width: 80%;
  }
  .main {
    z-index: 2;
  }

  .main, .section_inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .icon_txt {
    font: 0/0 a;
  }

  .mod_profile {
    height: 315px;
    padding-top: 65px;
    background: url(	https://y.qq.com/ryqq/static/media/bg_profile.bd497b5a.jpg?max_age=2592000) 50% no-repeat;
    background-size: cover;
    text-align: center;
    color: #fff
  }

  .mod_profile,.mod_profile .section_inner {
    height: 315px
  }

  .profile__cover_link {
    position: relative;
    width: 102px;
    height: 102px;
    margin: 0 auto
  }

  .profile__cover {
    display: block;
    width: 100%;
    height: 100%;
    border: 4px solid #fff;
    border-radius: 99px;
    background: #fff
  }

  .profile__tit {
    font-size: 0
  }

  .profile__name {
    font-size: 30px;
    font-weight: 400;
    line-height: 64px;
    margin-right: 4px
  }

  .lv_icon {
    vertical-align: -3px
  }

  .mod_user_statistic {
    height: 40px;
    margin: 4px 15px 26px;
    overflow: hidden;
    font-size: 0
  }

  .user_statistic__item {
    display: inline-block;
    *display: inline;
    *zoom:1;border-right: 1px solid #24313d;
    width: auto;
    text-align: center;
    padding: 0 25px
  }

  .user_statistic__item--last {
    border-right: 0
  }

  .user_statistic__number {
    display: block;
    font-size: 22px;
    line-height: 24px;
    margin-top: -1px;
    font-weight: 400
  }

  .user_statistic__tit {
    display: block;
    color: #999;
    font-size: 14px
  }

  .user_statistic__item a:hover .user_statistic__number {
    color: #31c27c
  }

  .user_statistic__number,.user_statistic__tit {
    color: #fff
  }

  .btn_lock:hover {
    background-position: -60px -200px
  }

  .btn_lock {
    background-position: -60px -180px
  }
  .profile_exclusive .none_txt p a {
    color: #31c27c
  }


</style>

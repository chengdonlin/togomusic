<template>
    <div class="js_box" id="like_box">

      <div class="mod_tab">
        <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/like/song">歌曲 {{myInfo ? myInfo.mymusic[0].num0:'0'}}</router-link>
        <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/like/play">歌单 0</router-link>
        <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/like/album">专辑 0</router-link>
        <router-link class="mod_tab__item" active-class="mod_tab__current" to="/login/my_home/like/mv">视频 0</router-link>
      </div>

      <router-view></router-view>
    </div>

</template>

<script>
  export default {
    name: 'LikePageComponent',
    computed:{
      myInfo(){
        return this.$store.state.UserInfoOptions.myInfo
      }

    }
  }
</script>

<style scoped>
   .mod_tab__item {
    position: relative;
    float: left;
    font-size: 16px;
    overflow: hidden;
    margin-right: 55px;
  }
  .mod_tab,.mod_tab__item {
    height: 56px;
    line-height: 56px;
  }
   .mod_tab {
     position: relative;
     zoom: 1;
     border-bottom: 1px solid #f7f7f7;
   }
   .mod_tab {
     margin-bottom: -20px;
     overflow: hidden;
     border-bottom: 0;
   }
   .mod_tab__current,.mod_tab__item:hover {
      color: #31c27c!important;
  }

</style>

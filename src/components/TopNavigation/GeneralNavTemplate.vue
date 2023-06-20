<template>
<!--头部导航模板-->
    <div class="header">
        <div class="section_inner">
            <h1 class="music_title">
                <a class="active" href="/">
                    <img src="../../assets/img/nav_img/logo.png" alt="QQ音乐" class="music_logo"/>
                </a>
            </h1>
            <!--NavigationBar 导航栏-->
            <NavigationBar></NavigationBar>
            <!--SubNavigationBar 子导航栏-->
            <SubNavigationBar></SubNavigationBar>
            <!--NavigationBarSearch 导航栏搜索-->
            <NavigationBarSearch></NavigationBarSearch>
            <!--Login 登录功能-->
            <Login></Login>
        </div>
    </div>
</template>

<script>
import NavigationBar from './Subassemblies/NavigationBar'
import SubNavigationBar from './Subassemblies/SubNavigationBar'
import NavigationBarSearch from './Subassemblies/NavigationBarSearch'
import Login from './Subassemblies/Login'
export default {
  name: 'GeneralNavTemplate',
  components: {
    NavigationBar, SubNavigationBar, NavigationBarSearch, Login
  }
}
</script>

<style scoped>
    .header {
        background-color: #fff;
        position: relative;
        z-index: 4;
    }
    .header .section_inner {
        padding-top: 90px;
    }
    /*@media (max-width: 1240px)*/
    /*    .main, .section_inner {*/
    /*        margin: 0 50px;*/
    /*        min-width: 900px;*/
    /*    }*/
    /*    .main, .section_inner {*/
    /*        max-width: 1200px;*/
    /*        margin: 0 auto;*/
    /*        position: relative;*/
    /*    }*/
    .music_title {
        position: absolute;
        left: 0;
        top: 22px;
    }
    .music_logo {
        width: 170px;
        height: 46px;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
</style>

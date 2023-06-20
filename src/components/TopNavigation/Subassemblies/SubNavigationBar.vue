<template>
    <ul class="mod_subNav">
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/index">首页</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/singer_list">歌手</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/album">新碟</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/top_list">排行榜</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/category">分类歌单</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/radio">电台</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/mv_list">MV</router-link>
        </li>
        <li class="subNav_item">
            <router-link class="subNav_link" active-class="subNav_link--current" to="/album_mall">数字专辑</router-link>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'SubNavigationBar'
}
</script>

<style scoped>
    .mod_subNav {
        height: 51px;
        line-height: 51px;
        border-top: 1px solid #f2f2f2;
        display: flex;
        justify-content: center;
    }
    .subNav_item {
        float: left;
        font-size: 15px;
        color: #c1c1c1;
        margin-right: 47px;
    }
    .subNav_link--current {
        color: #31c27c;
    }

    .subNav_link {
        display: block;
    }
    .subNav_link:hover{
        color: #31c27c;
    }
</style>

<template>
    <li class="playlist__item">
        <div class="playlist__item_box">
            <div class="playlist__cover mod_cover">
                <a class="js_album" href="javascript:void(0)">
                    <img class="playlist__pic" loading="lazy" :src="'https://y.qq.com/music/photo_new/T002R300x300M000'+ data.mid+'.jpg?max_age=2592000'">
                    <i class="mod_cover__icon_play js_play"></i>
                </a>
            </div>
            <h4 class="playlist__title">
              <span class="playlist__title_txt">
                <a :title="data.name" class="js_album" href="javascript:void(0)" v-html="data.name"></a>
              </span>
            </h4>
            <div class="playlist__author">
                <a class=" " :title="data.singers[0].name" href="/n/ryqq/singer/001t4dSv3TKu3T" v-html="data.singers[0].name"></a>
            </div>
        </div>
    </li>
</template>

<script>
export default {
  name: 'AlbumItem',
  props: ['data']

}
</script>

<style scoped>
    .mod_playlist .playlist__item {
        display: inline-block;
        width: 20%;
        padding-bottom: 44px;
        overflow: hidden;
        font-size: 14px;
        vertical-align: top;
    }
    .mod_index--album .playlist__item {
        width: 20%;
        padding-bottom: 25px;
    }
    .mod_playlist .playlist__item_box {
        position: relative;
        margin-right: 20px;
    }
    .mod_playlist .playlist__cover {
        position: relative;
        display: block;
        overflow: hidden;
        padding-top: 100%;
        margin-bottom: 15px;
    }

    .mod_cover {
        zoom: 1;
    }
    .mod_playlist .playlist__pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        -webkit-transform: scale(1) translateZ(0);
        -webkit-transition: -webkit-transform .75s;
    }

    img {
        border: 0;
    }
    .mod_playlist .playlist__title {
        overflow: hidden;
    }
    .mod_playlist .playlist__title_txt {
        white-space: normal;
    }

    .mod_playlist .playlist__title_txt {
        float: left;
        max-width: 100%;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px;
        max-height: 44px;
    }
    .mod_playlist .playlist__title a {
        font-size: 14px;
    }
    .mod_playlist .playlist__author, .mod_playlist .playlist__author a, .mod_playlist .playlist__other {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px;
        font-size: 14px;
    }
</style>

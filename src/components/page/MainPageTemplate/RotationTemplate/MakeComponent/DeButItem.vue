<template>
    <li class="debutlist__item">
        <div class="debutlist__item_box">
            <a class="debutlist__link mod_cover" @click="addPlayMusic(!data ? 0: data.mid)">
                <img class="debutlist__pic"
                     :src="!data ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAD0lEQVR4AWM4bYwJh7QgANLSYzmZH3ISAAAAAElFTkSuQmCC': ('https://y.qq.com/music/photo_new/T002R300x300M000'+data.album.mid+'_1.jpg?max_age=2592000')">
                <i class="mod_cover__mask"></i>
                <i class="mod_cover__icon_play"></i>
            </a>
            <div class="debutlist__cont">
                <h3 class="debutlist__song">
                    <router-link :to="{
                        name:'musicPage',
                        params:{
                            mid: !data ? 'null': data.mid
                        }
                    }">{{!data ? null: data.name}}</router-link>
                </h3>
                <p class="debutlist__author">
                    <a class="c_tx_thin" :title="sing.name" href="javascript:void(0)" v-for="sing in (!data ? []: data.singer)" :key="sing.id">{{sing.name}}</a>
                </p>
            </div>
            <div class="debutlist__time c_tx_thin">{{!data ? null: data.interval}}</div>
        </div>
    </li>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'DeButItem',
  props: ['data'],
  methods: {
    ...mapActions('SongListOptions', {addPlayMusic: 'handleMusicMid'})
  }
}
</script>

<style scoped>
    .debutlist__item {
        display: inline-block;
        width: 33.333%;
    }
    .debutlist__item_box, .debutlist__link {
        position: relative;
        height: 86px;
        overflow: hidden;
    }
    .debutlist__item_box {
        border-top: 1px solid #f2f2f2;
        margin: -1px 30px 13px 0;
        padding-top: 12px;
        font-size: 14px;
        cursor: pointer;
    }
    .debutlist__link {
        float: left;
        width: 86px;
        margin-right: 14px;
    }
    .debutlist__item_box, .debutlist__link {
        position: relative;
        height: 86px;
        overflow: hidden;
    }
    .mod_cover {
        zoom: 1;
    }
    .debutlist__pic {
        display: block;
        width: 100%;
        height: 100%;
        -webkit-transform: scale(1) translateZ(0);
        -webkit-transition: -webkit-transform .75s;
        transform: scale(1) translateZ(0);
        transition: transform .75s;
        -o-object-fit: cover;
        object-fit: cover;
    }
    .debutlist__author, .debutlist__song {
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .debutlist__song {
        font-size: 14px;
        padding: 21px 0 2px;
        font-weight: 400;
    }
    .debutlist__author {
        color: #999;
    }
    .c_tx_thin {
        color: #999;
    }
    .debutlist__time {
        position: absolute;
        right: 0;
        bottom: 0;
        line-height: 86px;
    }
    .mod_cover__mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;
        filter: alpha(opacity=0);
        transition: opacity .5s;
    }
    .mod_debutlist .mod_cover .mod_cover__icon_play:hover, .mod_debutlist .mod_cover__icon_play {
        background-size: 68%;
        background-repeat: no-repeat;
        background-position: 50%;
    }

</style>

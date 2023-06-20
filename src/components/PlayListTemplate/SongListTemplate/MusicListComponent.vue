<template>
    <div class="mod_songlist ">

        <div class="mod_loading" v-show="!playListData"><i class="icon_txt">加载中</i></div>

        <ul class="songlist__header"  v-if="playListData">
            <li class="songlist__header_name">歌曲</li>
            <li class="songlist__header_author">歌手</li>
            <li class="songlist__header_album">专辑</li>
            <li class="songlist__header_time">时长</li>
        </ul>
        <ul class="songlist__list"  v-if="playListData">
            <li v-for="(i, index) in playListData.songlist" :key="i.mid">
                <div class="songlist__item" :class="index % 2 == 0 ? 'songlist__item--even': ''">
                    <div class="songlist__number songlist__number--top">{{index + 1}}</div>
                    <div class="songlist__songname">
                        <a class="songlist__icon songlist__icon_mv sprite" v-show="i.mv.id != 0" title="MV" @click="$router.push({
                              name: 'musicPage',
                              params: {
                                mid: i.mid
                              }
                            })">
                            <span class="icon_txt">MV</span>
                        </a>
                        <i class="songlist__icon songlist__icon_vip sprite" title="VIP" v-if="i.pay.pay_play == 1">
                        </i>
                        <span class="songlist__songname_txt">
                          <a :title="i.title" @click="$router.push({
                              name: 'musicPage',
                              params: {
                                mid: i.mid
                              }
                            })">{{i.name}}</a>
                        </span>
                        <div class="mod_list_menu">
                            <a class="list_menu__item list_menu__play" title="播放" @click="addPlayMusic(i.mid)">
                                <i class="list_menu__icon_play">
                                </i>
                                <span class="icon_txt">播放</span>
                            </a>
                            <a class="list_menu__item list_menu__add" title="添加到歌单">
                                <i class="list_menu__icon_add">
                                </i>
                                <span class="icon_txt">添加到歌单</span>
                            </a>
                          <a class="list_menu__item list_menu__share" title="分享">
                            <i class="list_menu__icon_share"></i>
                            <span class="icon_txt">分享</span>
                          </a>
                        </div>
                    </div>
                    <div class="songlist__artist">
                        <a class="playlist__author" :title="j.name" href="/n/ryqq/singer/000aHmbL2aPXWH" v-for="j in i.singer" :key="j.mid">{{j.name}}</a>
                    </div>
                    <div class="songlist__time">{{time(i.interval)}}</div>
                    <div class="songlist__album">
                        <a href="/n/ryqq/albumDetail/002PwL9x3TiVdh">{{i.album.name}}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import commonUtil from '../../../../static/js/commonUtil.js'
export default {
  name: 'MusicListComponent',
  props: ['playListData'],
  methods: {
    time(t){
      return commonUtil.getPlayTime(t)
    },
    ...mapActions('SongListOptions', {addPlayMusic: 'handleMusicMid'})
  }
}
</script>

<style scoped>
  .list_menu__item:hover .list_menu__icon_add {
    background-position: -40px -80px;
  }
  .list_menu__item:hover .list_menu__icon_share {
    background-position: -40px -40px;
  }
  .list_menu__icon_play {
    background-position: 0 0;
  }

  .list_menu__icon_add {
    background-position: 0 -80px;
  }
  .list_menu__icon_share {
    background-position: 0 -40px;
  }
  .songlist__item--current .mod_list_menu, .songlist__item:hover .mod_list_menu {
    opacity: 1;
    pointer-events: inherit;
    right: -10px;
    margin-top: -18px;
  }
  .list_menu__icon_add, .list_menu__icon_delete, .list_menu__icon_down, .list_menu__icon_down_vip, .list_menu__icon_edit, .list_menu__icon_pause, .list_menu__icon_play, .list_menu__icon_share {
    display: block;
    width: 36px;
    height: 36px;
    background-image: url(https://y.qq.com/ryqq/static/media/icon_list_menu.08951c0e.png?max_age=2592000);
    background-repeat: no-repeat;
  }
  .songlist__item .mod_list_menu {
    position: absolute;
    right: -10px;
    right: -9999px\9;
    top: 50%;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .mod_list_menu {
    font-size: 0;
    height: 36px;
  }
  .list_menu__item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
  .list_menu__item:hover .list_menu__icon_play {
    background-position: -40px 0;
  }
    .songlist__icon_vip {
        background-position: -80px -160px;
    }
    .songlist__icon_exclusive, .songlist__icon_vip {
        display: inline-block;
        width: 34px;
        height: 16px;
        vertical-align: middle;
        margin-right: 6px;
    }
    .songlist__item .songlist__icon:nth-child(2)+.songlist__songname_txt {
        max-width: 62%;
        box-sizing: border-box;
    }
    .songlist__songname_txt {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 56%;
        margin-right: 8px;
        white-space: nowrap;
        font-size: 14px;
    }
    .mod_songlist {
        margin: 11px -30px 10px 0px;
    }

    .mod_songlist {
        padding-bottom: 60px;
    }
    .mod_songlist {
        font-size: 14px;
        overflow: hidden;
    }
    .songlist__header {
        background-color: #fbfbfd;
    }

    .songlist__header {
        height: 50px;
        line-height: 50px;
        background-color: rgba(0,0,0,.01);
        color: #999;
    }
    .songlist__header, .songlist__item {
        position: relative;
        padding-left: 46px;
        padding-right: 95px;
    }
    .songlist__list {
        overflow: hidden;
        clear: both;
    }
    .songlist__header_name, .songlist__songname {
        width: 54%;
    }

    .songlist__header_name, .songlist__songname {
        float: left;
        width: 47.685185%;
        position: relative;
        white-space: normal;
    }
    .songlist__album, .songlist__artist, .songlist__header_album, .songlist__header_author {
        width: 20%;
    }

    .songlist__album, .songlist__artist, .songlist__header_album, .songlist__header_author {
        float: left;
        padding-left: 15px;
        width: 25.5%;
        box-sizing: border-box;
    }
    .songlist__header_time, .songlist__time {
        position: absolute;
        top: 0;
        right: 38px;
        width: 50px;
    }
    .songlist__item--even {
        background-color: rgba(0,0,0,.03);
    }

    .songlist__item {
        clear: both;
        font-size: 0;
        overflow: hidden;
    }
    .songlist__header, .songlist__item {
        position: relative;
        padding-left: 46px;
        padding-right: 95px;
    }
    .songlist__number {
        position: absolute;
        top: 0;
        left: 10px;
        color: #999;
        width: 36px;
    }

    .songlist__album, .songlist__artist, .songlist__number, .songlist__other, .songlist__songname, .songlist__time {
        line-height: 50px;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .songlist__album, .songlist__artist, .songlist__number, .songlist__other, .songlist__time {
        font-size: 14px;
    }
    .songlist__icon_mv {
        display: inline-block;
        width: 33px;
        height: 16px;
        background-position: -40px -280px;
        vertical-align: middle;
        margin-right: 6px;
    }

    .songlist__icon {
        display: inline-block;
    }
    .sprite, .sprite_before:before {
        background-image: -webkit-image-set(url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000) 1x,url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000) 2x);
    }

    .icon_txt {
        font: 0/0 a;
    }

</style>

<template>
    <li class="playlist__item ">
        <div class="playlist__item_box">
            <div class="playlist__cover mod_cover">
                <a href="javascript:void(0)">
                    <img class="playlist__pic" :src="data ? data.cover.default_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAD0lEQVR4AWM4bYwJh7QgANLSYzmZH3ISAAAAAElFTkSuQmCC'"
                         :alt="!data ? '': data.title">
                    <i class="mod_cover__mask"></i>
                    <i class="mod_cover__icon_play"  @click="addPlayListMusic(data.tid)"></i>
                </a>
            </div>
            <h4 class="playlist__title">
                <span class="playlist__title_txt">
                    <router-link :to="{
                        name: 'playlistPage',
                        params:{
                            mid: !data ? 'null': data.tid
                        }
                    }" v-html="!data ? null : data.title"></router-link>
                </span>
            </h4>
            <div class="playlist__other">播放量：{{playbackVolume}}万</div>
        </div>
    </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'PlayListItem',
  props: ['data'],
  computed: {
    playbackVolume () {
      if (this.data) return (this.data.play_cnt / 10000).toFixed(1)
      return 0
    }
  },
  methods:{
    ...mapActions('SongListOptions', {addPlayListMusic: 'handleMusicListMid'})
  }
}
</script>

<style scoped>
    .playlist__item {
        position: relative;
        width: 1.6%;
        padding-bottom: 0;
        display: inline-block;
        overflow: hidden;
        font-size: 14px;
        vertical-align: top;
    }
    .playlist__item:before {
        content: "";
        display: block;
        width: 100%;
        padding-top: 100%;
        padding-bottom: 66px;
    }
     .playlist__item_box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin-right: 20px;
    }
     .playlist__cover {
        position: relative;
        display: block;
        overflow: hidden;
        padding-top: 100%;
        margin-bottom: 15px;
    }

    .mod_cover {
        zoom: 1;
    }
    .playlist__pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        -webkit-transform: scale(1) translateZ(0);
        -webkit-transition: -webkit-transform .75s;
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
    .mod_cover:hover .mod_cover__mask{
        opacity: 0.2;
    }
    .mod_cover:hover .mod_cover__icon_play{
        opacity: 1;
        transform: scale(1);
    }
    .mod_cover:hover img{
        transform: scale(1.1);
    }
    .mod_playlist .playlist__author, .mod_playlist .playlist__author a, .mod_playlist .playlist__other {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px;
        font-size: 14px;
    }
    .playlist__title_txt a{
        font-weight: 400;
    }
</style>

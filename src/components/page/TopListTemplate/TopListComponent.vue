<template>
    <div class="main">
        <div class="toplist_nav">
            <dl class="toplist_nav__list" v-for="item in group" :key="item.id">
                <dt class="toplist_nav__tit">{{item.groupName}}</dt>
                <dd class="toplist_nav__item" v-for="i in item.toplist" :key="i.topId" @click="setTopId(i.topId)">
                    <a class="toplist_nav__link" :class="i.topId === topId?'toplist_nav__link--current':''">{{i.title}}</a>
                </dd>
            </dl>
        </div>
        <div class="mod_toplist">
            <div class="toplist__hd">
                <h1 class="toplist__tit">{{info.data.title}}</h1>
                <span class="toplist_switch">
            <span class="toplist_switch__data">{{info.data.updateTime}}</span>
          </span>
                <a class="toplist__rule">榜单规则</a>
            </div>
            <div class="mod_songlist_toolbar">
                <a class="mod_btn_green">
                    <i class="mod_btn_green__icon_play"></i>播放全部
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_add"></i>添加到
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_down"></i>下载
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_batch"></i>批量操作
                </a>
                <a class="mod_btn js_into_comment" href="#comment_box">
                    <i class="mod_btn__icon_comment"></i>评论(257541)
                </a>
            </div>
            <div class="topList_mod_songlist ">
                <ul class="songlist__header">
                    <li class="songlist__header_name">歌曲</li>
                    <li class="songlist__header_author">歌手</li>
                    <li class="songlist__header_time">时长</li>
                </ul>
                <ul class="songlist__list">
                    <li v-for="(item, index) in info.songInfoList" :key="index">
                        <div class="songlist__item songlist__item--even songlist__item--disable">
                            <div class="songlist__number" :class="index < 3?'songlist__number--top':''">{{index+1}}</div>
                            <div class="songlist__rank">
                                <i class="icon_rank_popular"></i>{{info.data.song[index].rankValue}}
                            </div>
                            <div class="songlist__songname">
                  <span class="songlist__songname_txt">
                    <a class="songlist__cover" :title="item.title" href="/n/ryqq/albumDetail/003Al37q0thViM">
                      <img class="songlist__pic" :src="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.album.pmid+'.jpg'" :alt="item.title">
                    </a>
                    <a :title="item.title" href="/n/ryqq/songDetail/0032Ajwv1ocipK">{{item.name}}</a>
                  </span>
                                <div class="mod_list_menu">
                                    <a class="list_menu__item list_menu__play" title="播放">
                                        <i class="list_menu__icon_play"></i>
                                        <span class="icon_txt">播放</span>
                                    </a>
                                </div>
                            </div>
                            <div class="songlist__artist">
                                <a class="playlist__author" :title="i.name" href="/n/ryqq/singer/004PjYVG2cjyBK" v-for="(i,index) in item.singer" :key="i.mid">{{(index !== 0?'/':'') + i.name}}</a>
                            </div>
                            <div class="songlist__time">{{item.interval}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="page_box">
                <div class="client_guide">
                    <p class="client_guide__txt">查看更多内容，请下载客户端</p>
                    <a class="client_guide__btn">立即下载</a>
                </div>
            </div>

            <CommentComponent :playListComment="comment"></CommentComponent>

        </div>
    </div>
</template>

<script>
import CommentComponent from '@/components/PlayListTemplate/SongListTemplate/CommentComponent'
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  name: 'TopListComponent',
  data () {
    return {
      group: [],
      info: {data: {}, songInfoList: []},
      comment: {CommentList: {Comments: []}, CommentList2: {}},
      topId: 4,
      pageNum: 0,
      finished: true
    }
  },
  methods: {
    setTopId (topId) {
      this.topId = topId
    },
    getGroup () {
      axios.get('/api/getTopInfo?t=group&topId=0&pageNum=0').then((resp) => {
        this.group = resp.data.group.data.group
      })
    },
    getTopInfo () {
      axios.get('/api/getTopInfo?t=info&pageNum=0&topId=' + this.topId).then((resp) => {
        this.info = resp.data.info.data
      })
    },
    getComment (t) {
      axios.get('/api/getTopInfo?t=comment&topId=' + this.topId + '&pageNum=' + this.pageNum).then((resp) => {
        if (t) {
          this.comment = resp.data.comment.data
        } else {
          this.comment.CommentList.Comments.push(...resp.data.comment.data.CommentList.Comments)
        }
      })
    },
    aaa () {
      let top = Math.floor(document.documentElement.scrollTop || document.body.scrollTop)
      if (this.finished && top >= (document.documentElement.scrollHeight - 1300)) {
        this.finished = false
        this.pageNum += 1
      }
    }
  },
  mounted () {
    this.getGroup()
    this.getTopInfo()
    this.getComment(true)
    window.addEventListener('scroll', this.aaa)
  },
  watch: {
    topId () {
      this.pageNum = 0
      this.getTopInfo()
    },
    pageNum () {
      this.getComment(false)
    }
  },
  components: {CommentComponent}
}
</script>

<style scoped>
    .main {
        padding-top: 60px;
    }

    .main {
        z-index: 2;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .toplist_nav {
        float: left;
        width: 178px;
        border: 1px solid hsla(0,0%,60%,.2);
    }
    .toplist_nav__list {
        margin-bottom: 20px;
    }
    .toplist_nav__tit {
        line-height: 60px;
        font-size: 20px;
        font-weight: 400;
        border-bottom: 1px solid #ebebeb;
        margin: 0 17px 10px;
    }
    .toplist_nav__link {
        font-size: 15px;
        display: block;
        line-height: 22px;
        padding: 8px 17px;
    }
    .toplist_nav__link--current, .toplist_nav__link--current:hover {
        background-color: #31c27c;
        color: #fff;
    }
     .mod_toplist {
        position: relative;
        margin-left: 210px;
    }
    .toplist__tit {
        float: left;
        font-weight: 400;
        font-size: 24px;
        margin-right: 15px;
    }
    .toplist__hd {
        line-height: 64px;
        height: 64px;
        margin-bottom: 10px;
    }
    .toplist_switch {
        margin-right: 15px;
        font-size: 0;
    }
    .toplist_switch__data {
        font-size: 14px;
    }
    .mod_songlist_toolbar {
        position: relative;
        margin-bottom: 20px;
        font-size: 0;
    }
    .mod_btn_green {
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
    }
    .mod_btn, .mod_btn_green {
        border-radius: 2px;
        font-size: 14px;
        margin-right: 6px;
        padding: 0 23px;
        height: 38px;
        line-height: 38px;
        display: inline-block;
        white-space: nowrap;
        box-sizing: border-box;
        overflow: hidden;
    }
    .mod_songlist_toolbar .mod_btn {
        min-width: 122px;
        text-align: center;
    }

    .mod_btn {
        border: 1px solid #c9c9c9;
        color: #000;
    }
    .mod_btn_green__icon_play {
        width: 13px;
        height: 16px;
        background-position: -80px -220px;
        vertical-align: -3px;
    }
    .mod_btn__icon_add {
        width: 16px;
        height: 16px;
        background-position: -20px 0;
    }
    .mod_btn__icon_down {
        width: 16px;
        height: 16px;
        background-position: -40px -220px;
    }
    .mod_btn__icon_batch {
        width: 16px;
        height: 16px;
        background-position: -120px 0;
    }
    .mod_btn__icon_comment {
        width: 16px;
        height: 16px;
        background-position: -140px -120px;
        vertical-align: -3px;
    }
    .mod_btn__icon_add, .mod_btn__icon_batch, .mod_btn__icon_comment, .mod_btn__icon_copy, .mod_btn__icon_delete, .mod_btn__icon_down, .mod_btn__icon_edit, .mod_btn__icon_input, .mod_btn__icon_less, .mod_btn__icon_like, .mod_btn__icon_manage, .mod_btn__icon_menu, .mod_btn__icon_more, .mod_btn__icon_new, .mod_btn__icon_no, .mod_btn__icon_play, .mod_btn__icon_qr, .mod_btn__icon_recovery, .mod_btn__icon_upload, .mod_btn__icon_yes, .mod_btn_green__icon_add, .mod_btn_green__icon_clear, .mod_btn_green__icon_delete, .mod_btn_green__icon_down, .mod_btn_green__icon_like, .mod_btn_green__icon_more, .mod_btn_green__icon_play, .mod_btn_green__icon_radio {
        display: inline-block;
        margin-right: 6px;
        background-image: url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
        background-repeat: no-repeat;
        vertical-align: -3px;
    }

    .topList_mod_songlist {
        margin-bottom: 60px;
        font-size: 14px;
        overflow: hidden;
    }
    .topList_mod_songlist .songlist__header, .topList_mod_songlist .songlist__item {
        padding-left: 122px;
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
    .topList_mod_songlist .songlist__header_name, .topList_mod_songlist .songlist__songname {
        width: 72%;
    }

    .songlist__header_name, .songlist__songname {
        float: left;
        width: 47.685185%;
        position: relative;
        white-space: normal;
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
    .songlist__list {
        overflow: hidden;
        clear: both;
    }
    .topList_mod_songlist .songlist__item {
        height: 80px;
    }

    .topList_mod_songlist .songlist__header, .topList_mod_songlist .songlist__item {
        padding-left: 122px;
    }
    .songlist__item--even {
        background-color: rgba(0,0,0,.01);
    }
    .songlist__item {
        clear: both;
        font-size: 0;
        overflow: hidden;
    }
    .songlist__number--top {
        color: #ff4222 !important;
    }
    .topList_mod_songlist .songlist__number {
        width: 40px;
        top: 2px;
        left: 0;
        text-align: right;
        font-size: 24px;
        color: #333;
    }
    .topList_mod_songlist .songlist__album, .topList_mod_songlist .songlist__artist, .topList_mod_songlist .songlist__number, .topList_mod_songlist .songlist__other, .topList_mod_songlist .songlist__rank, .topList_mod_songlist .songlist__songname, .topList_mod_songlist .songlist__time {
        line-height: 80px;
        height: 80px;
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
    .topList_mod_songlist .songlist__rank {
        position: absolute;
        top: 0;
        left: 48px;
        width: 72px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #999;
    }
    .icon_rank_popular {
        width: 15px;
        height: 15px;
        margin-top: 27px;
        background-position: 0 -60px;
    }
    .topList_mod_songlist .songlist__header_name, .topList_mod_songlist .songlist__songname {
        width: 72%;
    }
    .songlist__item .songlist__songname_txt:first-child {
        max-width: 85%;
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
    .topList_mod_songlist .songlist__cover, .topList_mod_songlist .songlist__pic {
        width: 70px;
        height: 70px;
    }

    .topList_mod_songlist .songlist__cover {
        float: left;
        margin-right: 20px;
        margin-top: 5px;
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
    .list_menu__item {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;
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
    .songlist__song_txt, .songlist__time {
        color: #999;
    }
    .icon_rank_down, .icon_rank_keep, .icon_rank_new, .icon_rank_popular, .icon_rank_re, .icon_rank_up {
        display: block;
        margin-left: auto;
        margin-right: auto;
        background-image: url(https://y.qq.com/ryqq/static/media/icon_rank.7d86a039.png?max_age=2592000);
    }
    .songlist__album, .songlist__artist, .songlist__number, .songlist__other, .songlist__time {
        font-size: 14px;
    }

</style>

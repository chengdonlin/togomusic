<template>
<li>
  <div class="songlist__item songlist__item--even"
       :class="{'songlist__item--playing': this.$store.state.SongListOptions.CurrentSongIndex === index && this.$store.state.MusicVideoOptions.IsPlaying}">
    <div class="sprite songlist__edit" :class="isCheck? 'songlist__edit--check' : 'songlist__edit'">
      <input type="checkbox" class="songlist__checkbox" v-model="isCheck" @click="addSelectList(data.id)">
    </div>
    <div class="songlist__number songlist__number--top">{{index+1}}</div>
    <div class="songlist__songname" >
      <a class="songlist__icon songlist__icon_mv sprite" title="MV" href="/n/ryqq/mv/j0026l0ritl" v-show="data.mv.id !== 0">
        <span class="icon_txt">MV</span>
      </a>
      <i class="songlist__icon songlist__icon_vip sprite" title="VIP" v-show="data.pay.pay_play === 1"></i>
      <span class="songlist__songname_txt">
        <a href="/n/ryqq/songDetail/004Uln1G2Aunqw">{{data.name}}</a>
      </span>
      <div class="mod_list_menu" >
        <a class="list_menu__item list_menu__play" title="播放" @click="SpecifyPlay">
          <i class="list_menu__icon_play"></i>
          <span class="icon_txt">播放</span>
        </a>
        <a class="list_menu__item list_menu__add" title="添加到歌单">
          <i class="list_menu__icon_add"></i>
          <span class="icon_txt">添加到歌单</span>
        </a>
        <a class="list_menu__item list_menu__share" title="分享">
          <i class="list_menu__icon_share"></i>
          <span class="icon_txt">分享</span>
        </a>
      </div>
    </div>
    <div class="songlist__artist">
      <a class="playlist__author" href="/n/ryqq/singer/003RGAyU46oc94"
         v-for="(item, index) in data.singer" :key="index">
        {{index!= 0? ' / ' : ''}}{{item.name}}
      </a>
    </div>
    <div class="songlist__time songlist__time_delete">{{fullTime}}</div>
    <a class="songlist__delete" @click="delSong(index)">
      <span class="icon_txt">删除</span>
    </a>
  </div>
</li>
</template>

<script>
  import {mapMutations} from 'vuex'
  import commonUtil from '../../../../../../static/js/commonUtil.js'
  import pubSub from 'pubsub-js'
export default {
  name: 'MainItem',
  data(){
    return{
      isCheck: false
    }
  },
  props: ['data','index'],
  computed:{
    fullTime(){
      return commonUtil.getPlayTime(this.data.interval)
    }
  },
  methods:{
    setIsCheck(bool){
      this.isCheck = bool
    },
    SpecifyPlay(){
      this.$store.commit('SongListOptions/setCuIndex', this.index)
      this.$bus.$emit('cutSong')
    },
    addSelectList(id){
      this.$bus.$emit("SelectedList", {
        id: id,
        isCheck: this.isCheck
      })
    },
    ...mapMutations('SongListOptions',{delSong:'delSongList'})
  },
  mounted () {
    this.$bus.$on('isAllCheck',this.setIsCheck)
  },
  beforeDestroy () {
    this.$bus.$off("isAllCheck")
  }
}
</script>

<style scoped>
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
  .songlist__item--playing a {
    color: #fff!important;
  }
  .songlist__item--playing .songlist__number {
    position: absolute;
    top: 50%;
    left: 40px!important;
    margin-top: -5px;
    width: 10px;
    height: 10px;
    background: url("https://y.qq.com/mediastyle/yqq/img/wave.gif?max_age=2592000") 0 0 no-repeat;
    text-indent: -99px;
    overflow: hidden;
  }
  .mod_songlist--edit .songlist__edit:hover {
    border-color: #fff;
  }
  .mod_songlist--edit .songlist__edit--check {
    border-color: #fff !important;
    background-position: -60px -80px;
  }
  li:hover .mod_list_menu{
    opacity: 1;
    top: 10%;
  }
  li:hover .songlist__delete{
    right: 58px;
  }
  li:hover .songlist__songname_txt{
    max-width: 28%;
  }
  li:hover .songlist__time{
    opacity: 0;
  }
  .list_menu__icon_play:hover{
    background-position: -120px 0;
  }
  .list_menu__icon_add:hover{
    background-position: -120px -80px;
  }
  .list_menu__icon_down:hover{
    background-position: -120px -120px;
  }
  .list_menu__icon_share:hover{
    background-position: -120px -40px;
  }
  .songlist__delete:hover{
    background-position: -120px -160px;
  }

  .songlist__item--even {
    background-color: rgba(0,0,0,.01);
  }
  .songlist__item {
    clear: both;
    font-size: 0;
    overflow: hidden;
  }
  .songlist__item {
    position: relative;
    padding-left: 46px;
    padding-right: 95px;
  }
  .mod_songlist--edit .songlist__edit {
    left: 0;
    border-color: #545555;
    border-color: hsla(0,0%,88.2%,.2);
  }
  .mod_songlist--edit .songlist__number {
    left: 16px;
    color: inherit;
    text-align: right;
  }

  .songlist__number {
    position: absolute;
    top: 0;
    width: 36px;
  }
  .songlist__header_name, .songlist__songname {
    width: 68%;
    float: left;
    position: relative;
    white-space: normal;
  }
  .mod_player, .mod_player a {
    color: #bdbdbe;
    color: hsla(0,0%,88.2%,.8);
  }
  .songlist__icon_mv {
    display: inline-block;
    width: 33px;
    height: 16px;
    background-position: -40px -280px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .songlist__item .songlist__icon:first-child+.songlist__songname_txt {
    max-width: 72%;
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
  .songlist__item .mod_list_menu {
    position: absolute;
    right: -10px;
    top: 50%;
    overflow: hidden;
    opacity: 0;
    /*pointer-events: none;*/
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
  .list_menu__icon_play {
    background-position: -80px 0;
  }
  .list_menu__icon_add {
    background-position: -80px -80px;
  }
  .list_menu__icon_share {
    background-position: -80px -40px;
  }
  .songlist__artist, .songlist__header_author {
    width: 26%;
    color: inherit;
  }
  .songlist__time {
    color: inherit;
  }
  .songlist__header_time, .songlist__time {
    position: absolute;
    top: 0;
    right: 38px;
    width: 50px;
  }
  .songlist__delete {
    position: absolute;
    top: 50%;
    right: -99px;
    margin-top: -18px;
    width: 36px;
    height: 36px;
    background-image: url('https://y.qq.com/mediastyle/yqq/img/icon_list_menu.png?max_age=2592000');
    background-position: -80px -160px;
  }

</style>

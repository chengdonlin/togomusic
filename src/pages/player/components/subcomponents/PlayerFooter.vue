<template>
<div class="player__ft">
  <a class="btn_big_prev" @click="previousSong"><span class="icon_txt">上一首</span></a>
  <a class="btn_big_play" :class="{'btn_big_play--pause':this.IsPlaying}" @click="playPauseBtn"><span class="icon_txt">播放</span></a>
  <a class="btn_big_next" @click="nextSong"><span class="icon_txt">下一首</span></a>
  <div class="player_music">
    <div class="player_music__info" style="padding-right: 90px;"  v-if="SongList">
      <a title="Back at One" target="_blank" rel="noopener noreferrer">{{SongList[CurrentSongIndex].name}}</a>
      - <a class="playlist__author" v-for="(item, index) in SongList[CurrentSongIndex].singer" :key="index">
      {{index!= 0? ' / ' : ''}}{{item.name}}
      </a>
    </div>
    <div class="player_music__time"  v-if="SongList">{{nowTime +'&nbsp;/&nbsp;'+ totalTime}}</div>
    <div class="player_progress">
      <div class="player_progress__inner">
        <div class="player_progress__load" style="width: 100.53%; margin-left: 0px;"></div>
        <div class="player_progress__play" style="margin-left: 0px;" :style="progress">
          <i class="player_progress__dot"></i>
        </div>
      </div>
    </div>
  </div>
  <a class="btn_big_style_list" title="列表循环"><span class="icon_txt">列表循环</span></a>
  <a class="btn_big_like" :class="{'btn_big_like--like': isLike}" @click="doLike"><span class="icon_txt">喜欢</span></a>
  <a class="btn_big_down"><span class="icon_txt">下载</span></a>
  <a class="btn_big_only"><span class="icon_txt">打开纯洁模式</span></a>
  <a class="mod_btn_comment btn_comment99">
    <span class="btn_comment__numbers">
      <span class="btn_comment__numb10000">10w</span>
      <i class="btn_comment__numb btn_comment__numb_add"></i>
    </span>
    <span class="icon_txt">评论</span>
  </a>
  <div class="player_progress player_voice">
    <a class="btn_big_voice">
      <span class="icon_txt">关闭声音</span>
    </a>
    <div class="player_progress__inner">
      <div class="player_progress__play" style="width: 50%;">
        <i class="player_progress__dot"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {mapState, mapMutations,mapActions} from 'vuex'
  import SongEvent from '../../../../../static/js/SongEvent'
  import pubSub from 'pubsub-js'
export default {
  name: 'PlayerFooter',
  props:['audio'],
  computed:{
    ...mapState('SongListOptions', ['SongList','CurrentSongIndex','LikeList']),
    ...mapState('MusicVideoOptions', ['IsPlaying']),
    progress(){
      return 'width:'+ this.width
    },
    isLike(){
      return this.LikeList[this.SongList[this.CurrentSongIndex].mid]
    }
  },
  data(){
    return{
      nowTime: '00:00',
      totalTime: '00:00',
      width: '0%',
      t: null,
      w: null
    }
  },
  methods: {
    //播放暂停按钮
    playPauseBtn () {
      if(this.audio.src !== ''){
        if(this.audio.paused){
          this.audio.play()
        }else {
          this.audio.pause()
        }
      } else {

      }
    },
    //歌曲播放控制中心
    songControl(){
      if (this.SongList){
        this.$axios.get("/api/getColor?albumId="+ this.SongList[this.CurrentSongIndex].album.mid).then(
          response =>{
            console.log(response.data)
            document.body.style.backgroundColor= "#" + response.data.req_3.data.basicInfo.color.toString(16)
          }
        )
        this.$axios.get('/api/getMusicAudioByMid?mid='
          + this.SongList[this.CurrentSongIndex].mid).then(
          response=>{
            console.log(response.data)
            this.updateSrc(response.data.src)
            this.updateLyric(SongEvent.analysisLyric(response.data.lyric))
          },
          error=>{
            console.log(error.message)
          }
        )
      }
    },
    //上一首
    previousSong(){
      if(this.CurrentSongIndex > 0){
        this.next(-1)
      }
      else {
        this.next(0)
      }
      this.songControl()
    },
    //下一首
    nextSong(){
      if(this.CurrentSongIndex < this.SongList.length-1){
        this.next(1)
      }
      else {
        this.next(0)
      }
      this.songControl()
    },
    //我喜欢
    doLike(){
      if(!this.isLike){
        this.addLike(this.SongList[this.CurrentSongIndex].id)
        this.$layer.msg('添加我喜欢成功!')
      }else {
        this.delLike(this.SongList[this.CurrentSongIndex].id)
        this.$layer.msg('移除我喜欢成功!')
      }
    },
    //歌曲监听
    musicEvent(){
      this.t = setInterval(()=>{
        let timeData = SongEvent.musicTime(this.audio)
        this.nowTime = timeData.nowTime
        this.totalTime = timeData.totalTime
      },500)
      this.w = setInterval(()=>{
        this.width = SongEvent.updateProgress(this.audio)
      }, 200)
    },
    cleanMusicEvent(){
      console.log("关闭歌曲事件")
      clearInterval(this.t)
      clearInterval(this.w)
    },
    setProWidth(message, data){
      this.width = data
    },
    updateNowTime(message, data){
      this.nowTime = data
    },
    ...mapMutations('SongListOptions',{next:'SET_CTINDEX', prev:'SET_CTINDEX'}),
    ...mapMutations('MusicVideoOptions', {updateSrc:'updateSrc', updatePlaying:'updatePlaying',updateLyric:'updateLyric'}),
    ...mapActions('SongListOptions',{addLike:'handleAddLikeList', delLike:'handleDelLikeList'})
  },
  mounted () {
    SongEvent.dragProgressDotEvent()
    this.$bus.$on('cutSong',this.songControl)
    this.$bus.$on('initSrc',this.songControl)
    this.$bus.$on('ListeningForEvents',this.musicEvent)
    this.$bus.$on('next',this.nextSong)
    this.$bus.$on('closeEvent', this.cleanMusicEvent)
    this.a = pubSub.subscribe("proWidth", this.setProWidth)
    this.b = pubSub.subscribe("clean", this.cleanMusicEvent)
    this.c = pubSub.subscribe("open", this.musicEvent)
    this.d = pubSub.subscribe("updateNowTime", this.updateNowTime)
    this.e = pubSub.subscribe("nextSong", this.nextSong)
    this.e = pubSub.subscribe("loadResources", this.songControl)
  },
  beforeDestroy () {
    clearInterval(this.t)
    clearInterval(this.w)
    this.$bus.$off("cutSong")
    this.$bus.$off("initSrc")
    this.$bus.$off("ListeningForEvents")
    this.$bus.$off("next")
    this.$bus.$off('cutSong')
    pubSub.unsubscribe(this.a)
    pubSub.unsubscribe(this.b)
    pubSub.unsubscribe(this.c)
    pubSub.unsubscribe(this.d)
    pubSub.unsubscribe(this.e)
  }
}
</script>

<style scoped>
  .btn_big_like--like {
    background-position: -30px -96px!important;
  }
  .btn_comment__numbers {
    position: absolute;
    top: -3px;
    right: 0;
    white-space: nowrap;
    text-align: right;
    height: 8px;
    line-height: 8px;
  }
  .btn_comment99 .btn_comment__numbers {
    text-align: left;
    left: 8px;
  }
  .btn_comment99 .btn_comment__numbers {
    left: 11px;
  }

  .btn_comment__numb_add {
    background-position: -25px -125px;
    margin-left: 1px;
    vertical-align: -1px;
  }
  .btn_comment__numb {
    display: inline-block;
    width: 6px;
    height: 8px;
  }
  .btn_comment__numb, .mod_btn_comment {
    background-image: url('https://y.qq.com/ryqq/static/media/comment.933b16ba.png?max_age=2592000');
  }
  .btn_comment__numb10000 {
    display: inline-block;
    color: #fff;
    font-size: 8px;
  }
  .btn_big_play--pause {
    background-position: -30px 0!important;
  }
  .player__ft {
    bottom: 0;
    left: 0;
    height: 11%;
    position: absolute;
    width: 100%;
  }
  .btn_big_down, .btn_big_like, .btn_big_next, .btn_big_only, .btn_big_play, .btn_big_prev, .btn_big_style_list,
  .btn_big_style_order, .btn_big_style_random, .btn_big_style_single, .btn_big_voice,
  .btn_lang, .mod_btn_comment, .player_progress__dot {
    position: absolute;
    background-image: url('https://y.qq.com/ryqq/static/media/player.a628799e.png?max_age=2592000');
    opacity: .8;
  }
  .btn_big_prev {
    top: 4px;
    left: 0;
    width: 19px;
    height: 20px;
    background-position: 0 -30px;
  }
  .btn_big_play {
    top: 0;
    left: 65px;
    width: 21px;
    height: 29px;
    background-position: 0 0;
  }
  .btn_big_next {
    top: 4px;
    left: 132px;
    width: 19px;
    height: 20px;
    background-position: 0 -52px;
  }
  .btn_big_style_list {
    background-position: 0 -205px;
  }

  .btn_big_style_list, .btn_big_style_single {
    top: 4px;
    right: 378px;
    width: 26px;
    height: 25px;
  }
  .btn_big_like {
    top: 4px;
    right: 330px;
    width: 23px;
    height: 21px;
    background-position: 0 -96px;
  }
  .btn_big_down {
    top: 4px;
    right: 286px;
    width: 22px;
    height: 21px;
    background-position: 0 -120px;
  }
  .btn_big_only {
    top: 3px;
    right: 137px;
    width: 74px;
    height: 26px;
    background-position: 0 -282px;
  }
  .mod_btn_comment {
    top: 3px;
    right: 237px;
    width: 24px;
    height: 24px;
    background-position: 0 -400px;
  }
  .btn_comment99 {
    background-position: 0 -430px;
  }
  .player_music {
    position: relative;
    margin: 0 448px 0 208px;
  }
  .player_music__info {
    padding-right: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player_music__time {
    position: absolute;
    top: 0;
    right: 0;
  }
  .player_progress {
    padding-top: 6px;
    height: 8px;
    cursor: pointer;
  }
  .player_voice {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    padding-top: 13px;
  }
  .player_progress__inner {
    position: relative;
    height: 2px;
    background: hsla(0,0%,100%,.1);
  }
  .player_progress__load {
    height: 2px;
    background: hsla(0,0%,100%,.2);
  }
  .player_progress__play {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: hsla(0,0%,100%,.7);
  }
  .player_progress__dot {
    top: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    background-position: 0 -170px;
    opacity: 1;
    filter: none;
  }
  .btn_big_voice {
    top: 4px;
    left: -31px;
    width: 26px;
    height: 21px;
    background-position: 0 -144px;
  }
</style>

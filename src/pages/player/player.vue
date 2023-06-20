<template>
  <div id="app">
    <h1 class="player_logo">
      <a href="/" target="_blank">
        <img class="player_logo__pic" src="//y.qq.com/mediastyle/yqq/img/player_logo.png?max_age=2592000" alt="QQ音乐">
      </a>
    </h1>
    <div class="bg_player_mask"></div>
    <div class="bg_player" :style="bgStyle"></div>
    <PlayerLogin></PlayerLogin>
    <ModPlayer :audio="audio"></ModPlayer>
    <audio :src="SongSrc" style="display: none" ref="audio"></audio>
  </div>
</template>

<script>
import PlayerLogin from './components/PlayerLogin'
import ModPlayer from './components/ModPlayer'
import {mapState,mapMutations} from 'vuex'
import pubSub from 'pubsub-js'
export default {
  name: 'player',
  components: {ModPlayer, PlayerLogin},
  data () {
    return {
      playSongData: {},
      audio: null,
    }
  },
  computed: {
    ...mapState('SongListOptions', ['SongList', 'CurrentSongIndex']),
    ...mapState('MusicVideoOptions', ['SongSrc']),
    bgStyle(){
      if (!this.SongList){
        return "display: none;"
      }
      return "display: block; background-image: url('//y.qq.com/music/photo_new/T002R300x300M000"+this.SongList[this.CurrentSongIndex].album.pmid+".jpg?max_age=2592000'); " +
        "background-color: rgb(255, 255, 255);"
    }
  },
  methods:{
    ...mapMutations('MusicVideoOptions',{updatePlay:'updatePlaying'}),
    closeSongEvent(){
      this.$bus.$emit('closeEvent')
    },
    loadAudio(){
      this.$refs.audio.load()
      // this.$refs.audio.play()
    },
    isLikeList(){
      let mids=[]
      for(let item of this.playSongData.value.songList){
        mids.push(item.mid)
      }
      this.$axios.get("/api/isMyLike?mids=" + JSON.stringify(mids)).then(
        response=>{
          this.setlist(this.LikeList = response.data.req_4.data.m_fan)
        }
      )
    },
    ...mapMutations('SongListOptions',{setlist:'setLikeList'})
  },
  mounted () {
    this.audio = this.$refs.audio
    this.playSongData = JSON.parse(localStorage.getItem('playSongData'))
    this.isLikeList()
    this.$bus.$emit('initSrc')
    /**
     * @function 监听播放数据是否加载
     */
    this.$refs.audio.addEventListener("loadstart", ()=> {
      console.log("audio路径已加载完毕！")
      console.log("关闭歌曲监听器")
      this.closeSongEvent()
      this.$bus.$emit('CutSong')
      this.$refs.audio.play()
    })
    /**
     * @function 监听播放结束
     */
    this.$refs.audio.addEventListener("ended",()=> {
      console.log("播放已结束")
      this.closeSongEvent()
      this.$bus.$emit('next')
    })
    /**
     * @function 监听播放开始
     */
    this.$refs.audio.addEventListener('play',()=> {
      console.log("开启歌曲监听器")
      this.$bus.$emit('ListeningForEvents')
      console.log('开始播放')
      this.updatePlay(true)
    })
    /**
     * @function 监听播放暂停
     */
    this.$refs.audio.addEventListener('pause',()=>{
      console.log('播放暂停')
      this.closeSongEvent()
      this.updatePlay(false)
    })
    this.a = pubSub.subscribe("load", this.loadAudio)
  }
}
</script>

<style>
  @import "../../../static/css/CommonStyles.css";
  @import "../../../static/css/PlayerCommonStyle.css";
  body{
    background-color: #292a2b;
    transition: background-color 1s;
  }
  .player_logo {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 3;
  }
  .player_logo__pic {
    width: 78px;
    height: 21px;
    opacity: .3;
    filter: alpha(opacity=30);
  }
  .bg_player_mask {
    background-color: #292a2b;
    background-color: rgba(0,0,0,.35);
    z-index: 2;
  }

  .bg_player, .bg_player_mask {
    position: absolute;
    top: 0;
    left: 0;
  }
  .bg_player, .bg_player_mask, body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bg_player {
    display: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: .6;
    transform: translateZ(0);
  }
  .player_logo__pic:hover {
    opacity: 1;
  }
  .mod_player, .mod_player a {
    color: #bdbdbe;
    color: hsla(0,0%,88.2%,.8);
  }
</style>

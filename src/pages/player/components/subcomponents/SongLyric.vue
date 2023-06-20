<template>
  <div class="song_info__lyric" v-if="audio && Lyric">
    <div class="song_info__lyric_box" id="js_lyric_box">
      <div class="song_info__lyric_inner" id="qrc_ctn" :style="handleInnerStyle">
        <SongLyricItem v-for="(item,index) in Lyric.lrc" :data="item" :key="index" :index="index" :currentIndex="CurrentIndex"></SongLyricItem>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SongLyricItem from './itemList/SongLyricItem'
  export default {
    name: 'SongLyric',
    components: {SongLyricItem},
    props:['audio'],
    data(){
      return{
        CurrentTime: 0,
        CurrentIndex: 0,
        OffsetTop: -0
      }
    },
    computed:{
      handleInnerStyle(){
        return 'transition: transform 0.1s ease-out 0s; transform: translateY('+ (130 + this.OffsetTop) +'px)'
      },
      ...mapState('MusicVideoOptions',['Lyric'])
    },
    methods:{
      setCurrentTime(){
        this.CurrentTime = this.audio.currentTime
      },

    },
    mounted () {
      this.s = setInterval(this.setCurrentTime,50)
      this.$bus.$on('CutSong', ()=>{
        this.CurrentIndex = 0
        this.OffsetTop = -0
      })
    },
    watch:{
      CurrentTime(value){
        if(this.CurrentIndex< this.Lyric.lrc.length){
          if(this.CurrentIndex !== this.Lyric.lrc.length -1 &&(value >= (parseInt(this.Lyric.lrc[this.CurrentIndex+1].time.m) * 60 + parseInt(this.Lyric.lrc[this.CurrentIndex+1].time.s)
            + parseInt(this.Lyric.lrc[this.CurrentIndex+1].time.ms) / 100)) && (this.CurrentIndex !== (this.Lyric.lrc.length - 1))){
            this.CurrentIndex++
          }else if(this.Lyric.lrc[this.CurrentIndex] && value <= (parseInt(this.Lyric.lrc[this.CurrentIndex].time.m) * 60 + parseInt(this.Lyric.lrc[this.CurrentIndex].time.s)
            + parseInt(this.Lyric.lrc[this.CurrentIndex].time.ms) / 100)){
            this.CurrentIndex--
          }
        }
      },
      CurrentIndex(newValue,oldValue){
        let p = document.getElementById('qrc_ctn').querySelectorAll('p')[this.CurrentIndex]
        if (!p) return
        let height = p.clientHeight
        if(newValue > oldValue){
          this.OffsetTop -= height
        }else {
          this.OffsetTop += height
        }

      }
    },
    beforeDestroy () {
      clearInterval(this.s)
    }
  }
</script>

<style scoped>
  .song_info__lyric, .song_info__lyric_box {
    position: absolute;
    left: 0;
    overflow: hidden;
  }
  .song_info__lyric {
    top: 320px;
    bottom: 50px;
    width: 100%;
    -webkit-mask-image: linear-gradient(180deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.6) 15%,#fff 25%,#fff 75%,hsla(0,0%,100%,.6) 85%,hsla(0,0%,100%,0));
  }
  .song_info__lyric_box {
    top: 0;
    right: 0;
    bottom: 0;
    cursor: move;
    cursor: grab;
    margin-right: -30px;
    overflow-y: auto;
  }
  .song_info__lyric_inner {
    margin-right: 30px;
    line-height: 34px;
    transition: transform .1s ease-out 0s;
  }
  .song_info__lyric .on {
    color: #31c27c;
  }

</style>

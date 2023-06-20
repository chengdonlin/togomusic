<template>
    <div class="main">
      <SongHeaderComponent :playListData="MusicData" :type="true" :num="playListComment ? playListComment.TotalCmNum : 0"></SongHeaderComponent>

      <div class="mod_loading" v-show="!MusicData"><i class="icon_txt">加载中</i></div>

      <div class="detail_layout" v-if="MusicData">
            <div class="detail_layout__main">
                <MusicLyricComponent :lyricData="LyricData"></MusicLyricComponent>
                <CommentComponent  :playListComment="playListComment" v-if="playListComment"></CommentComponent>
            </div>
            <AboutComponent></AboutComponent>
        </div>
    </div>
</template>

<script>
import CommentComponent from './SongListTemplate/CommentComponent'
import AboutComponent from './SongListTemplate/AboutComponent'
import axios from 'axios'
import MusicLyricComponent from './SongListTemplate/MusicLyricComponent'
import SongHeaderComponent from './SongListTemplate/SongHeaderComponent'
export default {
  name: 'MusicPageComponent',
  props: ['mid'],
  data () {
    return {
      MusicData: null,
      LyricData: null,
      playListComment: null
    }
  },
  mounted () {
    //  获取歌曲信息
    axios.get('/api/getMusicInfo?mid=' + this.mid).then((resp) => {
      // console.log(resp.data.req_1.data)
      this.MusicData = resp.data.req_1.data
      let BizId = this.MusicData.track_info.id
      axios.get('/api/getPlayListComment?id=' + BizId + '&BizType=1').then((resp) => {
        this.playListComment = resp.data.req_1.data
      })
    })
    axios.get('/api/getMusicLyric?mid=' + this.mid).then((resp) => {
      this.LyricData = resp.data.lyric.data
    })
  },
  components: {SongHeaderComponent, MusicLyricComponent, AboutComponent, CommentComponent}
}
</script>

<style scoped>
    .detail_layout__main {
        float: left;
        width: 100%;
        padding-bottom: 20px;
    }

    .detail_layout__main {
        float: left;
        width: 100%;
        padding-bottom: 20px;
    }
    .main {
        z-index: 2;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .detail_layout {
        padding-right: 343px;
    }

</style>

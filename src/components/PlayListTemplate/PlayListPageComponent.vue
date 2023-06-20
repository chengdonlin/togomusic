<template>
    <div class="main">
        <SongHeaderComponent :playListData="playListData" :type="false" :num="playListComment.TotalCmNum"></SongHeaderComponent>

      <div class="mod_loading" v-if="!playListData.dirinfo.title"><i class="icon_txt">加载中</i></div>

        <div class="detail_layout" v-if="playListData.dirinfo.title">
            <div class="detail_layout__main">
                <MusicListComponent :playListData="playListData"></MusicListComponent>
                <CommentComponent :playListComment="playListComment"></CommentComponent>
            </div>
            <AboutComponent :playListData="playListData"></AboutComponent>
        </div>
    </div>

</template>

<script>
import SongHeaderComponent from './SongListTemplate/SongHeaderComponent'
import CommentComponent from './SongListTemplate/CommentComponent'
import AboutComponent from './SongListTemplate/AboutComponent'
import MusicListComponent from './SongListTemplate/MusicListComponent'
import axios from 'axios'
export default {
  name: 'PlayListPageComponent',
  props: ['mid'],
  components: {MusicListComponent, AboutComponent, CommentComponent, SongHeaderComponent},
  data () {
    return {
      playListData: {dirinfo: {}, songlist: []},
      playListComment: {}
    }
  },
  mounted () {
    axios.get('/api/getSongListById?dissId=' + this.mid).then((resp) => {
      console.log(resp.data)
      this.playListData = resp.data.req_1.data
    })
    axios.get('/api/getPlayListComment?id=' + this.mid + '&BizType=3').then((resp) => {
      console.log(resp.data)
      this.playListComment = resp.data.req_1.data
    })
  }
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

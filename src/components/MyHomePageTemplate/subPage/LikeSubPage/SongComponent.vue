<template>
  <div class="profile_cont">
    <div class="js_sub" id="like_song_box">
      <div class="mod_songlist_toolbar">
        <a class="mod_btn_green">
          <i class="mod_btn_green__icon_play">
          </i>
          播放全部
        </a>
        <a class="mod_btn">
          <i class="mod_btn__icon_add">
          </i>
          添加到
        </a>
        <a class="mod_btn">
          <i class="mod_btn__icon_down">
          </i>
          下载
        </a>
        <a class="mod_btn">
          <i class="mod_btn__icon_batch">
          </i>
          批量操作
        </a>
      </div>


      <div class="mod_loading" v-if="!playListData"><i class="icon_txt">加载中</i></div>


      <MusicListComponent :playListData="playListData" v-if="playListData"></MusicListComponent>

    </div>
    <div id="page_box">
      <div class="client_guide">
        <p class="client_guide__txt">
          查看更多内容，请下载客户端
        </p>
        <a class="client_guide__btn">
          立即下载
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import MusicListComponent from '../../../PlayListTemplate/SongListTemplate/MusicListComponent'
  export default {
    name: 'SongComponent',
    data(){
      return {
        playListData: null,
        myLikeId: 0
      }
    },
    components: {MusicListComponent},
    computed:{
      myInfo(){
        return this.$store.state.UserInfoOptions.myInfo
      }
    },
    methods: {
      init(){
        if (this.myInfo){
          for (let i in this.myInfo.mymusic){
            if (this.myInfo.mymusic[i].type === 1){
              this.$axios.get('/api/getSongListById?dissId=' + this.myInfo.mymusic[i].id).then((resp)=>{
                this.playListData = resp.data.req_1.data
              })
            }
          }

        }
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      myInfo(){
        this.init()
      }
    }
  }
</script>

<style scoped>
  .profile_exclusive .mod_songlist_toolbar {
    padding-top: 50px;
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
  .mod_btn__icon_add, .mod_btn__icon_batch, .mod_btn__icon_comment, .mod_btn__icon_copy, .mod_btn__icon_delete, .mod_btn__icon_down, .mod_btn__icon_edit, .mod_btn__icon_input, .mod_btn__icon_less, .mod_btn__icon_like, .mod_btn__icon_manage, .mod_btn__icon_menu, .mod_btn__icon_more, .mod_btn__icon_new, .mod_btn__icon_no, .mod_btn__icon_play, .mod_btn__icon_qr, .mod_btn__icon_recovery, .mod_btn__icon_upload, .mod_btn__icon_yes, .mod_btn_green__icon_add, .mod_btn_green__icon_clear, .mod_btn_green__icon_delete, .mod_btn_green__icon_down, .mod_btn_green__icon_like, .mod_btn_green__icon_more, .mod_btn_green__icon_play, .mod_btn_green__icon_radio {
    display: inline-block;
    margin-right: 6px;
    background-image: url(http://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
    background-repeat: no-repeat;
    vertical-align: -3px;
  }


  .mod_songlist_toolbar .mod_btn {
    min-width: 122px;
    text-align: center;
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

  .mod_btn {
    border: 1px solid #c9c9c9;
    color: #000;
  }

</style>

<template>
  <div>
    <div class="playlist_toolbar">
      <button class="mod_btn js_create_new" data-stat="y_new.profile.create_playlist.create_new">
        <i class="mod_btn__icon_new"></i>新建歌单
      </button>
      <button class="mod_btn js_import" data-stat="y_new.profile.create_playlist.import">
        <i class="mod_btn__icon_input"></i>导入歌单
      </button>
      <button class="mod_btn js_recover" data-stat="y_new.profile.create_playlist.recover">
        <i class="mod_btn__icon_recovery"></i>恢复歌单
      </button>
      <div class="style_switch" aria-label="排列方式">
        <a class="style_switch__item " title="上图下文" data-type="mod_playlist" data-tab="like_playlist" data-stat="y_new.profile.like.playlist.pic_mod">
          <i class="icon_style_pic sprite"></i>
          <span class="icon_txt">上图下文</span>
        </a>
        <a class="style_switch__item style_switch__item--select" title="列表" data-type="mod_playlist_text" data-tab="like_playlist" data-stat="y_new.profile.like.playlist.list_mod">
          <i class="icon_style_list sprite"></i>
          <span class="icon_txt">列表</span>
        </a>
      </div>
    </div>


    <div class="mod_loading" v-if="!myCreateSongList"><i class="icon_txt">加载中</i></div>


    <div class="mod_playlist_text " v-if="myCreateSongList">
      <ul class="playlist__header">
        <li class="playlist__header_name">歌单</li>
        <li class="playlist__header_number">曲目数</li>
        <li class="playlist__header_author"></li>
        <li class="playlist__header_other">收听</li>
      </ul>
      <ul class="playlist__list ">
        <li class="playlist__item" :class="index % 2 === 0? '' : 'playlist__item--even'"
            v-for="(i,index) in myCreateSongList.disslist" :key="index" v-if="i.tid != 0">
          <div class="playlist__cover mod_cover">
            <a :href="'/playlistPage/' + i.tid">
              <img class="playlist__pic"  :src="i.diss_cover == '?n=1' ? 'https://y.qq.com/mediastyle/global/img/cover_like.png?max_age=2592000' : i.diss_cover" :alt="i.diss_name">
            </a>
          </div>
          <h4 class="playlist__title">
					<span class="playlist__title_txt">
						<a :href="'/playlistPage/' + i.tid">{{i.diss_name}}</a>
					</span>
          </h4>
          <div class="mod_list_menu">
            <a class="list_menu__item list_menu__play" title="播放">
              <i class="list_menu__icon_play"></i>
              <span class="icon_txt">播放</span>
            </a>
            <a class="list_menu__item list_menu__add" title="添加到歌单">
              <i class="list_menu__icon_add"></i>
              <span class="icon_txt">添加到歌单</span>
            </a>
            <a class="list_menu__item list_menu__down" title="VIP下载">
              <i class="list_menu__icon_down"></i>
              <span class="icon_txt">VIP下载</span>
            </a>
            <a class="list_menu__item list_menu__share" title="分享">
              <i class="list_menu__icon_share"></i>
              <span class="icon_txt">分享</span>
            </a>
          </div>
          <div class="playlist__number">{{i.song_cnt}}首</div>
          <div class="playlist__other">{{i.listen_num > 0 ? i.listen_num : ''}}</div>
        </li>
      </ul>
    </div>
    <div id="page_box">
      <div class="client_guide">
        <p class="client_guide__txt">查看更多内容，请下载客户端</p>
        <a class="client_guide__btn">立即下载</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateComponent',
    data(){
      return {
        myCreateSongList: null
      }
    },
    mounted () {
      this.$axios.get("/api/getUserSongList").then((resp)=>{
        this.myCreateSongList = resp.data.data
      })
    }
  }
</script>

<style scoped>
  .playlist_toolbar {
    padding-top: 30px;
    height: 40px;
    margin-bottom: -34px;
  }
  .mod_btn {
    border: 1px solid #c9c9c9;
    color: #000;
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
  .style_switch {
    position: absolute;
    top: 30px;
    right: 0;
    width: 80px;
    height: 38px;
    border-radius: 2px;
    border: 1px solid #5a5757;
  }
  .mod_btn__icon_new {
    width: 16px;
    height: 16px;
    background-position: 0 -180px;
  }
  .mod_btn__icon_input, .mod_btn__icon_like {
    width: 16px;
    height: 16px;
    vertical-align: -4px;
  }
  .mod_btn__icon_input {
    background-position: -22px -100px;
  }
  .mod_btn__icon_recovery {
    width: 16px;
    height: 16px;
    background-position: -100px -300px;
    vertical-align: -3px;
  }
  .style_switch__item {
    float: left;
    width: 50%;
    height: 38px;
    position: relative;
  }
  .style_switch__item--select {
    background-color: #31c27c;
  }
  .icon_txt {
    font: 0/0 a;
  }
  .icon_style_pic {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -7px;
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
  }
  .mod_btn {
    border: 1px solid #c9c9c9;
    color: #000;
  }
  .icon_style_pic {
    background-position: -80px -80px;
  }
  .icon_style_list {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -7px;
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
  }
  .mod_btn__icon_add, .mod_btn__icon_batch, .mod_btn__icon_comment, .mod_btn__icon_copy, .mod_btn__icon_delete, .mod_btn__icon_down, .mod_btn__icon_edit, .mod_btn__icon_input, .mod_btn__icon_less, .mod_btn__icon_like, .mod_btn__icon_manage, .mod_btn__icon_menu, .mod_btn__icon_more, .mod_btn__icon_new, .mod_btn__icon_no, .mod_btn__icon_play, .mod_btn__icon_qr, .mod_btn__icon_recovery, .mod_btn__icon_upload, .mod_btn__icon_yes, .mod_btn_green__icon_add, .mod_btn_green__icon_clear, .mod_btn_green__icon_delete, .mod_btn_green__icon_down, .mod_btn_green__icon_like, .mod_btn_green__icon_more, .mod_btn_green__icon_play, .mod_btn_green__icon_radio {
    display: inline-block;
    margin-right: 6px;
    background-image: url(	https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
    background-repeat: no-repeat;
    vertical-align: -3px;
  }
  button {
    background-color: #fff;
  }
  .playlist__header {
    height: 50px;
    line-height: 50px;
    background-color: #fbfbfd;
    color: #999;
  }
  .icon_style_list {
    background-position: -100px -80px;
  }
  .profile_exclusive .mod_playlist_text .playlist__header_name {
    width: 46.416667%;
  }

  .mod_playlist_text .playlist__header_name {
    width: 57%;
  }
  .playlist__header_number, .mod_playlist_text .playlist__number{
    width: 18.5%;
  }
  .playlist__header_author{
    width: 18.5%;
  }
  .mod_playlist_text .playlist__header_other, .mod_playlist_text .playlist__other {
    float: right;
    padding-right: 20px;
    text-align: right;
  }
  .playlist__header_other, .mod_playlist_text .playlist__other {
    text-align: left;
    width: 8%;
  }
  .mod_playlist_text .playlist__header_author, .mod_playlist_text .playlist__header_name, .mod_playlist_text .playlist__header_number, .mod_playlist_text .playlist__number {
    float: left;
    padding-left: 20px;
  }
  .mod_playlist_text .playlist__author, .mod_playlist_text .playlist__count, .mod_playlist_text .playlist__number, .mod_playlist_text .playlist__title {
    float: left;
    height: 70px;
  }
  .mod_playlist_text .playlist__author, .mod_playlist_text .playlist__header_author, .mod_playlist_text .playlist__header_name, .mod_playlist_text .playlist__header_number, .mod_playlist_text .playlist__number {
    float: left;
    padding-left: 20px;
  }
  .profile_exclusive .mod_playlist_text {
    padding-top: 50px;
  }
  .profile_exclusive .mod_playlist_text, .profile_exclusive .mod_singer_list, .profile_exclusive .mod_songlist, .profile_exclusive .mod_voice_text {
    padding-bottom: 40px;
  }
  .mod_playlist_text {
    zoom: 1;
    font-size: 14px;
  }
  .mod_playlist_text .playlist__item {
    position: relative;
    height: 70px;
    line-height: 70px;
    zoom: 1;
    overflow: hidden;
    clear: both;
    font-size: 0;
  }
  .mod_playlist_text .playlist__cover {
    position: relative;
    float: left;
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-top: 10px;
    padding-left: 20px;
  }
  .mod_cover {
    zoom: 1;
  }
  @supports ((-o-object-fit: cover) or (object-fit:cover)) {
    .mod_playlist_text .playlist__pic {
      height:100%;
      -o-object-fit: cover;
      object-fit: cover
    }
  }
  .mod_playlist_text .playlist__pic {
    display: block;
    width: 100%;
    min-height: 50px;
  }
  .mod_playlist_text .playlist__title {
    float: left;
    height: 70px;
  }
  .mod_playlist_text .playlist__author, .mod_playlist_text .playlist__number, .mod_playlist_text .playlist__other, .mod_playlist_text .playlist__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .mod_playlist_text .playlist__title {
    width: 52.66667%;
    font-weight: 400;
    text-indent: 15px;
    overflow: hidden;
  }
  .mod_playlist_text .playlist__title_txt {
    float: left;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mod_playlist_text .mod_list_menu {
    position: absolute;
    left: 44%;
    left: -9999px\9;
    top: 19px;
    overflow: hidden;
    opacity: 0;
    /*pointer-events: none;*/
  }




  /*       */
  .playlist__item:hover  .mod_list_menu{
    opacity: 1;
    left: 34%;
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

  .list_menu__item:hover .list_menu__icon_play{
    background-position: -40px 0;
  }
  .list_menu__item:hover .list_menu__icon_add{
    background-position: -40px -80px
  }
  .list_menu__item:hover .list_menu__icon_down{
    background-position: -40px -120px;
  }
  .list_menu__item:hover .list_menu__icon_share{
    background-position: -40px -40px;
  }
  .list_menu__icon_add, .list_menu__icon_delete, .list_menu__icon_down, .list_menu__icon_down_vip, .list_menu__icon_edit, .list_menu__icon_pause, .list_menu__icon_play, .list_menu__icon_share {
    display: block;
    width: 36px;
    height: 36px;
    background-image: url(	https://y.qq.com/ryqq/static/media/icon_list_menu.08951c0e.png?max_age=2592000);
    background-repeat: no-repeat;
  }
  .list_menu__icon_play {
    background-position: 0 0;
  }
  .icon_txt {
    font: 0/0 a;
  }
  .list_menu__item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
  }
  .list_menu__icon_add {
    background-position: 0 -80px;
  }
  .list_menu__icon_down {
    background-position: 0 -120px;
  }
  .list_menu__icon_share {
    background-position: 0 -40px;
  }
/*        */

  .profile_exclusive .mod_playlist_text .playlist__title {
    width: 42.166667%;
  }
  .mod_playlist_text .playlist__header_other, .mod_playlist_text .playlist__other {
    text-align: left;
    width: 8%;
  }
  .mod_playlist_text .playlist__other {
    color: #999;
  }
  .sprite,.sprite_before:before {
    background-image: url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
  }


</style>

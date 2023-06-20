<template>
  <div class="song_info__info">
    <a class="song_info__cover" rel="noopener noreferrer">
      <img class="song_info__pic" :src="!SongList? '../../../../../static/img/player_cover.png':'http://y.qq.com/music/photo_new/T002R300x300M000'+SongList[CurrentSongIndex].album.pmid+'.jpg?max_age=2592000'">
    </a>
    <div v-if="SongList">
      <div class="song_info__name" >歌曲名：<a href="/n/ryqq/songDetail/002pWY4s0YzT04?" target="_blank">{{SongList[CurrentSongIndex].name}}</a>
      </div>
      <div class="song_info__singer" v-if="">歌手：<a class="playlist__author" title="Martin Arteta" href="/n/ryqq/singer/000lltKA45yFCC"
                                                   v-for="(item, index) in SongList[CurrentSongIndex].singer" :key="index">
        {{index!= 0? ' / ' : ''}}{{item.name}}
      </a>
      </div>
      <div class="song_info__album">专辑：<a href="/n/ryqq/albumDetail/000bX40S3a7HOK" target="_blank" >{{SongList[CurrentSongIndex].album.name}}</a>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'SongInfo_info',
    computed:{
      ...mapState('MusicVideoOptions', ['Lyric']),
      ...mapState('SongListOptions', ['SongList', 'CurrentSongIndex'])
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .song_info__cover {
    position: relative;
    display: block;
    width: 186px;
    height: 186px;
    margin: auto;
  }
  .song_info__pic {
    vertical-align: middle;
    width: 186px;
    height: 186px;
  }
  .song_info__cover:after {
    content: "";
    position: absolute;
    left: 9px;
    top: 0;
    width: 201px;
    height: 180px;
    background: url('https://y.qq.com/ryqq/static/media/album_cover_player.8dfd80d6.png?max_age=2592000') 0 0 no-repeat;
  }
  .song_info__album, .song_info__name, .song_info__singer {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 28px;
  }

  .song_info__name {
    margin-top: 15px;
  }
</style>

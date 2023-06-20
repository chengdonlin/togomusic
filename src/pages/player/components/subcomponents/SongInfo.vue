<template>
<div class="mod_song_info">
  <SongInfo_info></SongInfo_info>
  <SongLyric :audio="audio"></SongLyric>
</div>
</template>

<script>
import SongInfo_info from './SongInfo_info'
import SongLyric from './SongLyric'
export default {
  name: 'SongInfo',
  components: {SongLyric, SongInfo_info},
  props:['audio']
}
</script>

<style scoped>
  .mod_song_info {
    position: absolute;
    top: 0;
    right: 0;
    width: 340px;
    height: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }
</style>

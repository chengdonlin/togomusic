<template>
<div class="player__bd">
  <div class="player_style_normal">
    <SongListToolBar></SongListToolBar>
    <SongListMain></SongListMain>
    <SongInfo :audio="audio"></SongInfo>
  </div>
</div>
</template>

<script>
import SongListToolBar from './SongListToolBar'
import SongListMain from './SongListMain'
import SongInfo from './SongInfo'
export default {
  name: 'PlayerBorder',
  components: {SongInfo, SongListMain, SongListToolBar},
  props:['audio']
}
</script>

<style scoped>
  .player__bd {
    position: absolute;
    width: 100%;
    top: 11%;
    bottom: 18%;
    min-height: 328px;
    cursor: default;
  }
  .player_style_normal {
    margin-right: 440px;
  }
</style>

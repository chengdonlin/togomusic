<template>
  <div class="mod_player">
    <div class="player__hd"></div>
    <PlayerBorder :audio="audio"></PlayerBorder>
    <PlayerFooter :audio="audio"></PlayerFooter>
  </div>
</template>

<script>
import PlayerBorder from './subcomponents/PlayerBorder'
import PlayerFooter from './subcomponents/PlayerFooter'
export default {
  name: 'ModPlayer',
  props:['audio'],
  components: {PlayerFooter, PlayerBorder}
}
</script>

<style scoped>
  .mod_player {
    height: 100vh;
    margin: 0 7.638889%;
    position: relative;
    z-index: 3;
  }
</style>

<template>
  <p :class="index === currentIndex?'on':''"  ref="lyricItem">
    <span>{{data.lyric}}</span>
  </p>
</template>

<script>
  export default {
    name: 'SongLyricItem',
    props:['data','index','currentIndex']
  }
</script>

<style scoped>

</style>

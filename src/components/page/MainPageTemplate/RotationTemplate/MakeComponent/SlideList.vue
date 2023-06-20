<template>
    <ul class="playlist__list slide__list" :style="{'left':(AllScrollData.hot*-100)+'%'}">
        <PlayListItem v-for="(item, index) in (!data ? [null,null,null,null,null,null] :data)" :key="index" :data="!item ? null :item.Playlist.basic"></PlayListItem>
    </ul>
</template>

<script>
import {mapState} from 'vuex'
import PlayListItem from './PlayListItem'
export default {
  name: 'SlideList',
  props: ['data'],
  components: {
    PlayListItem
  },
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  mounted () {
  }
}
</script>

<style scoped>
    .mod_playlist .playlist__list {
        margin-right: -20px;
    }

    .slide__list {
        position: relative;
        font-size: 0;
        width: 1250%;
        transition: .5s;
    }
</style>

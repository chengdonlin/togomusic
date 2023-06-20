<template>
    <div class="mod_playlist mod_slide">
        <SlideList :data="data"></SlideList>
    </div>
</template>

<script>
import SlideList from './SlideList'
export default {
  name: 'PlayList',
  props: ['data'],
  components: {
    SlideList
  },
  methods: {

  }
}
</script>

<style scoped>
    .mod_playlist {
        margin-right: -20px;
        font-size: 0;
    }

    .mod_slide {
        overflow: hidden;
        margin-bottom: 20px;
    }
</style>

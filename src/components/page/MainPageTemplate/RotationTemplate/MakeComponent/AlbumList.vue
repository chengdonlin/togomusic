<template>
    <ul class="playlist__list mod_playlist">
        <AlbumItem v-for="item in data" :key="item.mid" :data="item"></AlbumItem>
    </ul>
</template>

<script>
import AlbumItem from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/AlbumItem'
export default {
  name: 'AlbumList',
  props: ['data'],
  components: {AlbumItem}
}
</script>

<style scoped>
    .mod_index--album .playlist__list {
        display: block;
        float: left;
        width: 8%;
        margin-right: 0;
    }
</style>

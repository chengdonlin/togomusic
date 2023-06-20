<template>
    <div class="mod_playlist mod_slide">
        <div class="slide__list js_list" :style="{'left':(AllScrollData.album*-100)+'%'}">
            <AlbumList v-for="(item,index) in newData" :key="index" :data="item"></AlbumList>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import AlbumList from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/AlbumList'
export default {
  name: 'VueAlbum',
  components: {AlbumList},
  props: ['data'],
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  data () {
    return {
      newData: []
    }
  },
  methods: {
    sliceArr (arr, size) {
      // arr是传入的要切割的数组
      // size是每个切割的数组有多少项
      let newArr = []
      for (let x = 0; x < Math.ceil(arr.length / size); x++) {
        let start = x * size
        let end = start + size
        newArr.push(arr.slice(start, end))
      }
      return newArr
    },
    init () {
      this.newData = this.sliceArr(this.data, 10)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    data () {
      console.log('监测到数据发生变化')
      this.init()
    }
  }
}
</script>

<style scoped>
    .mod_index--album .mod_playlist {
        margin-bottom: -5px;
    }
    .mod_playlist {
        margin-right: -20px;
        overflow: hidden;
        font-size: 0;
    }
    .slide__list {
        position: relative;
        font-size: 0;
        width: 1250%;
        transition: .5s;
    }
</style>

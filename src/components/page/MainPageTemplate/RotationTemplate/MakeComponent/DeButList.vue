<template>
    <div class="mod_debutlist mod_slide">
        <div class="slide__list" :style="{'left':(AllScrollData.song*-100)+'%'}">
            <DeButListList v-for="(ulItems,index) in NewData" :key="index" :data="ulItems"></DeButListList>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import DeButListList from './DeButListList'
export default {
  name: 'DeButList',
  props: ['data'],
  data () {
    return {
      NewData: [null]
    }
  },
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  components: {
    DeButListList
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
      if(this.data){
        this.NewData = this.sliceArr(this.data, 9)
      }
    }
  },
  watch: {
    data () {
      console.log('监测到数据发生变化！')
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
    .mod_debutlist {
        margin: 11px -30px 10px 0;
    }
    .mod_slide {
        overflow: hidden;
        margin-bottom: 20px;
    }
    .slide__list {
        position: relative;
        font-size: 0;
        width: 1250%;
        transition: .5s;
    }
</style>

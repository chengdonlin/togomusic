<template>
    <div class="mod_mv mod_slide">
        <div class="slide__list" :style="{'left':(AllScrollData.mv*-100)+'%'}">
            <MvList v-for="(item,index) in NewData" :key="index" :data="item"></MvList>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import MvList from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/MvList'
export default {
  name: 'VueMv',
  components: {MvList},
  props: ['data'],
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  data () {
    return {
      NewData: []
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
      this.NewData = this.sliceArr(this.data, 10)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    data () {
      this.init()
    }
  }
}
</script>

<style scoped>
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

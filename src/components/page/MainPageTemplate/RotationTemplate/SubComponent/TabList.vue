<template>
    <div class="mod_index_tab">
        <a class="index_tab_item" v-for="item in titleList" :key="item.id" :class="(item.id? item.id:item.type) === currentId? 'index_tab_item--current' : ''"
           @click="handleCurrent(item.id? item.id:item.type)">
            {{item.lan? item.lan : item.name}}
        </a>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'TabList',
  props: ['titleList', 'className'],
  data () {
    return {
      currentId: 0
    }
  },
  methods: {
    handleCurrent (id) {
      console.log(id)
      // eslint-disable-next-line eqeqeq
      if (id != this.currentId) {
        this.currentId = id
        this.getNewData()
      }
    },
    getNewData () {
      axios.get('/api/getHomeDataById?id=' + this.currentId + '&key=' + this.className).then(
        response => {
          console.log(response.data)
          this.on({'data': response.data, 'name': this.className})
        }
      )
    },
    ...mapMutations('MainPageOptions', {on: 'ReplaceData'})
  },
  mounted () {
  }
}
</script>

<style scoped>
    .mod_index_tab {
        height: 50px;
        text-align: center;
        font-size: 0;
    }
    .index_tab_item--current {
        color: #31c27c!important;
    }
    .index_tab_item {
        display: inline-block;
        font-size: 15px;
        margin: 0 24px;
        color: #333;
    }
</style>

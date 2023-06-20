<template>
<div class="sb_scrollable sb_main sb_viewport">
  <div class="sb_overview" style="height: 604px;">
    <div class="mod_songlist mod_songlist--edit">
      <ul class="songlist__header">
        <li class="sprite songlist__edit" :class="isCheck? 'songlist__edit--check': 'songlist__edit'" >
          <input type="checkbox" class="songlist__checkbox" v-model="isCheck" @click="allSelect">
        </li>
        <li class="songlist__header_name">歌曲</li>
        <li class="songlist__header_author">歌手</li>
        <li class="songlist__header_time">时长</li>
      </ul>
      <ul class="songlist__list">
        <MainItem v-for="(item,index) in SongList" :key="index" :data="item || null" :index="index"></MainItem>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import {mapState} from 'vuex'
import MainItem from './itemList/MainItem'
export default {
  name: 'SongListMain',
  components: { MainItem },
  data(){
    return{
      isCheck: false
    }
  },
  computed:{
    ...mapState('SongListOptions',['SongList'])
  },
  methods:{
    allSelect(){
      this.$bus.$emit("AllSelected", {
        isCheck : this.isCheck,
        number : this.SongList.length
      })
    }
  },
  watch:{
    isCheck(value){
      this.$bus.$emit("isAllCheck",value)
    }
  }
}
</script>

<style scoped>
  .mod_songlist--edit .songlist__edit:hover {
    border-color: #fff;
  }
  .mod_songlist--edit .songlist__edit--check {
    border-color: #fff !important;
    background-position: -60px -80px;
  }
  .sb_viewport {
    overflow: hidden;
  }

  .sb_main {
    position: relative;
  }
  .sb_overview {
    margin-right: -35px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .mod_songlist {
    font-size: 14px;
    overflow: hidden;
  }
  .songlist__header {
    background-color: transparent;
    color: inherit;
  }
  .songlist__header {
    height: 50px;
    line-height: 50px;
    background-color: rgba(0,0,0,.01);
    color: #999;
  }
  .songlist__header, .songlist__item {
    position: relative;
    padding-left: 46px;
    padding-right: 95px;
  }
  .songlist__header_name{
    float: left;
    width: 47.685185%;
    position: relative;
    white-space: normal;
  }
  .songlist__header_name{
    width: 68%;
  }

  .songlist__header_author {
    float: left;
    padding-left: 15px;
    width: 25.5%;
    box-sizing: border-box;
  }
  .songlist__header_author {
    width: 26%;
    color: inherit;
  }
  .songlist__header_time {
    position: absolute;
    top: 0;
    right: 38px;
    width: 50px;
  }
  .songlist__header {
    background-color: transparent;
    color: inherit;
  }
  .sprite:hover {
    border-color: hsla(0,0%,88.2%,1);
  }
  .songlist__list {
    overflow: hidden;
    clear: both;
  }
</style>

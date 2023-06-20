<template>
<div class="mod_songlist_toolbar">
  <a class="mod_btn">
    <i class="mod_btn_green__icon_like" :class="{'mod_btn_green__icon_like--like': fullShow}"></i>收藏<span class="mod_btn__border"></span>
  </a>
  <a class="mod_btn">
    <i class="mod_btn_green__icon_add"></i>添加到<span class="mod_btn__border"></span>
  </a>
  <a class="mod_btn">
    <i class="mod_btn_green__icon_down"></i>下载<span class="mod_btn__border"></span>
  </a>
  <a class="mod_btn" @click="batchDel">
    <i class="mod_btn_green__icon_delete"></i>删除<span class="mod_btn__border"></span>
  </a>
  <a class="mod_btn">
    <i class="mod_btn_green__icon_clear"></i>清空列表<span class="mod_btn__border"></span>
  </a>
</div>
</template>

<script>
export default {
  name: 'SongListToolBar',
  data(){
    return{
      SelectedList: [],
    }
  },
  methods:{
    fullShow(){
      return false
    },
    updateList(obj){
      if(!obj.isCheck){
        this.SelectedList.push(obj.id)
      }else {
        this.SelectedList = this.SelectedList.filter((item)=>{
          return item !== obj.id
        })
      }
    },
    updateListAll(obj){
      if(!obj.isCheck){
        this.SelectedList = []
        for(let i = 0; i < obj.number; i++){
          this.SelectedList.push(this.$store.state.SongListOptions.SongList[i].id)
        }
      }else {
        this.SelectedList = []
      }
    },
    batchDel(){
      if(this.SelectedList.length !== 0){
        this.$store.commit('SongListOptions/delCheckSongList', this.SelectedList)
      }
      this.SelectedList = []
      this.$bus.$emit("isAllCheck",false)
    }
  },
  mounted () {
    this.$bus.$on('SelectedList', this.updateList)
    this.$bus.$on('AllSelected', this.updateListAll)

  },
  beforeDestroy () {
    this.$bus.$off("SelectedList")
    this.$bus.$off("AllSelected")
  }
}
</script>

<style scoped>
  .mod_songlist_toolbar {
    margin-left: 1px;
  }
  .mod_songlist_toolbar {
    position: relative;
    margin-bottom: 20px;
    font-size: 0;
  }
  .mod_player .mod_btn {
    opacity: .8;
    border-color: hsla(0,0%,100%,.2);
  }

  .mod_player .mod_btn, .mod_player .mod_btn:active, .mod_player .mod_btn:hover {
    background-color: transparent;
    color: #fff;
  }
  .mod_songlist_toolbar .mod_btn {
    min-width: 122px;
    text-align: center;
  }
  .mod_player, .mod_player a {
    color: #bdbdbe;
    color: hsla(0,0%,88.2%,.8);
  }
  .mod_btn {
    border: 1px solid #c9c9c9;
    color: #000;
  }
  .mod_btn, .mod_btn_green {
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    height: 38px;
    line-height: 38px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
  }
  .mod_player .mod_btn i {
    opacity: .6;
    filter: alpha(opacity=60);
  }

  .mod_btn_green__icon_like {
    width: 16px;
    height: 16px;
    background-position: -60px -20px;
    vertical-align: -4px;
  }
  .mod_player .mod_btn__border {
    display: none;
  }
  .mod_btn_green__icon_add {
    width: 16px;
    height: 16px;
    background-position: -20px -20px;
  }
  .mod_btn_green__icon_down {
    width: 16px;
    height: 16px;
    background-position: -40px -240px;
  }
  .mod_btn_green__icon_delete {
    width: 16px;
    height: 16px;
    background-position: -100px -20px;
  }
  .mod_btn_green__icon_clear {
    width: 17px;
    height: 17px;
    background-position: -40px -300px;
  }
  .mod_btn:hover {
    opacity: 1;
    border: 1px solid white;
  }
  .mod_btn:hover i{
    opacity: 1;
  }
</style>

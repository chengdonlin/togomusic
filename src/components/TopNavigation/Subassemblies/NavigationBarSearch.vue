<template>
    <div class="mod_search">
        <div class="mod_search_input">
            <input type="text" class="search_input" ref="input" placeholder="搜索音乐、MV、歌单、用户" value="" @focus="isShow=true" @blur="isShow=false" @keyup.enter.stop="searchTrigger"/>
            <button class="search_input_btn" @click.stop="searchTrigger">
                <i class="icon_search sprite"></i>
                <span class="icon_txt">搜索</span>
            </button>
        </div>
        <div class="mod_search_result "></div>
        <div class="mod_search_other" :class="{'drop':isShow}" ref="searchOther">
            <div class="search_hot">
                <dl class="search_hot__list">
                    <dt class="search_hot__tit" id="search_hot__tit">
                        热门推荐
                    </dt>
                </dl>
            </div>
            <div class="search_history">
                <dl class="search_history__list">
                    <dt class="search_history__tit">
                        历史搜索
                        <a class="search_history__clear" @click="clearAll"><i class="icon_history_clear"></i><span class="icon_txt">清空</span></a>
                    </dt>
                    <dd class="search_history__item" v-for="(item,index) in searchHistory" :key="index" @click="addTx(index,$event)">
                        <a class="search_history__link">{{item}}</a>
                        <a class="search_history__delete">
                            <i class="search_history__icon_delete"></i>
                            <span class="icon_txt">删除</span>
                        </a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavigationBarSearch',
  data () {
    return {
      isShow: false,
      searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || []
    }
  },
  methods: {
    searchTrigger () {
      let value = this.$refs.input.value.trim()
      if (value !== '') {
        this.searchHistory.unshift(value)
        this.$router.push({
          name: 'SearchComponent',
          path: '/search',
          params:{
            w: value,
            t: 'song'
          }
        })
      }
    },
    addTx(index, event){
      if(event.target.className === "search_history__link"){
        this.$refs.input.value = event.target.innerText
        this.searchTrigger(event.target.innerText)
      }else{
        this.searchHistory.splice(index, 1)
      }
    },
    clearAll(){
      this.searchHistory.splice(0)
    }
  },
  watch: {
    searchHistory (value) {
      localStorage.setItem('searchHistory', JSON.stringify(value))
    }
  }
}
</script>

<style scoped>
    .mod_search {
        position: absolute;
        top: 0;
        right: 284px;
    }
    .mod_search_input {
        border: 1px solid #c9c9c9;
        padding: 0 33px 0 11px;
        line-height: 36px;
        height: 36px;
        margin-top: 26px;
        position: relative;
        border-radius: 3px;
        background-color: #fff;
        transition: width .6s ease-out;
    }
    .search_input {
        width: 174px;
        height: 36px;
        border: 0;
        font-size: 14px;
        background: transparent;
        transition: width .6s ease-out,visibility .6s ease-out 1ms;
        outline: none;
    }
    .search_input_btn {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
        width: 38px;
        height: 35px;
        overflow: visible;
        background: transparent;
        cursor: pointer;
    }
    .icon_search {
        position: absolute;
        top: 50%;
        right: 11px;
        margin-top: -8px;
        width: 16px;
        height: 16px;
        background-position: 0 -40px;
    }
    .sprite, .sprite_before:before {
        background-image: url("../../../assets/img/nav_img/icon_sprite.png");
    }
    .mod_search_other, .mod_search_result, .popup_user {
        max-height: 0;
        visibility: hidden;
        transition: max-height .6s ease-out,visibility 1ms .6s;
        overflow: hidden;
    }

    .mod_search_result {
        position: absolute;
        top: 63px;
        left: 0;
        background: #fff;
        width: 218px;
        border: 1px solid #c9c9c9;
        z-index: 9;
        text-align: left;
        font-size: 14px;
    }
    .mod_search_other {
        position: absolute;
        top: 63px;
        left: 0;
        background: #fff;
        width: 218px;
        border: 1px solid #c9c9c9;
        z-index: 8;
        text-align: left;
        font-size: 14px;
        line-height: 36px;
    }
    .search_hot {
        padding: 5px 0;
    }
    .search_hot__tit {
        display: none;
    }
    .search_history {
        padding: 5px 0;
        border-bottom: 1px solid #f2f2f2;
    }
    .search_history__link, .search_history__tit {
        padding-left: 11px;
    }

    .search_history__tit {
        color: #999;
        position: relative;
    }
    .search_history__clear {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 36px;
        font-size: 2px;
        text-align: center;
    }
    .icon_history_clear {
        position: absolute;
        top: 50%;
        right: 11px;
        margin-top: -8px;
        width: 16px;
        height: 16px;
        background-position: -100px 0;
    }

    .icon_history_clear, .search_history__icon_delete {
        background-image: url("../../../assets/img/nav_img/icon_sprite.png");
    }
    .search_history__item {
        position: relative;
    }
    .search_history__link {
        display: block;
        color: #333;
        padding-right: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .search_history__delete {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 33px;
        height: 36px;
        font-size: 2px;
        text-align: center;
    }
    .search_history__icon_delete {
        position: absolute;
        top: 50%;
        right: 15px;
        margin-top: -6px;
        width: 12px;
        height: 12px;
        background-position: 0 -240px;
    }
    .drop {
        visibility: visible;
        max-height: 800px;
        transition: max-height .6s ease-out;
    }

    .search_history__item:hover{
        background: #31c27c;
        color: white;
    }
    .search_history__item:hover .search_history__delete{
        display: block;
    }
    .search_history__item:hover .search_history__link{
        color: white;
    }
</style>

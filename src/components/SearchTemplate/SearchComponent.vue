<template>
    <div class="search_exclusive">
      <div class="mod_search" role="search"
           style="background-image: url(http://y.qq.com/mediastyle/yqq/img/bg_search.jpg?max_age=2592000)">
        <div class="mod_search_input">
          <input type="text" class="search_input__input" placeholder="搜索音乐、MV、歌单、用户" v-model="val" @focus="isShow=true" ref="input" @blur="isShow=false" @keyup.enter="enter">
          <button class="search_input__btn" @click="enter">
            <i class="icon_search sprite"></i>
            <span class="icon_txt">搜索</span>
          </button>
        </div>
        <div :class="isShow && val !== ''?  'drop' : ''" class="mod_search_result " v-if="searchResp">

          <div class="search_result__sort">
            <h4 class="search_result__tit">
              <i class="search_result__icon_song"></i>单曲
            </h4>
            <ul class="search_result__list">
              <li  v-for="i in searchResp.song.itemlist">
                <a class="search_result__link" target="_blank" @click="toPage('song' ,i.mid)">
                  <span class="search_result__name">{{i.name}}</span>-<span class="search_result__singer">{{i.singer}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search_result__sort">
            <h4 class="search_result__tit">
              <i class="search_result__icon_singer"></i>歌手
            </h4>
            <ul class="search_result__list">
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/singer/002u0TJy47WWOj">
                  <span class="search_result__name">林忆莲 (Sandy Lam)</span>
                </a>
              </li>
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/singer/00128nnX2r4UFX">
                  <span class="search_result__name">叶蒨文 (Sally Yeh)</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search_result__sort">
            <h4 class="search_result__tit">
              <i class="search_result__icon_album"></i>专辑
            </h4>
            <ul class="search_result__list">
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/albumDetail/002G0MjC1C1DzQ">
                  <span class="search_result__name">Dancing With Your Ghost</span>
                  <span class="search_result__singer">Sasha Alex Sloan</span>
                </a>
              </li>
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/albumDetail/004L9Ksu1EjdDr">
                  <span class="search_result__name">海市蜃楼</span>
                  <span class="search_result__singer">三叔说</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search_result__sort">
            <h4 class="search_result__tit">
              <i class="search_result__icon_mv"></i>MV
            </h4>
            <ul class="search_result__list">
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/mv/v00396khots">
                  <span class="search_result__name">三原色</span>-<span class="search_result__singer">YOASOBI</span>
                </a>
              </li>
              <li>
                <a class="search_result__link" target="_blank" href="/n/ryqq/mv/y0031d3hid7">
                  <span class="search_result__name">Dancing With Your Ghost</span>-<span class="search_result__singer">Sasha Alex Sloan</span>
                </a>
              </li>
            </ul>
          </div>


        </div>
        <div :class="isShow && val === '' ?  'drop' : ''" class="mod_search_other">
          <div class="search_history">
            <dl class="search_history__list">
              <dt class="search_history__tit">历史搜索
                <a class="search_history__clear">
                <i class="icon_history_clear"></i>
                <span class="icon_txt">清空</span>
                </a>
              </dt>
              <dd class="search_history__item" v-for="(i, index) in history" :key="index">
                <a class="search_history__link">{{i}}</a>
                <a class="search_history__delete">
                  <i class="search_history__icon_delete"></i>
                  <span class="icon_txt">删除</span>
                </a>
              </dd>

            </dl>
          </div>
        </div>
      </div>

      <div class="main" style="padding-bottom: 40px;">
        <div class="main__inner">
          <div class="result">

            <div class="mod_intro" :class="i.type === 1?'mod_intro_singer': 'mod_intro_album'" id="zhida_singer" v-if="mData && mData.zhida.list.length !== 0" v-for="i in (mData ? mData.zhida.list : [])">
              <a class="mod_intro__cover js_singer" href="/n/ryqq/singer/0025NhlN2yWrP4">
                <img :src="i.pic" :alt="i.title" class="mod_intro__pic mod_intro_singer__pic">
              </a>
              <div class="mod_intro__info">
                <div class="mod_intro__base">
                  <h2 class="mod_intro__title">
                    <a href="/n/ryqq/singer/0025NhlN2yWrP4" class="mod_intro_singer__singer js_singer" :title="i.title">{{i.title}}<span class="c_tx_highlight"></span>
                    </a>
                    <a href="/n/ryqq/singer/0045hSEO3VDgbp" v-if="i.type === 2" class="mod_intro_album__singer js_singer" :title="i.desciption">{{i.desciption}}<span class="c_tx_highlight"></span></a>
                  </h2>
                  <a class="mod_intro_singer__link js_singer" href="#" v-if="i.type === 1">单曲<strong>{{i.custom_info.song_num}}</strong>
                  </a>
                  <a class="mod_intro_singer__link js_singer" href="#" v-if="i.type === 1">专辑<strong>{{i.custom_info.album_num}}</strong>
                  </a>
                  <a class="mod_intro_singer__link js_singer" href="#" v-if="i.type === 1">MV<strong>{{i.custom_info.mv_num}}</strong>
                  </a>
                </div>
                <div class="mod_intro__toolbar">
                  <button class="mod_btn_green js_singer_radio">
                    <i class="mod_btn_green__icon_play"></i>播放歌手热门歌曲
                  </button>
                </div>
              </div>
            </div>


            <div class="mod_tab" role="nav">
              <a class="mod_tab__item " :class="this.t === 'song' ? 'mod_tab__current': ''" @click="to('song')">单曲</a>
              <a class="mod_tab__item " :class="this.t === 'album' ? 'mod_tab__current': ''" @click="to('album')">专辑</a>
              <a class="mod_tab__item " :class="this.t === 'mv' ? 'mod_tab__current': ''" @click="to('mv')">MV</a>
              <a class="mod_tab__item " :class="this.t === 'playlist' ? 'mod_tab__current': ''" @click="to('playlist')">歌单</a>
              <a class="mod_tab__item " :class="this.t === 'user' ? 'mod_tab__current': ''" @click="to('user')">用户</a>
              <a class="mod_tab__item " :class="this.t === 'lyric' ? 'mod_tab__current': ''" @click="to('lyric')">歌词</a>
            </div>


            <!--单曲-->
            <div class="mod_songlist_toolbar" v-if="t==='song'">
              <a class="mod_btn_green">
                <i class="mod_btn_green__icon_play"></i>播放全部
              </a>
              <a class="mod_btn">
                <i class="mod_btn__icon_add"></i>添加到
              </a>
              <a class="mod_btn">
                <i class="mod_btn__icon_down"></i>下载
              </a>
              <a class="mod_btn">
                <i class="mod_btn__icon_batch"></i>批量操作
              </a>
            </div>
            <MusicListComponent v-if="t==='song'" :playListData="!mData ? null : {
              songlist: mData.song.list
            }"></MusicListComponent>




          </div>
        </div>
      </div>

      <div id="page_box"><div class="client_guide"><p class="client_guide__txt">查看更多内容，请下载客户端</p><a class="client_guide__btn">立即下载</a></div></div>

    </div>


</template>

<script>
  import MusicListComponent from '../PlayListTemplate/SongListTemplate/MusicListComponent'
  export default {
    name: 'SearchComponent',
    components: {MusicListComponent},
    props: ["w", "t"],
    data(){
      return {
        isShow: false,
        val: this.w,
        mData: null,
        searchResp: null
      }
    },
    computed: {
      history(){
        return JSON.parse(localStorage.getItem('searchHistory')) || []
      },
      num(){
        switch (this.t) {
          case "song":
            return 10
        }
        return 0;
      }
    },
    methods: {
      to(type){
        this.$router.push({
          name: 'SearchComponent',
          params: {
            w: this.w,
            t: type
          }
        })
      },
      toPage(t, id){
        if (t === "song"){
          this.$router.push({
            name: 'musicPage',
            params: {
              mid: id
            }
          })
        }

      },
      enter(){
          this.$refs.input.blur()
          this.$router.push({
            name: 'SearchComponent',
            params: {
              w: this.val,
              t: 'song'
            }
          })
      },
      init(){
        document.getElementsByClassName('mod_subNav')[0].style.display = 'none'
        this.$axios.get("/api/search?t="+this.t+"&w="+this.w+"&num="+this.num).then((resp)=>{
          console.log(resp.data.req_1.data.body)
          this.mData = resp.data.req_1.data.body
        })
      }
    },
    mounted () {
      this.init()
    },
    watch:{
      w(){
        this.mData = null
        this.init()
      },
      t(){
        this.mData = null
        this.init()
      },
      val(){
        this.$axios.get("/api/search2?key=" + this.val).then((resp)=>{
          console.log(resp.data.data)
          this.searchResp = resp.data.data
        })
      }
    }
  }
</script>

<style scoped>

  .mod_btn {
    border: 1px solid #c9c9c9;
    color: #000;
  }
  .search_exclusive .mod_search {
    position: relative;
    height: 247px;
    background-position: 50%;
    background-size: cover;
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
  .search_exclusive .mod_search .mod_search_input {
    border: 0;
    padding: 0 70px 0 15px;
    line-height: 50px;
    left: 50%;
    top: 85px;
    margin-top: 0;
    margin-left: -322px;
    background: #fff;
  }
  .search_exclusive .mod_search .mod_search_input, .search_exclusive .mod_search .search_input__input {
    width: 554px;
    height: 50px;
  }
  .search_input__input {
    width: 174px;
    height: 36px;
    border: 0;
    font-size: 14px;
    background: transparent;
    transition: width .6s ease-out,visibility .6s ease-out 1ms;
  }
  .search_input__btn {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    width: 38px;
    height: 35px;
    overflow: visible;
    background: transparent;
  }
  .search_exclusive .mod_search .search_input__btn {
    width: 50px;
    height: 50px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .sprite, .sprite_before:before {
    background-image: url(	https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
    background-image: -webkit-image-set(url(	https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000) 1x,url(	https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000) 2x);
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
  .mod_search_other, .mod_search_result, .popup_user {
    max-height: 0;
    visibility: hidden;
    transition: max-height .6s ease-out,visibility 1ms .6s;
    overflow: hidden;
  }
  .search_exclusive .mod_search .mod_search_other, .search_exclusive .mod_search .mod_search_result {
    top: 134px;
    left: 50%;
    margin-left: -322px;
    background: #fff;
    width: 637px;
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
  .search_history__item {
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
    background-image: url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
  }
  .search_history__link {
    display: block;
    color: #333;
    padding-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .main, .section_inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  @media (max-width: 1240px) {
    body {
      min-width:1000px
    }

    .main,.section_inner {
      margin: 0 50px;
      min-width: 900px
    }
  }
  .main {
    z-index: 2;
  }
  .search_exclusive .mod_tab, .search_exclusive .mod_tab__item {
    height: 56px;
    line-height: 56px;
  }

  .search_exclusive .mod_tab {
    position: relative;
    zoom: 1;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 30px;
  }
  .search_exclusive .mod_tab__item {
    position: relative;
    float: left;
    font-size: 16px;
    overflow: hidden;
    margin-right: 55px;
  }

  .search_exclusive .mod_tab__current {
    color: #31c27c;
  }
  .mod_songlist_toolbar {
    position: relative;
    margin-bottom: 20px;
    font-size: 0;
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
  .mod_btn_green {
    border: 1px solid #31c27c;
    background-color: #31c27c;
    color: #fff;
  }
  .mod_btn_green__icon_play {
    width: 13px;
    height: 16px;
    background-position: -80px -220px;
    vertical-align: -3px;
  }
  .mod_btn__icon_add, .mod_btn__icon_batch, .mod_btn_green__icon_play {
    display: inline-block;
    margin-right: 6px;
    background-image: url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
    background-repeat: no-repeat;
    vertical-align: -3px;
  }
  .mod_btn_green__icon_play {
    width: 13px;
    height: 16px;
    background-position: -80px -220px;
    vertical-align: -3px;
  }
  .mod_btn__icon_add {
    width: 16px;
    height: 16px;
    background-position: -20px 0;
  }
  .mod_btn__icon_down {
    width: 16px;
    height: 16px;
    background-position: -40px -220px;
  }
  .mod_btn__icon_batch {
    width: 16px;
    height: 16px;
    background-position: -120px 0;
  }
  .drop {
    visibility: visible;
    max-height: 800px;
    transition: max-height .6s ease-out;
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
  .search_history__item:hover .search_history__link, .search_result__item--current .search_history__link {
    background-color: #31c27c;
    color: #fff;
  }

  .search_history__item:hover .search_history__link {
    padding-right: 35px;
  }
  .search_history__item:hover .search_history__delete, .search_result__item--current .search_history__delete {
    display: block;
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
  .search_result__sort {
    padding: 5px 0;
    border-top: 1px solid #f2f2f2;
    margin-top: -1px;
  }
  .search_exclusive .mod_search .search_result__sort {
    position: relative;
    padding: 0;
    border-top: 0;
  }
  .search_result__tit {
    position: relative;
    line-height: 40px;
    color: #999;
    font-weight: 400;
  }
  .search_exclusive .mod_search .search_result__tit {
    position: absolute;
    top: 5px;
    left: 0;
    width: 48px;
  }
  .search_result__link, .search_result__tit {
    padding: 0 11px 0 41px;
    line-height: 36px;
    color: #999;
  }
  .search_exclusive .mod_search .search_result__tit i {
    left: 18px;
  }
  .search_exclusive .mod_search .search_result__list {
    border-left: 1px solid #d4d4d4;
    border-top: 1px solid #f2f2f2;
    margin-left: 92px;
    padding: 5px 0;
  }
  .search_result__link {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .search_result__link, .search_result__tit {
    padding: 0 11px 0 41px;
    line-height: 36px;
    color: #999;
  }
  .search_result__link span {
    cursor: pointer;
  }

  .search_result__name {
    color: #333;
    cursor: pointer;
  }
  .search_result__item--current, .search_result__item--current span, .search_result__link:hover, .search_result__link:hover span {
    background-color: #31c27c;
    color: #fff;
  }
  .search_exclusive .mod_intro {
    overflow: hidden;
    margin: 20px 0 21px;
  }
  .search_exclusive .mod_intro__cover {
    float: left;
    margin-right: 20px;
  }
  .search_exclusive .mod_intro_singer__pic {
    border-radius: 94px;
  }

  .search_exclusive .mod_intro__pic {
    vertical-align: middle;
    width: 94px;
    height: 94px;
    border: 1px solid rgba(0,0,0,.15);
    border-color: #dedede\9;
  }
  .search_exclusive .mod_intro__base {
    line-height: 40px;
    font-size: 16px;
    overflow: hidden;
  }
  .search_exclusive .mod_intro__title {
    float: left;
    font-weight: 400;
    white-space: nowrap;
  }
  .search_exclusive .mod_intro_singer__singer {
    float: left;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 30px;
  }
  .c_tx_current, .c_tx_highlight {
    color: #31c27c;
  }
  .search_exclusive .mod_intro_singer__link {
    margin-right: 20px;
  }
  .search_exclusive .mod_intro_singer__link strong {
    font-weight: 400;
    margin-left: 4px;
  }
  .search_exclusive .mod_intro_album__singer, .search_exclusive .mod_intro_album__time {
    margin-left: 20px;
    font-size: 14px;
    color: #999;
  }

</style>

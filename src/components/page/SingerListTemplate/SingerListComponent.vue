<template>
    <!--        歌手-->
    <div>

        <div class="mod_singer_push ">

        <div class="section_inner" v-if="!is_Login">
            <h2 class="singer_push__tit">
                <i class="icon_txt">
                    万千歌手，尽在眼前
                </i>
            </h2>
            <div class="singer_push__desc">
                <i class="icon_txt">
                    登录查看你关注的歌手
                </i>
            </div>
            <button class="singer_push__btn">
                立即登录
                <span class="singer_push__btn_border"></span>
            </button>
        </div>

        <div class="section_inner" v-if="is_Login">
            <div class="singer_push_tab">
            <span class="singer_push_tab__item singer_push_tab__item--on">
                我关注的歌手
            </span>
            </div>
            <div class="mod_slide singer_push_slide" id="content">
                <ul class="singer_push_list slide__list" style="left: 0px;">
                    <li class="singer_push_list__item slide__item">
                    </li>
                    <li class="singer_push_list__item slide__item ">
                        <a title="林俊杰" class="singer_push_list__link" href="/n/ryqq/singer/001BLpXF2DyJe2">
                            <img src="//y.qq.com/music/photo_new/T001R500x500M000001BLpXF2DyJe2.jpg?max_age=2592000"
                                 alt="林俊杰" class="singer_push_list__pic">
                            <i class="singer_push_list__cover">
                            </i>
                        </a>
                    </li>
                    <li class="singer_push_list__item slide__item ">
                        <a title="周杰伦" class="singer_push_list__link" href="/n/ryqq/singer/0025NhlN2yWrP4">
                            <img src="//y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000"
                                 alt="周杰伦" class="singer_push_list__pic">
                            <i class="singer_push_list__cover">
                            </i>
                        </a>
                    </li>
                    <li class="singer_push_list__item slide__item singer_push_list__item--last">
                        <a title="张子枫" class="singer_push_list__link" href="/n/ryqq/profile/focus/singer">
                            <img src="//y.qq.com/music/photo_new/T001R500x500M000003h40nt2zvN6N.jpg?max_age=2592000"
                                 alt="张子枫" class="singer_push_list__pic">
                            <i class="singer_push_list__cover">
                            </i>
                            <div class="singer_push_list__more">
                                查看全部&gt;
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </div>

        <div class="main">
            <div class="mod_singer_tag">
                <div class="singer_tag__list">
                    <a  v-for="i in tags.index" :key="i.id" class="singer_tag__item" @click="setParam('index', i.id)"
                        :class="{'singer_tag__item--all':i.id === -100,  'singer_tag__item--select': param.index===i.id}">
                        {{i.name}}
                    </a>
                </div>
                <div class="singer_tag__list">
                    <a  v-for="i in tags.area" :key="i.id" class="singer_tag__item" @click="setParam('area', i.id)"
                        :class="{'singer_tag__item--all':i.id === -100,  'singer_tag__item--select': param.area===i.id}">
                        {{i.name}}
                    </a>
                </div>
                <div class="singer_tag__list">
                    <a  v-for="i in tags.sex" :key="i.id" class="singer_tag__item" @click="setParam('sex', i.id)"
                        :class="{'singer_tag__item--all':i.id === -100,  'singer_tag__item--select': param.sex===i.id}">
                        {{i.name}}
                    </a>
                </div>
                <div class="singer_tag__list">
                    <a  v-for="i in tags.genre" :key="i.id" class="singer_tag__item" @click="setParam('genre', i.id)"
                        :class="{'singer_tag__item--all':i.id === -100,  'singer_tag__item--select': param.genre===i.id}">
                        {{i.name}}
                    </a>
                </div>
            </div>

            <div class="mod_singer_list ">
                <ul class="singer_list__list">
                    <li class="singer_list__item" v-for="i in singerImg" :key="i.singer_id">
                        <div class="singer_list__item_box">
                            <a class="singer_list__cover" :title="i.singer_name" href="/n/ryqq/singer/0025NhlN2yWrP4">
                                <img class="singer_list__pic" :src="i.singer_pic"
                                     :alt="i.singer_name">
                            </a>
                            <h3 class="singer_list__title" style="min-height:20px">
                                <a href="/n/ryqq/singer/0025NhlN2yWrP4">
                                    {{i.singer_name}}
                                </a>
                            </h3>
                        </div>
                    </li>
                </ul>
            </div>

            <ul class="singer_list_txt">
                <li class="singer_list_txt__item" v-for="(i, index) in singerList" :key="i.singer_id" v-show="index > 10">
                    <a class="singer_list_txt__link js_singer" :title="i.singer_name" href="/n/ryqq/singer/000CK5xN3yZDJt">
                        {{i.singer_name}}
                    </a>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SingerListComponent',
  data () {
    return {
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: -100
      },
      sin: 80,
      cur_page: 1,
      singerList: [],
      singerImg: [],
      tags: {},
      is_Login: false, // 是否登录
      finished: true

    }
  },
  methods: {
    setParam (t, value) {
      switch (t) {
        case 'area':
          this.param.area = value
          break
        case 'sex':
          this.param.sex = value
          break
        case 'genre':
          this.param.genre = value
          break
        case 'index':
          this.param.index = value
          break
      }
    },
    getData (t) {
      axios.get('/api/getSingerTxt?area=' + this.param.area + '&sex=' + this.param.sex + '&genre=' + this.param.genre + '&index=' + this.param.index + '&sin=' + (this.sin * (this.cur_page - 1)) + '&cur_page=' + this.cur_page).then((resp) => {
        let data = resp.data.req_1.data
        switch (t) {
          case 'init':
            this.tags = data.tags
            this.singerList = data.singerlist
            break
          case 'put':
            this.singerList.push(...data.singerlist)
            break
          case 'overwrite':
            this.singerList = data.singerlist
            break
        }
        this.finished = true
      })
    },
    nextPage () {
      this.cur_page += 1
      this.getData('put')
    },
    aaa () {
      let top = Math.floor(document.documentElement.scrollTop || document.body.scrollTop)
      if (this.finished && top >= (document.documentElement.scrollHeight - 1300)) {
        this.finished = false
        this.nextPage()
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.aaa)

    if (this.is_Login) {
      //    如果登录
      //    pass
    }
    this.getData('init')
  },
  watch: {
    param: {
      deep: true,
      handler () {
        this.getData('overwrite')
      }
    },
    singerList () {
      this.singerImg = this.singerList.slice(0, 10)
    }
  }
}
</script>

<style scoped>
    .mod_singer_tag {
        background-color: #fbfbfd;
        padding: 34px 0 17px 40px;
        margin: 30px 0 20px;
    }
    .singer_tag__list {
        padding-bottom: 3px;
        height: auto;
        zoom: 1;
        clear: both;
        overflow: hidden;
    }
    .singer_tag__item--select, .singer_tag__item--select:hover {
        background-color: #31c27c;
        color: #fff;
    }

    .singer_tag__item--all {
        margin-right: 28px;
    }
    @supports (-webkit-appearance:none)
        .singer_tag__item {
            height: 26px;
            line-height: 27px;
            overflow: hidden;
        }
        .singer_tag__item {
            float: left;
            line-height: 26px;
            padding: 0 8px;
            margin: 0 12px 14px 0;
        }
        a {
            color: #000;
            background-color: #fff;
            font-size: 14px;
            line-height: 1.5;
            font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        }
    .singer_list_txt {
        margin-right: -20px;
        overflow: hidden;
        margin-bottom: 60px;
    }

    .singer_list_txt__item {
        float: left;
        width: 20%;
    }
    .singer_list_txt__link {
        float: left;
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 36px;
    }
    .main {
        z-index: 2;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .mod_singer_push {
        position: relative;
        width: 100%;
        height: 376px;
        background: url(https://y.qq.com/ryqq/static/media/bg_singer.0ba4a7af.jpg?max_age=2592000) 50% 0 repeat-x;
        overflow: hidden;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .singer_push__tit {
        width: 494px;
        height: 60px;
        margin-top: 103px;
        background-position: 0 0;
    }

    .singer_push__desc, .singer_push__tit {
        margin-left: auto;
        margin-right: auto;
        background-image: url(https://y.qq.com/ryqq/static/media/singer_tit.a4376222.png?max_age=2592000);
    }
    .icon_txt {
        font: 0/0 a;
    }
    .singer_push__desc {
        width: 260px;
        height: 26px;
        margin-top: 20px;
        background-position: 0 -70px;
    }
    .singer_push__btn {
        position: relative;
        display: block;
        margin: 20px auto 0;
        font-size: 18px;
        text-align: center;
        color: #fff;
        line-height: 48px;
        width: 174px;
        background-color: transparent;
        border: 0;
    }
    button, input[type=button], input[type=submit] {
        cursor: pointer;
    }
    .singer_push__btn_border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 2px;
        border: 1px solid #fff;
        opacity: .2;
        filter: alpha(opacity=20);
        transition-property: opacity;
        transition-duration: .3s;
    }
    .singer_push_tab {
        text-align: center;
        padding: 60px 0 44px;
        line-height: 22px;
    }
    .singer_push_tab__item--on {
        color: #fff;
    }

    .singer_push_tab__item {
        color: #898989;
        margin: 0 32px;
        font-size: 18px;
    }
    .singer_push_slide {
        width: 750px;
        margin-left: auto;
        margin-right: auto;
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
    .singer_push_list__item {
        height: 150px;
        width: 1.6%;
        float: left;
    }
    .singer_push_list__link {
        display: block;
        position: relative;
        background-color: #000;
    }
    .singer_push_list__pic {
        width: 100%;
        height: 150px;
        -webkit-filter: grayscale(1);
        opacity: .8;
        filter: alpha(opacity=70);
    }
    img {
        border: 0;
        -ms-interpolation-mode: bicubic;
        image-rendering: optimizeQuality;
    }
    .singer_push_list__more {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        filter: progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#7F000000",endColorstr="#7F000000");
        background: rgba(0,0,0,.5);
        line-height: 150px;
        color: #fff;
        font-size: 18px;
        text-align: center;
    }
        .mod_singer_list {
            overflow: hidden;
            text-align: center;
        }
        .singer_list__list {
            margin-bottom: 4px;
        }
        .singer_list__list {
            margin-right: -20px;
            overflow: hidden;
            zoom: 1;
            margin-bottom: -24px;
        }
        .singer_list__item {
            float: left;
            width: 20%;
            margin-bottom: 20px;
            overflow: hidden;
        }
        .singer_list__item_box {
            position: relative;
            margin-right: 20px;
            background-color: #fbfbfd;
            min-height: 195px;
            padding: 25px 0;
            overflow: hidden;
        }
        .singer_list__cover {
            margin-left: auto;
            margin-right: auto;
        }
        .singer_list__cover, .singer_list__pic {
            display: block;
            width: 140px;
            height: 140px;
            border-radius: 126px;
        }
        .singer_list__info, .singer_list__title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .singer_list__title {
            font-size: 16px;
            font-weight: 400;
            zoom: 1;
            *width: 100%;
            margin: 20px 30px 4px;
        }

</style>

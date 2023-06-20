<template>
    <div class="main">
        <div class="mod_radio_sidebar" style="position: absolute; top: 35px;"   >
            <a class="radio_sidebar__item radio_sidebar__item--current" v-for="i in radioInfo" :key="i.id">{{i.title}}</a>
        </div>
        <div class="mod_radio">
            <div class="radio__item" v-for="i in radioInfo" :key="i.id">
                <h2 class="radio__tit">{{i.title}}</h2>
                <div class="mod_radio_list">
                    <ul class="radio_list__list">
                        <li class="radio_list__item" v-for="j in i.list" :key="j.id">
                            <div class="radio_list__item_box">
                                <div class="radio_list__cover mod_cover">
                                    <a class="js_radio">
                                        <img :alt="j.title" :src="j.pic_url" class="radio_list__pic">
                                        <i class="mod_cover__mask"></i>
                                        <i class="mod_cover__icon_play"></i>
                                    </a>
                                </div>
                            </div>
                            <h4 class="radio_list__title">
                <span class="radio_list__title_txt">
                  <a class="js_radio" :title="j.title">{{j.title}}</a>
                </span>
                            </h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RadioComponent',
  data () {
    return {
      radioInfo: []
    }
  },
  mounted () {
    axios.get('/api/getRadioInfo').then((resp) => {
      this.radioInfo = resp.data.radio.data.radio_list
    })
  }
}
</script>

<style scoped>
    .main {
        padding: 35px 0 0;
    }

    .main {
        z-index: 2;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    a {
        font-size: 14px;
    }
    .mod_radio_list {
        overflow: hidden
    }

    .mod_radio_list .radio_list__list {
        margin-right: -20px
    }

    .mod_radio_list .radio_list__header {
        display: none
    }

    .mod_radio_list .radio_list__item {
        float: left;
        width: 20%;
        padding-bottom: 44px;
        overflow: hidden
    }

    .mod_radio_list .radio_list__item_box {
        position: relative;
        margin-right: 20px
    }

    .mod_radio_list .radio_list__cover {
        position: relative;
        display: block;
        overflow: hidden;
        padding-top: 100%;
        margin-bottom: 15px
    }

    .mod_radio_list .radio_list__pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        -webkit-transform: scale(1) translateZ(0);
        -webkit-transition: -webkit-transform .75s;
        transform: scale(1) translateZ(0);
        transition: transform .75s
    }

    .mod_radio_list .radio_list__cover:hover .radio_list__pic {
        -webkit-transform: scale(1.07) translateZ(0);
        -webkit-transition: -webkit-transform .75s cubic-bezier(0,1,.75,1);
        transform: scale(1.07) translateZ(0);
        transition: transform .75s cubic-bezier(0,1,.75,1)
    }

    .mod_radio_list .radio_list__title {
        overflow: hidden
    }

    .mod_radio_list .radio_list__title_txt {
        float: left;
        max-width: 100%;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px
    }

    .mod_radio_list .radio_list__other {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px
    }

    .mod_cover {
        zoom:1}

    .mod_cover__icon_play {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -35px;
        width: 70px;
        height: 70px;
        filter: alpha(opacity=0);
        opacity: 0;
        -webkit-transform: scale(.7) translateZ(0);
        -webkit-transition-property: opacity,-webkit-transform;
        -webkit-transition-duration: .5s;
        transform: scale(.7) translateZ(0);
        transition-property: opacity,transform;
        transition-duration: .5s;
        zoom:1}

    @supports (-webkit-appearance: none) {
        .mod_cover.play:after {
            content:"";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -50px -70px;
            width: 35px;
            height: 40px;
            background: url(https://y.qq.com/mediastyle/yqq/img/play_ani.png?max_age=2592000);
            -webkit-animation: play .7s ease-in-out forwards;
            animation: play .7s ease-in-out forwards
        }

    @-webkit-keyframes play {
        0 {
            opacity: 1;
            -webkit-transform: translateY(0)
        }

        to {
            opacity: 0;
            -webkit-transform: translateY(-40px)
        }
    }

    @keyframes play {
    0 {
        opacity: 1;
        transform: translateY(0)
    }

    to {
        opacity: 0;
        transform: translateY(-20px)
    }
    }
    }

    .mod_cover__mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;
        filter: alpha(opacity=0);
        transition: opacity .5s
    }

    .mod_cover:hover .mod_cover__icon_play {
        background: 0 0\9;
        filter: progid:dximagetransform.microsoft.alphaimageloader(src="http://y.qq.com/mediastyle/yqq/img/cover_play.png?max_age=2592000",sizingmethod="crop") alpha(opacity=90);
        opacity: .9;
        -webkit-transform: scale(1) translateZ(0);
        -webkit-transition-property: opacity,-webkit-transform;
        -webkit-transition-duration: .5s;
        transform: scale(1) translateZ(0);
        transition-property: opacity,transform;
        transition-duration: .5s;
        cursor: pointer
    }

    .mod_cover:hover .mod_cover__icon_play,.mod_cover__icon_play {
        background-image: url(https://y.qq.com/mediastyle/yqq/img/cover_play.png?max_age=2592000);
        background-image: -webkit-image-set(url(https://y.qq.com/mediastyle/yqq/img/cover_play.png?max_age=2592000) 1x,url(https://y.qq.com/mediastyle/yqq/img/cover_play@2x.png?max_age=2592000) 2x)
    }

    .mod_cover:hover .mod_cover__icon_play {
        opacity: 1;
        filter: none
    }

    .mod_cover:hover .mod_cover__mask {
        opacity: .2;
        filter: alpha(opacity=20);
        transition: opacity .5s
    }

    body {
        background: url(https://y.qq.com/mediastyle/yqq/img/bg_detail.jpg?max_age=2592000) 50% 90px repeat-x
    }

    .main {
        padding: 35px 0 0
    }

    .mod_radio_sidebar {
        position: absolute;
        background: url(https://y.qq.com/mediastyle/yqq/img/radio_sidebar.png?max_age=2592000) 0 0 no-repeat
    }

    .radio_sidebar__item {
        position: relative;
        display: block;
        padding-left: 63px;
        line-height: 59px;
        font-size: 15px
    }

    .radio_sidebar__item--current {
        color: #31c27c
    }

    .radio_sidebar__item--current:after {
        content: "";
        position: absolute;
        height: 1px;
        width: 37px;
        overflow: hidden;
        left: 0;
        top: 50%;
        background-color: #31c27c
    }

    .mod_radio {
        margin-left: 245px;
        margin-top: 20px
    }

    .radio__tit {
        position: relative;
        font-weight: 400;
        height: 20px;
        line-height: 20px;
        color: #999;
        margin-bottom: 38px;
        font-size: 15px
    }

    .radio__tit:after {
        content: "";
        position: absolute;
        height: 1px;
        overflow: hidden;
        left: 43px;
        right: 0;
        top: 10px;
        background-color: #ececec
    }

    .mod_radio_list .radio_list__item {
        width: 25%
    }

</style>

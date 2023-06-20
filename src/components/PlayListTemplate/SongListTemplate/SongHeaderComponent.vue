<template>
    <div class="mod_data" v-if="playListData">
        <span class="data__cover" id="logo">
            <img class="data__photo" :src="type ? 'https://y.qq.com/music/photo_new/T002R300x300M000'+(playListData.track_info ? playListData.track_info.album.mid : '')+'.jpg?max_age=2592000':playListData.dirinfo.picurl">
        </span>
        <div class="data__cont">
            <div class="data__name" >
                <h1 class="data__name_txt">{{type? (playListData.track_info?playListData.track_info.title : ''):playListData.dirinfo.title}}</h1>
                <img class="data__name_icon_vip" v-if="type && playListData.track_info.pay.pay_play" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAUCAMAAAA9ZgQ5AAAAclBMVEUww30xxH4yw30ww3z////S8uJez5k/x4X6/vw2xIA5xYH3/PqP3rhaz5bx+/bk9+7c9OnY8+a16dBWzZPs+vPe9eq/7Nam5caC2q9n0p9GyYrJ793E7dmt58uI3LOE27GD2rB72Kt316ht1KJUzZJQy5Ar9ZQbAAAAAnRSTlPjSQzAlCMAAACpSURBVCjPtdKHCoMwFIXh9Hiqce/Zvd7/FRsDWiOFCKU/JBD4IHC5YiccW8oI2BPC2aCc35Q/tlKXyoXunJTY00XAsbozVMS9fg4hY608UkpJXpcqqHiH6sQGk1K/RkyXCh1TH3hK+VoodUtDIWMEHNliVmUZF8xN9WDi9erMSid7U+HANmeEj8qyvIixUjHJNJhUwPD7VAvyBqsa6gZ2te5fatsWbtvoN6DfC3e9yY0HAAAAAElFTkSuQmCC">
            </div>
            <div class="data__singer">
                <i class="icon_singer sprite"></i>
                <a class="data__singer_txt" :title="type? playListData.track_info.singer[0].name : playListData.dirinfo.host_nick" href="/n/ryqq/singer/001xvjTU1ICL8Z">{{type? playListData.track_info.singer[0].name : playListData.dirinfo.host_nick}}</a>
            </div>
            <ul class="data__info" v-if="!type">
                <li class="data_info__item">
                    <div class="data_tag_box">标签：
                        <span>
                            <a class="data_info__tags" href="/n/ryqq/category?t1=52&amp;t2=5" v-for="i in playListData.dirinfo.tag" :key="i.id">{{i.name}}</a>
                        </span>
                    </div>
                </li>
                <li class="data_info__item">播放量：{{(playListData.dirinfo.listennum / 10000).toFixed(1)}}万</li>
                <li class="data_info__item">收藏量：{{(playListData.dirinfo.ordernum / 10000).toFixed(1)}}万</li>
            </ul>
            <ul class="data__info" v-if="type">
                <li class="data_info__item_song">专辑：<a>{{playListData.track_info.album.name}}</a></li>
                <li class="data_info__item_song" v-if="playListData.info.lan">语种： {{playListData.info.lan.content[0].value}} </li>
                <li class="data_info__item_song" v-if="playListData.info.genre">流派：{{playListData.info.genre.content[0].value}} </li>
                <li class="data_info__item_song" v-if="playListData.info.company">唱片公司： {{playListData.info.company.content[0].value}}</li>
                <li class="data_info__item_song" v-if="playListData.info.pub_time">发行时间：{{playListData.info.pub_time.content[0].value}} </li>
            </ul>
            <div class="data__actions" role="toolbar">
                <a class="mod_btn_green" @click="addPlayMusic(playListData.track_info.mid)">
                    <i class="mod_btn_green__icon_play"></i>
                    <span class="btn__txt">{{type? "播放":"播放全部"}}</span>
                </a>
                <a class="mod_btn" v-if="type">
                    <i class=""></i>
                    <span class="btn__txt">智能曲谱</span>
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_like "></i>
                    <span class="btn__txt">收藏</span>
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_comment"></i>
                    <span class="btn__txt">评论({{num}})</span>
                </a>
                <a class="mod_btn">
                    <i class="mod_btn__icon_menu"></i>
                    <span class="btn__txt">更多</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'SongHeaderComponent',
  props: ['playListData', 'type', 'num'],
  methods:{
    ...mapActions('SongListOptions', {addPlayMusic: 'handleMusicMid'})
  }
}
</script>

<style scoped>
    .mod_data {
        position: relative;
        height: 250px;
        padding-left: 305px;
        margin-top: 40px;
        margin-bottom: 35px;
    }
    .data__cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 250px;
        height: 250px;
    }
    .data__cont {
        padding-top: 13px;
    }
    .data__photo {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
    }
    .data__name, .data__name_txt {
        overflow: hidden;
        line-height: 50px;
    }
    .data__name_txt {
        float: left;
        font-size: 31px;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 70%;
        margin-right: 10px;
        overflow: hidden;
        line-height: 50px;
    }
    .data__name {
        height: 50px;
    }

    .data__singer {
        height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90%;
    }
    .data__info {
        width: 520px;
        padding-top: 8px;
    }
    .data__actions {
        position: absolute;
        bottom: 23px;
        font-size: 0;
    }

    .icon_singer {
         float: left;
         width: 16px;
         height: 16px;
         background-position: -20px -240px;
         margin: 5px 7px 0 0;
     }
    .mod_btn__icon_comment {
          width: 16px;
          height: 16px;
          background-position: -140px -120px;
          vertical-align: -3px;
      }
    .mod_btn__icon_menu {
        width: 16px;
        height: 16px;
        background-position: -20px -80px;
    }
    .data_info__tags {
        margin-right: 12px;
    }
    .sprite, .sprite_before:before, .mod_btn__icon_like {
        background-image: url("https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000");
    }
    .mod_btn_green__icon_play {
        width: 13px;
        height: 16px;
        background-position: -80px -220px;
        vertical-align: -3px;
    }
    .mod_btn__icon_like {
        background-position: -60px 0;
    }
    .mod_btn__icon_like {
        width: 16px;
        height: 16px;
        vertical-align: -4px;
    }
    .data__singer_txt {
        font-size: 16px;
        color: #333;
    }
    .data_info__item_song:nth-child(odd) {
        width: 250px;
    }
    .data_info__item_song {
        float: left;
        width: 166px;
        margin-right: 10px;
    }
    .data_info__item, .data_info__item_song {
        line-height: 27px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
    }
    .data__actions .mod_btn, .data__actions .mod_btn_green {
        min-width: 122px;
        text-align: center;
        padding: 0 18px;
        font-family: \5fae\8f6f\96c5\9ed1;
    }

    .mod_btn_green {
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
    }
    .mod_btn_green {
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
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
    .mod_btn {
        border: 1px solid #c9c9c9;
        color: #000;
    }

</style>

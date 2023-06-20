<template>
    <div class="main" id="album_list">
        <div class="mod_tag" id="tag_list">
            <div class="tag__list">
                <a class="tag__item" :class="area === i.id ? 'tag__item--current': ''" v-for="i in areas" :key="i.id" @click="setArea(i.id)">
                    {{i.name}}
                </a>
            </div>
        </div>
        <div class="mod_part_detail">
            <div class="mod_playlist mod_playlist--all">
                <ul class="playlist__list mod_playlist">
                    <li class="playlist__item" v-for="i in albums" :key="i.id">
                        <div class="playlist__item_box">
                            <div class="playlist__cover mod_cover">
                                <a class="js_album" href="/n/ryqq/albumDetail/002ECjsQ4KQ0qW">
                                    <img class="playlist__pic" loading="lazy" :src="'https://y.qq.com/music/photo_new/T002R300x300M000'+i.mid+'.jpg?max_age=2592000'"
                                         :alt="i.name">
                                    <i class="mod_cover__icon_play js_play">
                                    </i>
                                </a>
                            </div>
                            <h4 class="playlist__title">
                            <span class="playlist__title_txt">
                              <a :title="i.name" class="js_album" href="/n/ryqq/albumDetail/002ECjsQ4KQ0qW">
                                {{i.name}}
                              </a>
                            </span>
                            </h4>
                            <div class="playlist__author">
                                <a class=" " title="PeaceHotel和平饭店" href="/n/ryqq/singer/002LKX2237uyNE" v-for="(j,index) in i.singers" :key="j.id">
                                    {{(index !== 0 ? '/': '') + j.name}}
                                </a>
                            </div>
                            <div class="playlist__other">
                                {{i.release_time}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'AlbumComponent',
  data () {
    return {
      areas: [],
      albums: [],
      area: 1,
      num: 20,
      finished: true
    }
  },
  methods: {
    setArea (areaId) {
      this.area = areaId
    },
    getArea () {
      axios.get('/api/getAlbums?t=area').then((resp) => {
        this.areas = resp.data.area.data.area
      })
    },
    getData (t) {
      axios.get('/api/getAlbums?area=' + this.area + '&num=' + this.num + '&start=' + this.albums.length).then((resp) => {
        console.log(resp.data)
        if (t) {
          this.albums = resp.data.info.data.albums
        } else {
          this.albums.push(...resp.data.info.data.albums)
        }
        this.finished = true
      })
    },
    aaa () {
      let top = Math.floor(document.documentElement.scrollTop || document.body.scrollTop)
      if (this.finished && top >= (document.documentElement.scrollHeight - 1300)) {
        this.finished = false
        this.getData(false)
      }
    }
  },
  mounted () {
    this.getArea()
    this.getData(true)
    window.addEventListener('scroll', this.aaa)
  },
  watch: {
    area () {
      this.getData(true)
    }
  }
}
</script>

<style scoped>
    .main {
        z-index: 2;
    }

    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .mod_tag {
        position: relative;
        margin: 52px 0 0;
    }
    .mod_part, .mod_part_detail {
        position: relative;
        margin-bottom: 30px;
    }
    .tag__list {
        position: relative;
        height: auto;
        zoom: 1;
        clear: both;
        overflow: hidden;
        line-height: 26px;
        padding-left: 65px;
    }
    .tag__item--current {
        background-color: #31c27c;
        color: #fff;
    }
    .tag__item {
        float: left;
        padding: 0 8px;
        margin: 0 24px 15px 0;
    }
    .mod_playlist {
        margin-right: -20px;
    }

    .mod_playlist {
        overflow: hidden;
        font-size: 0;
    }
    .mod_playlist .playlist__list {
        margin-right: -20px;
    }
    .mod_playlist .playlist__item {
        display: inline-block;
        width: 20%;
        padding-bottom: 44px;
        overflow: hidden;
        font-size: 14px;
        vertical-align: top;
    }
    .mod_playlist .playlist__item_box {
        position: relative;
        margin-right: 20px;
    }

    .mod_playlist .playlist__cover {
        position: relative;
        display: block;
        overflow: hidden;
        padding-top: 100%;
        margin-bottom: 15px;
    }

    .mod_cover {
        zoom: 1;
    }
    .mod_playlist .playlist__title {
        overflow: hidden;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
    }
    .mod_playlist .playlist__author, .mod_playlist .playlist__author a, .mod_playlist .playlist__other {
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 22px;
        font-size: 14px;
    }

    .mod_playlist .playlist__title_txt {
        white-space: normal;
    }
    .mod_playlist .playlist__title_txt {
        float: left;
        max-width: 100%;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 22px;
        max-height: 44px;
    }
    .mod_playlist .playlist__title a {
        font-size: 14px;
    }
    @supports ((-o-object-fit:cover) or (object-fit:cover))
        .mod_playlist .playlist__pic {
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
        }
        @supports (transform:scale(1))
            .mod_playlist .playlist__pic {
                transform: scale(1) translateZ(0);
                transition: transform .75s;
            }
            .mod_playlist .playlist__pic {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                -webkit-transform: scale(1) translateZ(0);
                -webkit-transition: -webkit-transform .75s;
            }

</style>

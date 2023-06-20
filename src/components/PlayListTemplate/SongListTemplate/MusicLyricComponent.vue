<template>
    <div class="mod_lyric" v-if="lyricData">
        <div class="lyric__hd">
            <h2 class="lyric__tit">歌词</h2>
            <a class="btn_copy sprite" title="复制歌词">
                <i class="icon_txt">复制</i>
            </a>
        </div>
        <div class="lyric__cont limit">
            <div class="lyric__cont_box" id="lrc_content">
                <p v-for="(i, index) in lyricArr" :key="index" v-show="isShow || index < 20">
                    <span>
                        {{i}}
                    </span>
                </p>
            </div>
            <a class="c_tx_highlight" @click="isHide">
                [ 展开 ]
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MusicLyricComponent',
  props: ['lyricData'],
  mounted () {
    // console.log(this.lyricData)
    let lyric = decodeURIComponent(escape(window.atob(this.lyricData.lyric)))
    for (let i of lyric.split('\n')) {
      let j = i.split(']')
      if (j.length === 2) { this.lyricArr.push(j[1]) }
    }
  },
  data () {
    return {
      lyricArr: [],
      isShow: false
    }
  },
  methods: {
    isHide () {
      this.isShow = !this.isShow
    }
  },
  watch: {
  }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .c_tx_current, .c_tx_highlight {
        color: #31c27c;
    }
    .lyric__hd {
        overflow: hidden;
        line-height: 46px;
    }
    .lyric__tit {
        float: left;
        font-size: 20px;
        font-weight: 400;
        margin-right: 10px;
    }
    span {
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    }
    .lyric__cont, span {
        font-size: 14px;
        color: #000;
        line-height: 26px;
        margin-bottom: 40px
    }
    p {
        font-size: 14px;
        color: #000;
        line-height: 26px;
    }
    .btn_copy {
        float: left;
        width: 16px;
        height: 16px;
        background-position: -100px -40px;
        margin-top: 13px;
        overflow: hidden;
    }
    .sprite, .sprite_before:before {
        background-image: url(https://y.qq.com/ryqq/static/media/icon_sprite.630b3e60.png?max_age=2592000);
        }

</style>

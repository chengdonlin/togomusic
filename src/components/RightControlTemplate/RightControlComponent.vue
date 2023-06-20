<template>
    <div>
        <a class="btn_bottom_top sprite_before" v-show="isShow" @click="RollbackTop">
            <span class="icon_txt">返回顶部</span>
        </a>
        <a class="btn_bottom_report">举报</a>
        <a class="btn_bottom_feedback js_btn_feedback">反馈</a>
        <a class="btn_bottom_player sprite_before" @click="openPage" >
            <span class="icon_txt">播放器</span>
        </a>
    </div>
</template>

<script>
  import  pubSub from 'pubsub-js'
  import {mapState, mapMutations} from 'vuex'
export default {
  name: 'RightControlComponent',
  props: ['isShow'],
  computed:{
    ...mapState('MusicVideoOptions', ['page'])
  },
  methods: {
    RollbackTop () {
      let top = document.documentElement.scrollTop
      const say = setInterval(function () {
        if (top <= 0) {
          clearInterval(say)
        }
        top -= 20
        document.documentElement.scrollTop = top
      }, 1)
    },
    openPage(){
      // this.open()
      if (this.page && !this.page.closed){
        this.page.location.reload()
        this.page.focus()
      }else {
        let page = window.open('/player.html')
        this.set(page)
      }
    },

    ...mapMutations('MusicVideoOptions',{set: 'SetPage'})
  },
  mounted () {
    pubSub.subscribe('openPlayer', this.openPage)
  }
}
</script>

<style scoped>
    .btn_bottom_top {
        bottom: 166px;
    }
    .btn_bottom_feedback, .btn_bottom_player, .btn_bottom_report, .btn_bottom_top {
        position: fixed;
        right: 40px;
        width: 38px;
        height: 38px;
        z-index: 4;
        background-color: #fff;
        border: 1px solid #c9c9c9;
    }
    .btn_bottom_top:before {
        content: "";
        display: block;
        width: 18px;
        height: 10px;
        margin: 14px 10px;
        background-position: -160px 0;
    }

    .sprite, .sprite_before:before {
        background-image: url("../../assets/img/footer_img/icon_sprite.png");
    }
    .btn_bottom_feedback, .btn_bottom_report {
        line-height: 38px;
        font-size: 14px;
        font-family: PingFang SC,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        text-align: center;
    }

    .btn_bottom_report {
        bottom: 124px;
    }
    .btn_bottom_feedback, .btn_bottom_player, .btn_bottom_report, .btn_bottom_top {
        position: fixed;
        right: 40px;
        width: 38px;
        height: 38px;
        z-index: 4;
        background-color: #fff;
        border: 1px solid #c9c9c9;
    }
    .btn_bottom_feedback {
        bottom: 82px;
    }

    .btn_bottom_feedback, .btn_bottom_report {
        line-height: 38px;
        font-size: 14px;
        font-family: PingFang SC,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        text-align: center;
    }
    .btn_bottom_feedback, .btn_bottom_player, .btn_bottom_report, .btn_bottom_top {
        position: fixed;
        right: 40px;
        width: 38px;
        height: 38px;
        z-index: 4;
        background-color: #fff;
        border: 1px solid #c9c9c9;
    }
    .btn_bottom_player {
        bottom: 40px;
    }

    .btn_bottom_feedback, .btn_bottom_player, .btn_bottom_report, .btn_bottom_top {
        position: fixed;
        right: 40px;
        width: 38px;
        height: 38px;
        z-index: 4;
        background-color: #fff;
        border: 1px solid #c9c9c9;
    }
    .btn_bottom_player:before {
        content: "";
        display: block;
        width: 20px;
        height: 17px;
        margin: 10px 9px 0;
        background-position: -180px 0;
    }

    .sprite, .sprite_before:before {
        background-image: url("../../assets/img/footer_img/icon_sprite.png");
    }
</style>

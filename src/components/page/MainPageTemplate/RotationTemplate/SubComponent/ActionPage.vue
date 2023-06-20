<template>
    <div class="mod_slide_action">
        <div class="slide_action slide_action--left">
            <a class="slide_action__btn slide_action__btn--left" ref="left" @click="LeftScroll({mark,'number': -1,'pageNumber':parseInt(pageNumber)})">
                <i class="icon_txt">上一页</i>
                <i class="slide_action__arrow slide_action__arrow--left sprite"></i>
            </a>
        </div>
        <div class="slide_action slide_action--right">
            <a class="slide_action__btn slide_action__btn--right" ref="righst" @click="RightScroll({mark,'number': 1,'pageNumber':parseInt(pageNumber)})">
                <i class="icon_txt">下一页</i>
                <i class="slide_action__arrow slide_action__arrow--right sprite"></i>
            </a>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'ActionPage',
  data () {
    return {
      isShow: true,
      styleObj: {
        opacity: 1,
        transform: 'translateX(0)'
      }
    }
  },
  props: ['mark', 'pageNumber'],
  methods: {
    ...mapActions('MainPageOptions', {RightScroll: 'carryOutScroll', LeftScroll: 'carryOutScroll'})

  }
}
</script>

<style scoped>
    .mod_slide_action, .slide_action {
        position: absolute;
        top: 0;
        height: 100%;
    }
    .mod_slide_action {
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .slide_action--left, .slide_action__btn--left {
        left: 0;
    }
    .slide_action {
        width: 50%;
    }
    .slide_action__btn--left {
        transform: translateX(-100%);
    }
    .slide_action__btn {
        position: absolute;
        top: 50%;
        margin-top: -54px;
        width: 79px;
        height: 108px;
        background: url(#);
        background: rgba(0,0,0,.05);
        opacity: 0;
        /*visibility: none;*/
        transition-property: opacity,transform;
        transition-duration: .5s;
        z-index: 4;
    }
    .slide_action__arrow--left {
        left: 29px;
        background-position: -20px -120px;
    }

    .slide_action__arrow {
        position: absolute;
        top: 50%;
        margin-top: -20px;
        width: 20px;
        height: 39px;
    }
    .sprite, .sprite_before:before {
        background-image: url("../../../../../assets/img/index_img/icon_sprite.png");
    }
    .slide_action--right, .slide_action__btn--right {
        right: 0;
    }
    .slide_action__btn--right {
        transform: translateX(100%);
    }
    .slide_action__arrow--right {
        right: 29px;
        background-position: 0 -120px;
    }
</style>

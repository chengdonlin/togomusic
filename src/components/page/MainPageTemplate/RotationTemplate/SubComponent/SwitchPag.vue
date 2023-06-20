<template>
    <div class="mod_slide_switch">
        <a class="slide_switch__item" :class="AllScrollData[className] == index?'slide_switch__item--current': ''"
           v-for="(item,index) in parseInt(!page ? 0: page)" :key="index" @click="btnMove({className,index})">
            <i class="slide_switch__bg"></i>
            <i class="icon_txt">1</i>
        </a>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'SwitchPag',
  props: ['page', 'className'],
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  methods: {
    ...mapActions('MainPageOptions', {btnMove: 'ScrollBtn'})
  }
}
</script>

<style scoped>
    .mod_slide_switch {
        width: 100%;
        text-align: center;
        font-size: 0;
    }
    .slide_switch__item {
        display: inline-block;
        width: 28px;
        height: 12px;
        padding: 0 0 26px;
        margin: 0 1px;
        background: transparent;
    }
    .slide_switch__item--current .slide_switch__bg, .slide_switch__item:hover .slide_switch__bg {
        background-color: rgba(0,0,0,.3);
    }

    .slide_switch__bg {
        display: block;
        width: 8px;
        height: 8px;
        background-color: rgba(0,0,0,.1);
        border-radius: 12px;
        margin: 0 auto;
    }
    .icon_txt {
        font: 0/0 a;
    }
</style>

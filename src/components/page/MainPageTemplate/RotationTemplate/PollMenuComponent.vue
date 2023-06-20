<template>
    <div class="mod_index mod_slide_box" id="content" :class="'mod_index--'+className" @mouseenter="shiftIn" @mouseleave="shiftOut">
        <div class="section_inner">
            <div class="index__hd">
                <h2 class="index__tit">
                    <i class="icon_txt">热门歌单</i>
                </h2>
            </div>
<!--            插槽-->
            <slot name="btn"></slot>
<!--            列表 TabList-->
            <TabList :titleList="!data ? null: data.data.titleList" v-if="className!='event' && className != 'top'" :className="className"></TabList>
<!--            数据列表 PlayList-->
            <slot name="dataList"></slot>
<!--            页码 SwitchPag-->
            <SwitchPag :page="!data ? null: data.data.pageNum" v-if="className != 'top'" :className="className"></SwitchPag>
        </div>
<!--        左右翻页 ActionPage-->
        <ActionPage v-if="className != 'top'" :mark="className" :pageNumber="!data ? null: data.data.pageNum"></ActionPage>
    </div>
</template>

<script>
import TabList from './SubComponent/TabList'
import SwitchPag from './SubComponent/SwitchPag'
import ActionPage from './SubComponent/ActionPage'
export default {
  name: 'PollMenuComponent',
  data () {
    return {
    }
  },
  props: ['data', 'className'],
  components: {

    ActionPage,
    TabList,
    SwitchPag
  },
  methods: {
    shiftIn () {
      // this.$bus.$emit("RotationActionIn", event.target)
      // console.log("悬浮")
    },
    shiftOut () {
      // this.$bus.$emit("RotationActionOut", event.target)
      // console.log("离开")
    }
  }
}
</script>

<style scoped>
    .mod_index {
        position: relative;
        background: url("../../../../assets/img/index_img/bg_detail.png") 50% 0 repeat-x;
    }
    .mod_index .section_inner {
        z-index: 2;
        overflow: hidden;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .index__hd {
        position: relative;
        padding-top: 4.16667%;
        padding-bottom: 2%;
    }
    .mod_index--hot .index__tit {
        background-position: 0 0;
    }
    .index__tit {
        display: block;
        margin: 0 auto;
        width: 196px;
        height: 40px;
        background-image: url("../../../../assets/img/index_img/index_tit.png");
    }
    .main:after, .section_inner:after {
        content: "";
        display: block;
        clear: both;
    }
    .mod_index:hover >>> .slide_action__btn{
        opacity: 1!important;
        transform: translateX(0)!important;

    }
    .mod_index--song .index__tit {
        background-position: 0 -50px;
    }
    .mod_index--event .index__tit {
        background-position: 0 -100px;
    }
    .mod_index--top .section_inner {
        padding-bottom: 4%;
    }
    .mod_index--top .index__more {
        top: 56px;
    }
    .mod_index--event .index__tit {
        background-position: 0 -100px;
    }
    .mod_index--album .index__tit {
        background-position: 0 -150px;
    }
    .mod_index--top .index__tit {
        background-position: 0 -200px;
    }
    .mod_index--mv .index__tit {
        background-position: 0 -250px;
    }
</style>

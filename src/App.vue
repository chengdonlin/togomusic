<template>
  <div id="app">
    <GeneralNavTemplate></GeneralNavTemplate>
    <VueWrap></VueWrap>
    <FooterComponent></FooterComponent>
    <RightControlComponent :isShow="isShow"></RightControlComponent>
  </div>
</template>

<script>
import GeneralNavTemplate from './components/TopNavigation/GeneralNavTemplate'
import VueWrap from './components/Wrap'
import FooterComponent from './components/BottomLinkTemplate/Index/FooterComponent'
import RightControlComponent from './components/RightControlTemplate/RightControlComponent'
export default {
  name: 'App',
  components: {RightControlComponent, FooterComponent, VueWrap, GeneralNavTemplate},
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    handleScroll () {
      let top = Math.floor(document.documentElement.scrollTop || document.body.scrollTop)
      if (top >= 200) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeCreate () {
      this.$store.dispatch('MainPageOptions/getInitialData')
  }
}
</script>

<style>
  @import "../static/css/CommonStyles.css";
  ::-webkit-scrollbar {

  }
</style>

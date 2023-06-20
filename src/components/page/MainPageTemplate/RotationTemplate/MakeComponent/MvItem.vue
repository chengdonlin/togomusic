<template>
    <li class="mv_list__item mv_list_slide__item">
        <div class="mv_list__item_box">
            <a class="mv_list__cover mod_cover" title="长相诺(《春闺梦里人》电视剧宁钰轩相思主题曲)">
                <img class="mv_list__pic" loading="lazy" :src="data.picurl" alt="长相诺(《春闺梦里人》电视剧宁钰轩相思主题曲)" data-qar-def="//y.qq.com/mediastyle/global/img/mv_300.png?max_age=2592000">
                <i class="mod_cover__mask"></i>
                <i class="mod_cover__icon_play"></i>
            </a>
            <h3 class="mv_list__title">
                <a>{{data.title}}</a>
            </h3>
            <p class="mv_list__singer">
                <a class="playlist__author" title="摩登兄弟刘宇宁" href="/n/ryqq/singer/001Iu4Dv1NzRCD">{{data.singers[0].name}}</a>
            </p>
            <div class="mv_list__info">
        <span class="mv_list__listen">
          <i class="mv_list__listen_icon sprite"></i>{{fullPlayCnt}}万
        </span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
  name: 'MvItem',
  props: ['data'],
  computed: {
    fullPlayCnt () {
      return (this.data.playcnt / 10000).toFixed(1)
    }
  }
}
</script>

<style scoped>
    .mv_list_slide__item {
        width: 20%;
        padding-bottom: 25px;
        overflow: hidden;
        float: left;
    }
    .mv_list__item_box {
        position: relative;
        margin-right: 20px;
    }
    .mv_list__cover {
        position: relative;
        display: block;
        overflow: hidden;
        padding-top: 56.5476%;
        margin-bottom: 15px;
    }
    .mod_cover {
        zoom: 1;
    }
    .mv_list__pic {
        transition: .7s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
    .mv_list__desc, .mv_list__singer, .mv_list__title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mv_list__title {
        font-weight: 400;
        zoom: 1;
    }
    .mv_list__desc, .mv_list__info, .mv_list__singer, .mv_list__singer a {
        color: #999;
    }
    .mv_list__listen {
        margin-right: 10px;
    }
    .mv_list__listen_icon {
        display: inline-block;
        width: 19px;
        height: 12px;
        background-position: -180px -20px;
        margin-right: 5px;
        vertical-align: -1px;
    }
    .sprite, .sprite_before:before {
        background-image: url("../../../../../assets/img/index_img/icon_sprite.png");
    }
</style>

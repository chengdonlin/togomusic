<template>
    <div>hhh</div>
</template>

<script>
export default {
  name: 'CategoryComponent'
}
</script>

<style scoped>
    .playlist_tag_content {
        max-width: 1200px;
        overflow: hidden;
        margin: 0 auto
    }

    .playlist_tag_ul {
        display: inline-flex;
        position: relative;
        transition: .5s;
        z-index: 2
    }

    .mod_playlist_tag {
        position: relative;
        padding-top: 60px;
        margin-right: -24px
    }

    .mod_playlist_tag:after {
        content: "";
        display: block;
        clear: both
    }

    .playlist_tag__list {
        position: relative;
        float: left;
        width: 238px;
        line-height: 26px;
        margin-right: 22px
    }

    .playlist_tag__list--lang {
        width: 160px
    }

    .playlist_tag__list--select .playlist_tag__item {
        margin-right: 19px
    }

    .playlist_tag__item--expand,.playlist_tag__item--expand:hover,.playlist_tag__item--select,.playlist_tag__item--select:hover {
        background-color: #31c27c;
        color: #fff
    }

    .playlist_tag__line {
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 108px;
        background-color: #eeeef0
    }

    .playlist_tag__item {
        float: left;
        padding: 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 68px
    }

    .popup_tag {
        position: absolute;
        top: 175px;
        left: 0;
        right: 24px;
        border: 1px solid #bfbfbf;
        background-color: #fff;
        padding: 19px 0 15px;
        z-index: 4;
        box-shadow: 0 0 10px hsla(0,0%,71.8%,.65);
        border: 0
    }

    .popup_tag .playlist_tag__tags {
        margin-left: 16px;
        line-height: 26px
    }

    .playlist_tag__itembox {
        float: left;
        width: 76px;
        margin-bottom: 4px
    }

    .popup_tag .playlist_tag__itembox {
        width: auto;
        margin-right: 32px
    }

    .playlist_tag__arrow {
        display: inline-block;
        width: 10px;
        height: 6px;
        background-position: -120px -260px;
        margin-left: 3px;
        vertical-align: 1px
    }

    .playlist_tag__item:hover .playlist_tag__arrow {
        background-position: -140px -260px
    }

    .playlist_tag__item--select .playlist_tag__arrow,.playlist_tag__item--select:hover .playlist_tag__arrow {
        background-position: -160px -260px
    }

    .playlist_tag__item--expand .playlist_tag__arrow,.playlist_tag__item--expand:hover .playlist_tag__arrow {
        background-position: -100px -260px
    }

    .playlist_tag_switch {
        padding-top: 20px
    }

    @media (max-width: 1240px) {
        .playlist_tag__list {
            width:175px;
            margin-right: 0
        }

        .playlist_tag__tags {
            margin-right: 22px
        }

        .playlist_tag__line {
            right: 22px
        }

        .playlist_tag__itembox {
            width: 50%
        }
    }

    .mod_part,.mod_part_detail {
        position: relative;
        margin-bottom: 30px
    }

    .part__hd,.part_detail__hd {
        overflow: hidden;
        height: 60px
    }

    .part__tit,.part_detail__tit {
        float: left;
        font-size: 24px;
        font-weight: 400;
        line-height: 58px
    }

    .mod_playlist .playlist__list {
        margin-right: -20px
    }
</style>

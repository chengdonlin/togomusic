<template>
    <a class="mod_btn js_all_play">
        <i class="mod_btn__icon_play js_all_play" data-stat="y_new.index.new_song.playall"></i>
        播放全部
    </a>
</template>

<script>
export default {
  name: 'PlayBtn'
}
</script>

<style scoped>
    .mod_index--song .mod_btn {
        position: absolute;
        left: 0;
        top: auto;
        margin-top: -10px;
    }

    .mod_btn {
        border: 1px solid #c9c9c9;
        color: #000;
    }
    .mod_btn {
        border: 1px solid #c9c9c9;
        color: #000;
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
    .mod_btn__icon_play {
        width: 13px;
        height: 16px;
        background-position: -60px -220px;
    }
</style>

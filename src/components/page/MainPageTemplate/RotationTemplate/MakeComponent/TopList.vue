<template>
    <li class="toplist__item item0 mod_cover">
        <div class="toplist__box">
            <div class="toplist__bg"></div>
            <i class="mod_cover__icon_play"></i>
            <i class="toplist__line"></i>
            <h3 class="toplist__head">
                <a class="toplist__tit" href="/n/ryqq/toplist/26" v-text="data.musichallTitle.substr(0,data.musichallTitle.length-1)"></a>
            </h3>
            <ul class="toplist__songlist">
                <li class="toplist__song">
                    <div class="toplist__number">1</div>
                    <div class="toplist__songname">
                        <a href="/n/ryqq/songDetail/357531938" v-html="data.song[0].title"></a>
                    </div>
                    <div class="toplist__artist">
                        <a href="/n/ryqq/singer/003iPzNg35cWzp" v-html="data.song[0].singerName"></a>
                    </div>
                </li>
                <li class="toplist__song">
                    <div class="toplist__number">2</div>
                    <div class="toplist__songname">
                        <a href="/n/ryqq/songDetail/368139519" v-html="data.song[1].title"></a>
                    </div>
                    <div class="toplist__artist">
                        <a href="/n/ryqq/singer/001uXFgt1kpLyI" v-html="data.song[1].singerName"></a>
                    </div>
                </li>
                <li class="toplist__song">
                    <div class="toplist__number">3</div>
                    <div class="toplist__songname">
                        <a href="/n/ryqq/songDetail/1030353" v-html="data.song[2].title"></a>
                    </div>
                    <div class="toplist__artist">
                        <a href="/n/ryqq/singer/000hNnWC3kko2c" v-html="data.song[2].singerName"></a>
                    </div>
                </li>
            </ul>
        </div>
    </li>
</template>

<script>
export default {
  name: 'TopList',
  props: ['data']
}
</script>

<style scoped>
    .toplist__item {
        display: inline-block;
        z-index: 2;
        width: 20%;
    }

    .mod_cover {
        zoom: 1;
    }
    .toplist__box {
        position: relative;
        margin-right: 20px;
        height: 500px;
        overflow: hidden;
    }
    .toplist__item .toplist__bg {
        transform: scale(1);
        transition: transform .75s;
    }

    .toplist__bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 567px;
        background-image: url("../../../../../assets/img/index_img/bg_index_top.png");
    }
    .toplist__item .mod_cover__icon_play {
        background-size: 72%;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .toplist__item .mod_cover__icon_play {
        top: 114px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .toplist__line {
        position: absolute;
        left: 50%;
        top: 148px;
        margin-left: -18px;
        width: 36px;
        height: 2px;
        background: #fff;
    }
    .toplist__head {
        position: absolute;
        top: 50px;
        left: 50%;
        margin-left: -100px;
        width: 200px;
        text-align: center;
    }
    .toplist__head:before {
        content: "";
        display: block;
        width: 66px;
        height: 22px;
        margin: 0 auto 9px;
        background-image: url("../../../../../assets/img/index_img/index_tit.png");
        background-position: 0 -300px;
    }
    .toplist__head .toplist__tit {
        float: none;
        height: 36px;
        line-height: 1;
        font-size: 26px;
        color: #fff;
        font-weight: 400;
    }
    .toplist__songlist, .toplist__songlist a {
        color: #fff;
        font-size: 14px;
    }

    .toplist__songlist {
        position: absolute;
        top: 188px;
        left: 30px;
        right: 30px;
        white-space: nowrap;
    }
    .toplist__song {
        position: relative;
        padding-left: 15px;
        margin-bottom: 27px;
    }
    .toplist__number {
        position: absolute;
        top: 0;
        left: 0;
    }
    .toplist__artist, .toplist__songname {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .toplist__songname {
        margin-bottom: 5px;
    }
    .toplist__songlist, .toplist__songlist a {
        color: #fff;
        font-size: 14px;
    }
    .toplist__item:nth-child(3) .toplist__bg{
        background-position: -224px 0;
    }
    .toplist__item:nth-child(4) .toplist__bg{
        background-position: -448px 0;
    }
    .toplist__item:nth-child(5) .toplist__bg{
        background-position: -672px 0;
    }
</style>

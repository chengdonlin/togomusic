<template>
    <div class="detail_layout__other" v-if="playListData">
        <div class="mod_about">
            <h3 class="about__tit">简介</h3>
            <div class="about__cont">
                <p v-html="playListData.dirinfo.desc"></p>
            </div>
            <a class="about__more">[更多]</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AboutComponent',
  props: ['playListData']
}
</script>

<style scoped>
    h3{
        color: #000;
        background-color: #fff;
        font-size: 14px;
        line-height: 1.5;
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    }
    p {
        color: #000;
        background-color: #fff;
        font-size: 14px;
        line-height: 1.5;
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    }
    .detail_layout__other {
        float: right;
        position: relative;
        width: 290px;
        margin-right: -343px;
        padding-bottom: 20px;
    }
    .detail_layout__other .mod_about {
        line-height: 22px;
        margin-bottom: 25px;
        margin-top: -8px;
    }
    .detail_layout__other .mod_about .about__cont {
        max-height: 88px;
        overflow: hidden;
    }
    .detail_layout__other .mod_about {
        line-height: 22px;
        margin-bottom: 25px;
        margin-top: -8px;
    }
    .detail_layout__other .mod_about .about__cont {
        max-height: 88px;
        overflow: hidden;
    }

</style>

<template>
<div></div>
</template>

<script>
export default {
  name: 'MvListComponent'
}
</script>

<style scoped>
    .main {
        padding: 35px 0 0;
    }

    .main {
        z-index: 2;
    }
    .main, .section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    a {
        font-size: 14px;
    }
    .mod_tag {
        position: relative;
        margin: 52px 0 0
    }

    .tag__list {
        position: relative;
        height: auto;
        zoom:1;clear: both;
        overflow: hidden;
        line-height: 26px;
        padding-left: 65px
    }

    .tag__tit {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 400;
        width: 65px
    }

    .tag__item {
        float: left;
        padding: 0 8px;
        margin: 0 24px 15px 0
    }

    .tag__item--expand,.tag__item--expand:hover,.tag__item--select,.tag__item--select:hover {
        background-color: #31c27c;
        color: #fff
    }

    .tag__list--select .tag__item {
        margin-right: 19px
    }

    body,html {
        scroll-behavior: smooth
    }

    blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,html,input,lengend,li,ol,p,pre,td,textarea,th,ul {
        margin: 0;
        padding: 0
    }

    body,button,input,select,textarea,th {
        color: #000;
        background-color: #fff;
        font-size: 14px;
        line-height: 1.5;
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        font-family: Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif,9
    }

    h1,h2,h3,h4,h5,h6 {
        font-size: 100%
    }

    li {
        list-style: none
    }

    img {
        border: 0;
        -ms-interpolation-mode: bicubic;
        image-rendering: optimizeQuality
    }

    button,input[type=button],input[type=submit] {
        cursor: pointer
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    a {
        color: #000;
        cursor: pointer
    }

    a,a:hover {
        text-decoration: none
    }

    a:hover {
        color: #31c27c
    }

    a:focus,button:focus,input:focus {
        outline: none
    }

    body {
        background-color: #fafafa
    }

    body {
        min-width: 1240px;
        overflow-y: scroll
    }

    .main,.section_inner {
        max-width: 1200px;
        margin: 0 auto;
        position: relative
    }

    @media (max-width: 1240px) {
        body {
            min-width:1000px
        }

        .main,.section_inner {
            margin: 0 50px;
            min-width: 900px
        }
    }

    .main:after,.section_inner:after {
        content: "";
        display: block;
        clear: both
    }

    .main {
        z-index: 2
    }

    .mod_about .opt_edit_singer_info {
        top: 2px;
        right: 0
    }

</style>

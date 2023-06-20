<template>
    <div class="mod_comment" id="comment_box" v-if="playListComment.CommentList">
        <div class="part__hd">
            <h2 class="part__tit">评论<span class="c_tx_thin part__tit_desc">共{{playListComment.TotalCmNum}}条评论</span>
            </h2>
        </div>
        <div class="comment__input">
            <div class="comment__textarea c_bg_normal">
                <div class="comment__textarea_inner">
                    <div class="comment__textarea_default c_tx_normal" contenteditable="true" style="display: block;">说说你的看法吧</div>
                    <div class="comment__textarea_input c_tx_normal" contenteditable="true" style="display: none;"></div>
                </div>
                <div class="comment__tips c_tx_thin">剩余<span class="c_tx_highlight">300</span>字</div>
            </div>
            <a class="comment__face">
                <i class="icon_comment icon_comment_face"></i>
            </a>
            <div class="comment__tool">
                <a class="mod_btn_green comment__tool_btn">发表评论</a>
            </div>
        </div>
        <div class="mod_hot_comment">
            <div class="comment_type__title c_b_normal">
                <h2>精彩评论</h2>
            </div>
            <ul class="comment__list">
                <li class="comment__list_item c_b_normal" v-for="(item, index) in playListComment.CommentList2.Comments" :key="index">
                    <div>
                        <a class="comment__avatar">
                            <img class="comment_list__avatar_img" :src="item.Avatar" :alt="item.Nick">
                        </a>
                        <h4 class="comment__title">
                            <a class="c_tx_thin" v-text="item.Nick"></a>
                            <span class="vip_icon">
                              <img :src="item.VipIcon" alt="绿钻ICON" v-if="item.VipIcon != ''">
                            </span>
                        </h4>
                        <div class="comment__date c_tx_thin">{{getTime(item.PubTime)}}&nbsp;&nbsp;来自{{item.Location}}</div>
                        <p class="comment__text ">
                            <span v-text="item.Content"></span>
                        </p>
                        <div class="comment__opt">
                            <a class="comment__zan ">
                                <i class="icon_comment icon_comment_like"></i>{{item.PraiseNum}}
                            </a>
                            <a class="comment__feedback c_tx_thin">回复</a>
                        </div>
                    </div>
                    <div class="comment__reply">
                        <div class="comment__reply_hd">
                            <a class="comment__show_all_reply c_tx_thin">查看{{item.ReplyCnt}}条回复<i class="comment__icon_arrow_down sprite"></i>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="mod_hot_comment">
            <div class="comment_type__title c_b_normal">
                <h2>全部评论({{playListComment.TotalCmNum}})</h2>
            </div>
            <ul class="comment__list">
                <li class="comment__list_item c_b_normal" v-for="(item, index) in playListComment.CommentList.Comments" :key="index">
                    <div>
                        <a class="comment__avatar">
                            <img class="comment_list__avatar_img" :src="item.Avatar" :alt="item.Nick">
                        </a>
                        <h4 class="comment__title">
                            <a class="c_tx_thin">{{item.Nick}}</a>
                            <span class="vip_icon" v-if="item.VipIcon != ''"><img :src="item.VipIcon" alt="绿钻ICON"></span>
                        </h4>
                        <div class="comment__date c_tx_thin">{{getTime(item.PubTime)}}&nbsp;&nbsp;来自{{item.Location}}</div>
                        <p class="comment__text ">
                          <span>{{item.Content}}</span>
                        </p>
                        <div class="comment__opt">
                            <a class="comment__zan ">
                                <i class="icon_comment icon_comment_like"></i>
                            </a>
                            <a class="comment__feedback c_tx_thin">回复</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: ['playListComment'],
  methods: {
    getTime (s) {
      let time = new Date(s * 1000)
      if (time.getFullYear() === 2023) {
        return (time.getMonth() + 1) + '月' + time.getDate() + '日  ' + time.getHours() + ':' + time.getMinutes()
      }
      return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日  ' + time.getHours() + ':' + time.getMinutes()
    }
  }
}
</script>

<style scoped>
    span , a, .comment__date, .comment__textarea_default {
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
        font-size: 14px;
    }
    .part__hd, .part_detail__hd {
        overflow: hidden;
        height: 60px;
    }
    .part__tit, .part_detail__tit {
        float: left;
        font-size: 24px;
        font-weight: 400;
        line-height: 58px;
        font-family: 微软雅黑;
    }
    .part__tit_desc {
        font-size: 14px;
        margin-left: 12px;
    }
    .comment__input {
        position: relative;
        padding-bottom: 60px;
    }
    .comment__textarea {
        position: relative;
        overflow: hidden;
        min-height: 102px;
        border: 1px solid #ececec;
        background-color: #f5f5f5;
    }
    .comment__textarea_inner {
        margin: 10px 14px 25px;
    }
    .comment__textarea_default, .comment__textarea_input {
        width: 100%;
        border: none;
        min-height: 66px;
        resize: none;
        outline: none;
        background: transparent;
    }

    .c_tx_normal {
        color: #333;
    }
    .c_tx_highlight {
        color: #31c27c;
        font-size: 14px;
        font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    }
    .comment__face {
        position: absolute;
        right: 90px;
        bottom: 14px;
    }
    .comment__tool {
        position: absolute;
        bottom: 10px;
        right: -5px;
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
    .comment__tips {
        position: absolute;
        bottom: 3px;
        right: 14px;
        text-align: right;
    }
    .icon_comment_face {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: 0 0;
        vertical-align: -1px;
    }
    .icon_comment {
        background-image: -webkit-image-set(url(https://y.qq.com/ryqq/static/media/comment.933b16ba.png?max_age=2592000) 1x,url(https://y.qq.com/ryqq/static/media/comment@2x.4da1c58e.png?max_age=2592000) 2x);
        background-repeat: no-repeat;
    }
    .comment__tool a {
        margin-right: 5px;
    }

    .comment__tool_btn {
        width: 80px;
        line-height: 27px;
        height: 27px;
        text-align: center;
        padding: 0;
    }
    .mod_btn_green {
        border: 1px solid #31c27c;
        background-color: #31c27c;
        color: #fff;
    }
    .comment_type__title {
        position: relative;
        height: 34px;
        line-height: 34px;
        padding-bottom: 10px;
        border-bottom: 1px solid;
        border-color: #ededed;
    }
    .comment_type__title h2 {
        font-weight: 400;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .comment__list {
        padding-bottom: 14px;
    }
    .comment__list_item {
        position: relative;
        padding: 15px 0 15px 56px;
        zoom: 1;
        border-bottom: 1px solid;
        border-color: #ededed;
    }
    .comment__reply {
        margin-top: 5px;
    }
    .comment__avatar {
        position: absolute;
        left: 0;
        top: 18px;
        width: 38px;
        height: 38px
    }

    .comment__avatar img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 999px
    }

    .comment__title {
        font-weight: 400;
        overflow: hidden;
        height: 26px;
        line-height: 26px;
        white-space: nowrap;
        text-overflow: ellipsis
    }

    .comment__title a,.comment__title span {
        float: left
    }

    .vip_icon {
        position: relative;
        margin-left: 2px
    }

    .vip_icon img {
        max-height: 24px
    }

    .comment__text {
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        line-height: 24px;
        text-align: justify
    }

    .comment__text.item {
        margin-top: 6px;
        padding-right: 70px
    }

    .comment__text img {
        position: relative;
        vertical-align: middle;
        top: -2px
    }

    .mod_yueping .comment__text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical
    }

    .comment__opt {
        line-height: 24px;
        overflow: hidden;
        margin-top: 8px
    }

    .comment__opt a {
        margin-right: 20px
    }
    .user_grade .grade__score {
        margin: 6px -16px 0 0;
        -webkit-transform: scale(.78);
        -webkit-transform-origin-x: left
    }

    .comment__date {
        margin-bottom: 10px;
        height: 20px;
        line-height: 20px
    }

    .comment__zan {
        vertical-align: -1px
    }
    .comment__reply_hd {
        position: relative;
    }
    .c_tx_thin {
        color: #999;
    }
    .comment__icon_arrow_down, .comment__icon_arrow_up {
        display: inline-block;
        width: 10px;
        height: 6px;
        vertical-align: middle;
        margin-left: 8px;
        opacity: .5;
        filter: alpha(opacity=50);
    }
    .icon_comment_like {
        background-position: -25px -25px;
    }
    .icon_comment_like, .icon_comment_liked {
        display: inline-block;
        margin-right: 5px;
        width: 17px;
        height: 17px;
        overflow: hidden;
        vertical-align: -3px;
    }

    .comment__icon_arrow_down {
        background-position: -120px -260px;
    }

</style>

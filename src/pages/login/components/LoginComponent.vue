<template>
    <div class="yqq-dialog-wrap" >
        <div class="yqq-dialog yqq-dialog_centered" style="width: 700px; height: 488px;">
            <div class="yqq-dialog-content">
                <button type="button" aria-label="Close" class="yqq-dialog-close" @click="closeBtn()">
                    <span class="yqq-dialog-close-x"></span>
                </button>
                <div class="yqq-dialog-body">
                    <div class="login-box">
                        <div class="login-box-hd">
                            <h2 class="login-box-tit">
                                <span class="login-box-tit__item current">QQ登录</span>
                                <span class="login-box-tit__item">微信登录</span>
                            </h2>
                        </div>
                        <div class="login-box-bd">
                        <div class="login-box-bd__item current">
                            <div style="width: 433px; float: left; display: flex; flex-direction: column;align-items: center;">
                                <div class="title" id="title_0" style="display: block;">快捷登录</div>
                                <div class="qlogin_tips" id="qlogin_tips_0" style="display: block;">使用<a class="link_tips" href="http://im.qq.com/mobileqq/#from=login" target="_blank">QQ手机版</a>扫码登录，或点击头像授权登录。</div>
                                <div class="QR_code" style="width: 315px; margin-top: 20px; text-align: center;">
                                    <img :src="imgData" >
                                </div>
                            </div>
                            <div class="page_accredit combine_page_children float_left border_left">
                                <div class="lay_main" id="lay_main">
                                    <div class="lay_accredit_con">
                                        <p class="cnt_wording"></p>
                                        <div class="accredit_info" id="accredit_info">
                                            <ul class="accredit_info_op">
                                                <li class="select_all_li">
                                                    <input type="checkbox" id="select_all" class="checkbox oauth_checkbox_all" hidefocus="true" checked="checked">
                                                    <label class="oauth_item_title" for="select_all">全选 <p style="margin: 0 0 0 8px; display: inline-block;" class="app_site_wording">
                                                        <a class="accredit_site" id="accredit_site_link" href="https://y.qq.com" target="_blank">QQ音乐</a>将获取以下权限：
                                                    </p>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input name="api_choose" hidefocus="true" type="checkbox" class="checkbox oauth_checkbox" id="item_1010" value="1010" title="默认授权 不可更改" checked="" disabled="">
                                                    <label for="item_1010" class="oauth_item_title">使用你的QQ头像、昵称信息</label>
                                                </li>
                                                <li>
                                                    <input name="api_choose" hidefocus="true" type="checkbox" class="checkbox oauth_checkbox" id="item_1030" value="1030" title="" checked="">
                                                    <label for="item_1030" class="oauth_item_title">你的QQ好友关系</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="oauth_tips_div">
                                            <p class="oauth_tips">
                                                授权即同意<a href="https://ti.qq.com/agreement/index.html" target="_blank">服务协议</a>和<a href="https://rule.tencent.com/rule/preview/3fd52bde-6555-453b-9ab8-c5f1f3d22c62" target="_blank">QQ隐私保护指引</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="login-box-download">
                            <a class="login-box-download__btn">下载客户端 体验更多内容</a>
                        </div>
                    </div>
                </div>
            </div>
            <div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden; outline: none;"></div>
        </div>
    </div>
</template>

<script>
import commonUtil from '../../../../static/js/commonUtil'
export default {
  name: 'LoginComponent',
  data () {
    return {
      imgData: ''
    }
  },
  computed: {
  },
  methods: {
    getORCode () {
      this.$axios.get('/api/getQRCode').then(
        response => {
          this.imgData = 'data:image/png;base64,' + response.data.img

          this.verifyQRCode()
        },
        error => {
          console.log('请求失败', error.message)
        }
      )
    },
    verifyQRCode () {
      this.$axios.get('/api/verifyCode').then(
        response => {
          console.log(response.data.msg)
          switch (response.data.msg) {
            case '二维码未失效':
              setTimeout(this.verifyQRCode, 2000)
              break
            case '二维码已失效':
              break
            case '拒绝':
              break
            default:
              if (response.data.msg.indexOf('成功') !== -1) {
                localStorage.setItem('cookie', response.data.cookie)
                sessionStorage.setItem('OnlineStatus', 'true')
                window.parent.location.replace('/')
              }
          }
        },
        error => {
          console.log('请求失败', error.message)
        }
      )
    },
    closeBtn () {
      commonUtil.deleteLoginPage()
    },
  },
  mounted () {
    this.getORCode()
  }
}
</script>

<style scoped>
    .yqq-dialog-wrap {
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        -webkit-overflow-scrolling: touch;
        outline: 0;
    }
    .yqq-dialog_centered {
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .yqq-dialog {
        position: relative;
        width: auto;
        margin: 10px;
        border: 1px solid #bfbfbf;
        box-shadow: 0 0 10px rgba(0,0,0,.3);
        background-color: #fff;
        font-size: 14px;
        color: #333;
    }
    .yqq-dialog-content {
        position: relative;
        background-color: #fff;
        border: none;
        border-radius: 6px 6px;
        background-clip: padding-box;
    }
    .yqq-dialog-close, .yqq-dialog-close-x, .yqq-dialog-close-x:after {
        display: inline-block;
        width: 24px;
        height: 24px;
    }

    .yqq-dialog-close {
        cursor: pointer;
        border: 0;
        background: transparent;
        font-size: 24px;
        position: absolute;
        top: 6px;
        right: 6px;
        line-height: 1;
        color: #999;
        text-decoration: none;
        z-index: 10;
    }
    .yqq-dialog-close-x:after {
        content: "×";
    }
    .login-box-hd {
        position: relative;
        line-height: 55px;
        text-align: center;
        border-bottom: 1px solid #f2f2f2;
    }
    .login-box-tit {
        font-size: 16px;
        font-weight: 400;
    }
    .login-box-tit__item.current {
        color: #31c27c;
    }
    .login-box-tit__item {
        cursor: pointer;
        margin: 0 60px;
    }
    .login-box-bd {
        position: relative;
        overflow: hidden;
        height: 328px;
    }
    .login-box-download {
        padding: 14px 0 24px;
        overflow: hidden;
        text-align: center;
    }
    .login-box-download__btn {
        display: inline-block;
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 20px;
        background-color: #31c27c;
        background-image: linear-gradient(90deg,#24ccaa,#31c27c);
    }
    .login-box-bd__item {
        display: flex;
    }
    #combine_page .page_accredit {
        width: 227px;
        height: 298px;
    }

    .border_left {
        border-left: 1px solid #f5f5f5;
        margin-top: 32px;
    }
    .float_left {
        float: left;
    }

    .lay_main {
        margin-left: 32px;
        width: 100%!important;
    }
    .lay_main:before, .lay_main:after {
        content: ".";
        display: block;
        height: 0;
        visibility: hidden;
    }
    .lay_accredit_con {
        margin-top: 76px;
        font-size: 12px;
        line-height: 16px;
    }
    .cnt_wording {
        margin-bottom: 16px;
    }
    .accredit_info {
        margin-top: 8px;
        overflow: hidden;
        *zoom: 1;
        transition-property: height;
        transition-duration: .5s;
    }
    .accredit_info_op {
        padding: 0;
        display: flex;
        flex-direction: column;
    }
    .accredit_info_op li {
        margin-bottom: 6px;
        color: #666;
    }
    .accredit_info_op li input[type=checkbox] {
        visibility: hidden;
    }

    .oauth_checkbox_all, .oauth_checkbox {
        display: block;
        float: left;
        height: 16px;
        width: 16px;
    }
    .oauth_item_title {
        line-height: 16px;
        margin-left: 8px;
    }
    .accredit_info_op li input[type=checkbox]:checked:after {
        background: url("../../../assets/img/login_img/checkbox-checked.png") no-repeat;
        background-size: contain;

    }

    .accredit_info_op li input[type="checkbox"]:after {
        content: ' ';
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url("../../../assets/img/login_img/checkbox-checked.png") no-repeat;
        background-size: contain;
        visibility: visible;
        visibility: hidden\9;
    }
    .accredit_site {
        margin-right: 5px;
    }
    a {
        color: #2e77e5;
    }
    .title {
        font-size: 20px;
        line-height: 28px;
        color: #000;
        margin: 16px 0 6px;
    }
    .qlogin .qlogin_tips {
        color: #000;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        position: relative;
        margin-bottom: 16px;
        zoom: 1;
    }
    .link_tips, .timeout a {
        color: #2E77E5;
    }
    .qlogin {
        height: 50%;
        top: 50%;
        position: absolute;
        margin: -166px auto 0;
        display: none;
        width: 100%;
    }
</style>

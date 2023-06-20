<template>
  <div class="profile_cont"><div id="cgi_none_box" class=""><div class="none_txt"><i class="none_txt__symbol"></i><p>什么也没有，去<a href="/">音乐馆</a>发现好音乐！</p></div><div class="bg_detail"><i class="bg_detail__pic"></i></div></div></div>
</template>

<script>
  export default {
    name: 'PlayListComponent'
  }
</script>

<style scoped>
  .none_txt {
    font-size: 20px;
    color: #666;
    line-height: 38px;
    text-align: center;
    padding: 90px 0 100px;
  }
  .none_txt__symbol {
    display: block;
    width: 213px;
    height: 203px;
    margin: 0 auto 27px;
    background-image: url(https://y.qq.com/mediastyle/yqq/img/symbol_none.png?max_age=2592000);
  }
  .profile_exclusive .none_txt p a {
    color: #31c27c;
  }

</style>

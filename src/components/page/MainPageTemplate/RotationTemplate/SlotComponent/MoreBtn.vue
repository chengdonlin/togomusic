<template>
    <a class="index__more" href="/n/ryqq/album">
        更多
        <i class="icon_index_arrow sprite"></i>
    </a>
</template>

<script>
export default {
  name: 'MoreBtn'
}
</script>

<style scoped>
    .index__more {
        position: absolute;
        right: 0;
        top: auto;
    }
    .icon_index_arrow {
        display: inline-block;
        width: 7px;
        height: 12px;
        background-position: -120px -40px;
        margin-left: 6px;
    }
    .sprite, .sprite_before:before {
        background-image: url("../../../../../assets/img/index_img/icon_sprite.png");
    }
</style>

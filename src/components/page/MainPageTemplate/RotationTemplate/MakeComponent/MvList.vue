<template>
    <ul class="mv_list__list mv_list_slide__list" >
        <MvItem v-for="item in data" :key="item.mvid" :data="item"></MvItem>
    </ul>
</template>

<script>
import MvItem from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/MvItem'
export default {
  name: 'MvList',
  components: {MvItem},
  props: ['data']
}
</script>

<style scoped>
    .mv_list_slide__list {
        display: inline-block;
        width: 8%;
        margin-right: 0;
        font-size: 14px;
    }

    .mv_list__list {
        zoom: 1;
    }
</style>

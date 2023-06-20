<template>
    <ul class="toplist__list">
        <TopList v-for="index in 5" :key="index" :data="data[0].toplist[index]"></TopList>
    </ul>
</template>

<script>
import TopList from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/TopList'
export default {
  name: 'VueTop',
  props: ['data'],
  components: {TopList}
}
</script>

<style scoped>
    .toplist__list {
        font-size: 0;
        margin-right: -20px;
    }
</style>

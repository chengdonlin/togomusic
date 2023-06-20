<template>
    <ul class="debutlist__list">
        <DeButItem v-for="(item, index) in (!data ? [null, null, null, null, null, null, null, null, null]: data)"
                   :key="index" :data="item"></DeButItem>
    </ul>
</template>

<script>
import DeButItem from './DeButItem'
export default {
  name: 'DeButListList',
  components: {DeButItem},
  props: ['data']
}
</script>

<style scoped>
    .debutlist__list {
        display: inline-block;
        width: 8%;
    }
</style>

<template>
    <div class="mod_event mod_slide">
        <ul class="event_list slide__list" :style="{'left':(AllScrollData.event*-100)+'%'}">
            <EventList v-for="item in data" :key="item.id" :data="item"></EventList>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import EventList from '@/components/page/MainPageTemplate/RotationTemplate/MakeComponent/EventList'
export default {
  name: 'VueEvent',
  props: ['data'],
  computed: {
    ...mapState('MainPageOptions', ['AllScrollData'])
  },
  components: {EventList}
}
</script>

<style scoped>
    .slide__list {
        position: relative;
        font-size: 0;
        width: 1250%;
        transition: .5s;
    }
    .mod_event {
        margin-right: -20px;
        padding-bottom: 10px;
    }

    .mod_slide {
        overflow: hidden;
        margin-bottom: 20px;
    }
</style>

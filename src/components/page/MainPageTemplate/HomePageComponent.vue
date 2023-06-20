<template>
    <div>
        <PollMenuComponent :className="'hot'" :data="!InitializeData ? null :InitializeData.hot">
            <PlayList slot="dataList" :data="!InitializeData ? null :InitializeData.hot.data.List"></PlayList>
        </PollMenuComponent>

        <PollMenuComponent :className="'song'" :data="!InitializeData ? null: InitializeData.song">
            <PlayBtn slot="btn"></PlayBtn>
            <DeButList slot="dataList" :data="!InitializeData ? null: InitializeData.song.data.songlist"></DeButList>
        </PollMenuComponent>

        <PollMenuComponent :className="'event'" :data="InitializeData.event" v-if="InitializeData">
            <VueEvent slot="dataList" :data="InitializeData.event.data.shelf.v_niche[0].v_card"></VueEvent>
        </PollMenuComponent>

        <PollMenuComponent :className="'album'" :data="InitializeData.album" v-if="InitializeData">
            <MoreBtn slot="btn"></MoreBtn>
            <VueAlbum slot="dataList" :data="InitializeData.album.data.albums"></VueAlbum>
        </PollMenuComponent>

        <PollMenuComponent :className="'top'" :data="InitializeData.top" v-if="InitializeData">
            <MoreBtn slot="btn"></MoreBtn>
            <VueTop slot="dataList" :data="InitializeData.top.data.group" ></VueTop>
        </PollMenuComponent>

        <PollMenuComponent :className="'mv'" :data="InitializeData.mv" v-if="InitializeData">
            <MoreBtn slot="btn"></MoreBtn>
            <VueMv slot="dataList" :data="InitializeData.mv.data.list" ></VueMv>
        </PollMenuComponent>
    </div>
</template>

<script>
import VueMv from './RotationTemplate/MakeComponent/VueMv'
import MoreBtn from './RotationTemplate/SlotComponent/MoreBtn'
import VueTop from './RotationTemplate/MakeComponent/VueTop'
import VueAlbum from './RotationTemplate/MakeComponent/VueAlbum'
import VueEvent from './RotationTemplate/MakeComponent/VueEvent'
import DeButList from './RotationTemplate/MakeComponent/DeButList'
import PlayList from './RotationTemplate/MakeComponent/PlayList'
import PollMenuComponent from './RotationTemplate/PollMenuComponent'
import PlayBtn from './RotationTemplate/SlotComponent/PlayBtn'
import {mapState} from 'vuex'

export default {
  name: 'HomePageComponent',
  components: {
    VueMv,
    MoreBtn,
    VueTop,
    VueAlbum,
    VueEvent,
    DeButList,
    PlayList,
    PollMenuComponent,
    PlayBtn
  },
  computed: {
    ...mapState('MainPageOptions', ['InitializeData'])
  },
}
</script>

<style scoped>

</style>

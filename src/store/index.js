// 引入Vue核心库
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
import axios from 'axios'
import pubSub from 'pubsub-js'

// 应用Vuex插件
Vue.use(Vuex)

const IdentityOptions = {
  namespaced: true,
  mutations: {
    'SET_IDENTITY'(state, value){
      // state.Identity.imgSrc = value.data.req_1.data.map_userinfo[value.qqId]
      // state.Identity.msg = value.data.req_2.data.infoMap[value.qqId]
      state.Identity = {
        imgSrc: value.data.req_1.data.map_userinfo[value.qqId],
        msg: value.data.req_2.data.infoMap[value.qqId]
      }
    }
  },
  state: {
    // Identity:{imgSrc:{},msg:{}}
    Identity: null
  }
}
const MainPageOptions = {
  namespaced: true,
  actions: {
    getInitialData (context) {
      axios.get( '/api/getInitialData').then(
        response => {
          console.log(response.data)
          context.commit('SET_DATA', response.data)
        },
        error => {
          console.log('获取数据失败' + error.message)
        }
      )
    },
    carryOutScroll (context, value) {
      context.commit('SET_AllScrollData', value)
      console.log(value)
    },
    ScrollBtn (context, value) {
      context.commit('SET_SCROLL_DATA', value)
    }
  },
  mutations: {
    'SET_DATA' (state, value) {
      state.InitializeData = value
    },
    'SET_AllScrollData' (state, value) {
      if (value.pageNumber - 1 === state.AllScrollData[value.mark] && value.number === 1) {
        state.AllScrollData[value.mark] = 0
        return
      } else if (state.AllScrollData[value.mark] === 0 && value.number === -1) {
        state.AllScrollData[value.mark] = value.pageNumber - 1
        return
      }
      state.AllScrollData[value.mark] += value.number
    },
    'SET_SCROLL_DATA' (state, value) {
      state.AllScrollData[value.className] = value.index
    },
    ReplaceData (state, value) {
      switch (value.name) {
        case 'song':
          state.InitializeData[value.name].data.songlist = value.data.req.data.songlist
          break
        case 'album':
          state.InitializeData[value.name].data.albums = value.data.req.data.albums
          break
        case 'mv':
          state.InitializeData[value.name].data.list = value.data.req.data.list
          break
      }
    }
  },
  state: {
    AllScrollData: {
      hot: 0,
      song: 0,
      event: 0,
      album: 0,
      top: 0,
      mv: 0
    },
    InitializeData: null

  }
}
const SongListOptions = {
  namespaced: true,
  actions: {
    handleMusicMid (context, value) {
      axios.get('/api/getMusicInfo?mid='+ value).then(
        response => {
          console.log(value)
          context.commit('SET_MUSIC', response.data.req_1.data.track_info)
          pubSub.publish("openPlayer")
        }
      )
    },
    handleMusicListMid(context, value){
      axios.get("/api/getSongListById?dissId="+ value).then(
        response =>{
          context.commit("loadSongList", response.data.req_1.data.songlist)
          pubSub.publish("openPlayer")
        }
      )
    },
    handleAddLikeList(context, value){
      context.commit('updateLikeList', true)
      axios.get("/api/addMyLike?id="+ value).then(
        response =>{
          console.log(response.data)
          // context.commit("updateLikeList", value)
        }
      )
    },
    handleDelLikeList(context, value){
      context.commit('updateLikeList', false)
      axios.get("/api/deleteMyLike?id="+ value).then(
        response =>{
          console.log(response.data)
          // context.commit("updateLikeList", value)
        }
      )
    }
  },
  mutations: {
    SET_MUSIC (state, value) {
      if (!state.SongList){
        state.SongList = []
      }
      state.SongList.unshift(value)
      SongListOptions.state.CurrentSongIndex = 0
      SetLocalRecords()
      },
    loadSongList(state, value){
      if (!state.SongList){
        state.SongList = []
      }
      state.SongList = value
      SongListOptions.state.CurrentSongIndex = 0
      SetLocalRecords()
    },
    SET_CTINDEX(state, value){
      if(value === 0 && state.CurrentSongIndex === state.SongList.length - 1) {
        state.CurrentSongIndex = 0
      }else if(value === 0 && state.CurrentSongIndex === 0){
        state.CurrentSongIndex = state.SongList.length
      }else {
        state.CurrentSongIndex += value
      }
    },
    setCuIndex(state, value){
      state.CurrentSongIndex = value
    },
    delSongList(state, value){
      state.SongList = state.SongList.filter((item, index)=>{
        return index !== value
      })
      if(value < state.CurrentSongIndex){
        state.CurrentSongIndex --
      }else if(value === state.CurrentSongIndex){
        if(value === state.SongList.length ){
          state.CurrentSongIndex = 0
        }
        pubSub.publish("loadResources")
      }else {

      }
      SetLocalRecords()
    },
    delCheckSongList(state, value){
      state.SongList = state.SongList.filter((item)=>{
        for(let val of value){
          console.log(val)
          if(item.id === val){
            return false
          }
        }
        return item
      })
      SetLocalRecords()
    },
    setLikeList(state, value){
      state.LikeList = value
    },
    updateLikeList(state, value){
      state.LikeList[state.SongList[state.CurrentSongIndex].mid] = value
    }
  },
  state: {
    SongList: localStorage.getItem('playSongData')? JSON.parse(localStorage.getItem('playSongData')).value.songList : null,
    CurrentSongIndex: localStorage.getItem('playSongData')? JSON.parse(localStorage.getItem('playSongData')).value.index : 0,
    LikeList: {}
  }
}
const MusicVideoOptions = {
  namespaced: true,
  mutations:{
    updateSrc(state, value){
      state.SongSrc = value
      SetLocalRecords()
    },
    updatePlaying(state, value){
      state.IsPlaying = value
    },
    updateLyric(state, value){
      state.Lyric = value
    },
    SetPage(state, value){
      state.page = value
    }
  },
  state:{
    SongSrc: null,
    Lyric: null,
    IsPlaying: false, //是否在播放
    page: null  //页面标识
  }
}
const UserInfoOptions = {
  namespaced: true,
  mutations:{
    SET_INFO (state, value){
      state.myInfo = value
    }
  },
  state:{
    myInfo:null
  }
}
//更新本地存储
function SetLocalRecords () {
  console.log("更新本地存储")
  localStorage.setItem('playSongData', JSON.stringify({
    value:{
      index: SongListOptions.state.CurrentSongIndex,
      isAdd: true,
      isPlay: true,
      isVip: IdentityOptions.state.Identity? IdentityOptions.state.Identity.msg.iNewVip === 1 || false : false,
      songList: SongListOptions.state.SongList,
      time: Date.now(),
      uid: IdentityOptions.state.Identity? IdentityOptions.state.Identity.msg.uUin : 0
    }
  }))
}




// 创建并暴露store
export default new Vuex.Store({
  modules: {
    MainPageOptions, SongListOptions, IdentityOptions, MusicVideoOptions, UserInfoOptions
  }
})

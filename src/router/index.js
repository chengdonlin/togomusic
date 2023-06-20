import Vue from 'vue'
import VueRouter from 'vue-router'
import MusicPageComponent from '../components/PlayListTemplate/MusicPageComponent'
import PlayListPageComponent from '../components/PlayListTemplate/PlayListPageComponent'
import HomePageComponent from '../components/page/MainPageTemplate/HomePageComponent'
import SingerListComponent from '../components/page/SingerListTemplate/SingerListComponent'
import TopListComponent from '../components/page/TopListTemplate/TopListComponent'
import CategoryComponent from '../components/page/CategoryTemplate/CategoryComponent'
import RadioComponent from '../components/page/RadioTemplate/RadioComponent'
import AlbumComponent from '../components/page/AlbumTemplate/AlbumComponent'
import MvListComponent from '../components/page/MvListTemplate/MvListComponent'
import MyHomePageComponent from '../components/MyHomePageTemplate/MyHomePageComponent'
import SongComponent from '../components/MyHomePageTemplate/subPage/LikeSubPage/SongComponent'
import PlayListComponent from '../components/MyHomePageTemplate/subPage/LikeSubPage/PlayListComponent'
import MvComponent from '../components/MyHomePageTemplate/subPage/LikeSubPage/MvComponent'
import CreateComponent from '../components/MyHomePageTemplate/subPage/CreateComponent'
import SingerComponent from '../components/MyHomePageTemplate/subPage/FocusSubPage/SingerComponent'
import UserComponent from '../components/MyHomePageTemplate/subPage/FocusSubPage/UserComponent'
import FansComponent from '../components/MyHomePageTemplate/subPage/FansComponent'
import UploadmvComponent from '../components/MyHomePageTemplate/subPage/UploadmvComponent'
import NotLogin from '../components/MyHomePageTemplate/NotLogin'
import LikePageComponent from '../components/MyHomePageTemplate/subPage/LikePageComponent'
import FocusComponent from '../components/MyHomePageTemplate/subPage/FocusComponent'
import LikeAlbumComponent from '../components/MyHomePageTemplate/subPage/LikeSubPage/LikeAlbumComponent'
import AlbumMallComponent from '../components/page/AlbumMallTemplate/AlbumMallComponent'
import SearchComponent from '../components/SearchTemplate/SearchComponent'
import LyricComponent from '../components/SearchTemplate/items/LyricComponent'

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'musicPage',
      path: '/musicPage/:mid',
      component: MusicPageComponent,
      props ($route) {
        return {mid: $route.params.mid}
      }
    },
    {
      name: 'playlistPage',
      path: '/playlistPage/:mid',
      component: PlayListPageComponent,
      props ($route) {
        return {mid: $route.params.mid}
      }
    },
    {
      name: 'SearchComponent',
      path: '/search/w=:w&t=:t',
      component: SearchComponent,
      props ($route) {
        return {w: $route.params.w, t: $route.params.t}
      }
    },
    {
      name: 'HomePageComponent',
      path: '/index',
      component: HomePageComponent
    },
    {
      name: 'SingerListComponent',
      path: '/singer_list',
      component: SingerListComponent
    },
    {
      name: 'AlbumComponent',
      path: '/album',
      component: AlbumComponent
    },
    {
      name: 'TopListComponent',
      path: '/top_list',
      component: TopListComponent
    },
    {
      name: 'CategoryComponent',
      path: '/category',
      component: CategoryComponent
    },
    {
      name: 'RadioComponent',
      path: '/radio',
      component: RadioComponent
    },
    {
      name: 'MvListComponent',
      path: '/mv_list',
      component: MvListComponent
    },
    {
      name: 'AlbumMallComponent',
      path: '/album_mall',
      component: AlbumMallComponent
    },
    {
      name: 'NotLogin',
      path: '/login',
      meta: {hide: true},
      component: NotLogin
    },
    {
      name: 'MyHomePageComponent',
      path: '/login/my_home',
      component: MyHomePageComponent,
      children: [
        {
          path:'like',
          redirect: 'like/song',
          component: LikePageComponent,
          children: [
            {
              name: 'SongComponent',
              path: 'song',
              component: SongComponent,
            },
            {
              name: 'PlayListComponent',
              path: 'play',
              component: PlayListComponent,
            },
            {
              name: 'LikeAlbumComponent',
              path: 'album',
              component: LikeAlbumComponent,
            },
            {
              name: 'MvComponent',
              path: 'mv',
              component: MvComponent,
            },
          ]
        },
        {
          name: 'CreateComponent',
          path: 'create',
          component: CreateComponent
        },
        {
          path: 'focus',
          redirect: 'focus/singer',
          component: FocusComponent,
          children: [
            {
              name: 'SingerComponent',
              path: 'singer',
              component: SingerComponent
            },
            {
              name: 'UserComponent',
              path: 'user',
              component: UserComponent
            },
          ]
        },
        {
          name: 'FansComponent',
          path: 'fans',
          component: FansComponent
        },
        {
          name: 'UploadmvComponent',
          path: 'uploadmv',
          component: UploadmvComponent
        },
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let bt = document.getElementsByClassName('mod_subNav')[0]
  if (to.path.indexOf("/my_home") !== -1 || to.meta.hide){
    if (bt) bt.style.display = 'none'
  }else {
    if (bt) bt.style.display = 'flex'

  }
  // console.log(to)
  next()
})

export default router

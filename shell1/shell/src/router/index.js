import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '../components/Detail.vue'
import Search from '../components/search.vue'
import Login from '../components/Login.vue'
import List from '../components/List.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },{
      path: '/home',
      component: Home,
      name:'home',
      children:[
        {
          path:'channel_key/:key',
          name:'channel_key',
          component:List
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path:'/search',
      name:'search',
      component:Search
    },{
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})

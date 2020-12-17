import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/view/index'
import Lease from '@/view/lease'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/lease",
      name: "lease",
      component: Lease
    },
    {
      path: "/faultReport",
      name: "faultReport",
      component: () => import( /* webpackChunkName: 'faultReport' */ "@/view/faultReport")
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/view/index'
import Lease from '@/view/lease'
import Statuspay from '@/view/statuspay'
import Prompt from '@/view/prompt'

Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/lease",
      name: "Lease",
      component: Lease
    },
    {
      path: "/statuspay",
      name: "Statuspay",
      component: Statuspay
    },
    {
      path: "/prompt",
      name: "prompt",
      component: Prompt
    },
    {
      path: "/faultReport",
      name: "faultReport",
      component: () => import( /* webpackChunkName: 'faultReport' */ "@/view/faultReport")

    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import Lease from '@/view/lease'
import Statuspay from '@/view/statuspay'
import Prompt from '@/view/prompt'
import Eject from '@/view/eject'
import Login from '@/view/login'

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
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/eject",
      name: "Eject",
      component: Eject
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
    },
    {
      path: "/rentalAgree",
      name: "rentalAgree",
      component: () => import( /* webpackChunkName: 'rentalAgree' */ "@/view/rentalAgree")
    },
    {
      path: "/paymentSuccess",
      name: "paymentSuccess",
      component: () => import( /* webpackChunkName: 'paymentSuccess' */ "@/view/paymentSuccess")
    },
    {
      path: "/authFailed",
      name: "authFailed",
      component: () => import( /* webpackChunkName: 'authFailed' */ "@/view/authFailed")
    }
  ]
})

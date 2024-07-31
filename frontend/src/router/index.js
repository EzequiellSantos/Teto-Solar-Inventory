import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/inverters',
    name:'inverters',
    component: () => import(/* webpackChunkName: "inverters" */ '../views/DashboardInv.vue')
  },
  {
    path: '/logs',
    name:'logs',
    component: () => import(/* webpackChunkName: "logs" */ '../views/DashboardLogs.vue')
  },
  {
    path: '/registerLog',
    name:'registerLog',
    component: () => import(/* webpackChunkName: "logForm" */ '../views/NewLog.vue')
  },
  {
    path: '/registerInv',
    name:'registerInv',
    component: () => import(/* webpackChunkName: "invForm" */ '../views/NewInv.vue')
  },
  {
    path: '/inverter/:id',
    name:'inverter',
    component: () => import(/* webpackChunkName: "inverter" */ '../views/Inverter.vue')
  },
  {
    path: '/log/:id',
    name:'log',
    component: () => import(/* webpackChunkName: "log" */ '../views/Log.vue')
  },
  {
    path: '/editInverter/:id',
    name: "editinverter",
    component: () => import(/* webpackChunkName: "EditInv" */ '../views/EditInverter.vue')
  },
  {
    path: '/editLog/:id',
    name: "editlog",
    component: () => import(/* webpackChunkName: "EditLog" */ '../views/EditLog.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

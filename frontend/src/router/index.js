import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name:'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
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
    component: () => import(/* webpackChunkName: "inverters" */ '../views/DashboardInv.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/logs',
    name:'logs',
    component: () => import(/* webpackChunkName: "logs" */ '../views/DashboardLogs.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/registerLog',
    name:'registerLog',
    component: () => import(/* webpackChunkName: "logForm" */ '../views/NewLog.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/registerInv',
    name:'registerInv',
    component: () => import(/* webpackChunkName: "register" */ '../views/NewInv.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/inverter/:id',
    name:'inverter',
    component: () => import(/* webpackChunkName: "inverter" */ '../views/Inverter.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/log/:id',
    name:'log',
    component: () => import(/* webpackChunkName: "logs" */ '../views/Log.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editInverter/:id',
    name: "editinverter",
    component: () => import(/* webpackChunkName: "EditInv" */ '../views/EditInverter.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editLog/:id',
    name: "editlog",
    component: () => import(/* webpackChunkName: "EditLog" */ '../views/EditLog.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requireAuth)){

    if(store.getters.authenticated === false){

      next({

        path: '/login',
        params: {nextUrl: to.fullPath}

      })

    } else {

      next()

    }

  } else {

    next()

  }

})

export default router

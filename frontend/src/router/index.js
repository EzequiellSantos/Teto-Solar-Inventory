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
    component: () => import(/* webpackChunkName: "about" */ '../views/inverters/AboutView.vue'),
  },
  {
    path: '/inverters',
    name:'inverters',
    component: () => import(/* webpackChunkName: "inverters" */ '../views/inverters/DashboardInv.vue'),
  },

  {
    path: '/logs',
    name:'logs',
    component: () => import(/* webpackChunkName: "logs" */ '../views/inverters/DashboardLogs.vue'),
  },
  {
    path: '/registerLog',
    name:'registerLog',
    component: () => import(/* webpackChunkName: "logForm" */ '../views/inverters/NewLog.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/registerInv',
    name:'registerInv',
    component: () => import(/* webpackChunkName: "register" */ '../views/inverters/NewInv.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/inverter/:id',
    name:'inverter',
    component: () => import(/* webpackChunkName: "inverter" */ '../views/inverters/Inverter.vue'),
  },
  {
    path: '/log/:id',
    name:'log',
    component: () => import(/* webpackChunkName: "logs" */ '../views/inverters/Log.vue'),
  },
  {
    path: '/editInverter/:id',
    name: "editinverter",
    component: () => import(/* webpackChunkName: "EditInv" */ '../views/inverters/EditInverter.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editLog/:id',
    name: "editlog",
    component: () => import(/* webpackChunkName: "EditLog" */ '../views/inverters/EditLog.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/brands',
    name: "brands",
    component: () => import(/* webpackChunkName: "brands" */ '../views/panels/DashboardBrands.vue'),
  },
  {
    path: '/brands/:brand',
    name: "brand",
    component: () => import(/* webpackChunkName: "EditLog" */ '../views/panels/Brand.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {

    /*
      salvar posição em forma de hash do item clicado  e levar
      até a posição dele quando a hash estiver presente na url 
    */

    return new Promise((resolve) => {

      if (to.hash) {
        const checkExist = setInterval(() => {
          const element = document.getElementById(to.hash.slice(1));

          if (element) {

            clearInterval(checkExist);

            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // 200px de margem do topo

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            resolve();

          }
        }, 100); // Verifica a cada 100ms

      } else if (savedPosition) {

        resolve(savedPosition);

      } else {

        resolve({ x: 0, y: 0 });

      }

    });

  }

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

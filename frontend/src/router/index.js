import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    component: () => import(/* webpackChunkName: "about" */ '../views/inverters/AboutView.vue')
  },
  {
    path: '/inverters',
    name:'inverters',
    component: () => import(/* webpackChunkName: "inverters" */ '../views/inverters/DashboardInv.vue')
  },

  {
    path: '/logs',
    name:'logs',
    component: () => import(/* webpackChunkName: "logs" */ '../views/inverters/DashboardLogs.vue')
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
    component: () => import(/* webpackChunkName: "inverter" */ '../views/inverters/Inverter.vue')
  },
  {
    path: '/log/:id',
    name:'log',
    component: () => import(/* webpackChunkName: "logs" */ '../views/inverters/Log.vue')
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
    path: '/batchs',
    name: "batchs",
    component: () => import(/* webpackChunkName: "batchs" */ '../views/panels/DashboardBatchs.vue')
  },
  {
    path: '/batchs/:brand',
    name: "batchsBrands",
    component: () => import(/* webpackChunkName: "batch" */ '../views/panels/Batchs.vue')
  },
  {
    path: '/registerBatch',
    name: "registerBatch",
    component: () => import(/* webpackChunkName: "registerBatch" */ '../views/panels/NewBatch.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editBatch/:id',
    name: "editBatch",
    component: () => import(/* webpackChunkName: "editBatch" */ '../views/panels/EditBatch.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/trackings',
    name: "trackings",
    component: () => import(/* webpackChunkName: "trackings" */ '../views/panels/DashboardTrackings.vue')
  },
  {
    path: '/registerTracking/:invoiceNumber',
    name: "registerTracking",
    component: () => import(/* webpackChunkName: "registerTracking" */ '../views/panels/NewTrackingOut.vue'),
    props: true,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/batch/:id',
    name: "batch",
    component: () => import(/* webpackChunkName: "batchs" */ '../views/panels/Batch.vue')
  },
  {
    path: '/histories',
    name: "histories",
    component: () => import(/* webpackChunkName: "histories" */ '../views/stockroom/Histories.vue')
  },
  {
    path: '/registerInput',
    name: "registerInput",
    component: () => import(/* webpackChunkName: "inputalmox" */ '../views/stockroom/InputAlmox.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/registerOutput',
    name: "registeroutput",
    component: () => import(/* webpackChunkName: "registeroutput" */ '../views/stockroom/OutputAlmox.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/materials',
    name: "materials",
    component: () => import(/* webpackChunkName: "materials" */ '../views/stockroom/Almox.vue')
  },
  {
    path: '/registerProduct',
    name: "registerproduct",
    component: () => import(/* webpackChunkName: "registerBatch" */ '../views/stockroom/NewProduct.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editProduct/:id',
    name: "editproduct",
    component: () => import(/* webpackChunkName: "editproduct" */ '../views/stockroom/EditProduct.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/orders',
    name: "orders",
    component: () => import(/* webpackChunkName: "orders" */ '../views/stockroom/Orders.vue')
  },
  {
    path: '/registerOrder',
    name: "registerorder",
    component: () => import(/* webpackChunkName: "registerOrder" */ '../views/stockroom/NewOrder.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editOrder/:id',
    name: "editorder",
    component: () => import(/* webpackChunkName: "editOrder" */ '../views/stockroom/EditOrder.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/teams',
    name: "teams",
    component: () => import(/* webpackChunkName: "editOrder" */ '../views/teams/Teams.vue'),
    meta: {
      requireAuth: true
    }
  },
    
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

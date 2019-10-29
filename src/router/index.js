import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index')
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('@/views/SignUp/index')
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: () => import('@/views/DashBoard/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/maplist',
      name: 'MapList',
      component: () => import('@/views/MapList/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/form/:id/:type',
      name: 'Form',
      component: () => import('@/views/Form/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/crossing_info/:id',
      name: 'CrossingInfo',
      component: () => import('@/views/CrossingInfo/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dev',
      name: 'Dev',
      component: () => import('@/views/Dev/index'),
      meta: { requiresAuth: true }
    },
    {
      path: '/camera',
      name: 'Camera',
      component: () => import('@/views/Camera/index')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

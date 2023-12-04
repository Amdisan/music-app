import { createRouter, createWebHistory } from 'vue-router'

import useUserStore from '../stores/user'

//loads component only when needed
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Manage = () => import('../views/Manage.vue')
const Song = () => import('../views/Song.vue')

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/manage',
    // alias: '/manage-music',
    component: Manage,
    name: 'manage',
    meta: {
      requiresAuth: true
    }
  },
  {
    //can use redirect or alias for new path, search engines more likes redirect
    path: '/manage-music',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id', // colon ":" gives router to know that it is dynamic path
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

//global guard for auth
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router

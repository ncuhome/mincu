import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/loading',
    name: 'Loading',
    component: () => import('../views/Loading.vue'),
  },
  {
    path: '/outside',
    name: 'Outside',
    component: () => import('../views/Outside.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/loading',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

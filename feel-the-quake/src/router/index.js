import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quake-form',
    name: 'quake-form',
    component: () => import('../views/QuakeFormView.vue'),
    meta: { transition: 'fade' }
  },
  {
    path: '/hub',
    name: 'hub',
    component: () => import('../views/HubView.vue'),
    meta: { transition: 'fade' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

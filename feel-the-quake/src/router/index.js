import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HubView from '../views/HubView.vue'
import QuakeFormView from '../views/QuakeFormView.vue'
import QuakeDetailsView from '../views/QuakeDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/quake-form',
    name: 'QuakeForm',
    component: QuakeFormView,
    meta: { transition: 'fade' }
  },
  {
    path: '/hub',
    name: 'Hub',
    component: HubView,
    meta: { transition: 'fade' }
  },
  {
    path: "/earthquake/:id",
    name: "EarthquakeDetails",
    component: QuakeDetailsView,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

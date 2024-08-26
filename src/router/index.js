import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue')
    }
  ]
})

export default router

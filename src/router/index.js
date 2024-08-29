import { createRouter, createWebHashHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SigninView
    },
    {
      path: '/signin',
      component: () => import('../views/SigninView.vue')
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

import { createRouter, createWebHistory } from 'vue-router'
import TitlePageView from '../views/TitlePageView.vue'
import RegistrationView from '@/views/RegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'title',
      component: TitlePageView
    },
    {
      path: '/register',
      name: 'registration',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegistrationView
    }
  ]
})

export default router

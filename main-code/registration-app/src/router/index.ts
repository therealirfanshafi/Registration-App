import { createRouter, createWebHistory } from 'vue-router'
import TitlePageView from '../views/TitlePageView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'

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
      component: RegistrationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router

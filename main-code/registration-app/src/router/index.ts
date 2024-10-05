import { createRouter, createWebHistory } from 'vue-router'
import TitlePageView from '@/views/TitlePageView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import PaymentView from '@/views/PaymentView.vue'
import SegmentManagementView from '@/views/SegmentManagementView.vue'
import ProjectSubmissionView from '@/views/ProjectSubmissionView.vue'
import GroupManagementView from '@/views/GroupManagementView.vue'

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
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pay',
      name: 'payment',
      component: PaymentView
    },
    {
      path: '/manage-segments',
      name: 'segmentManage',
      component: SegmentManagementView
    },
    {
      path: '/manage-groups',
      name: 'groupManage',
      component: GroupManagementView
    },
    {
      path: '/submit-project',
      name: 'projectSubmission',
      component: ProjectSubmissionView
    }

  ]
})

export default router

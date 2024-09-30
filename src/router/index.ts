import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import { ProcessType } from '@/types/enums/ProcessType'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users',
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/update:id',
      name: 'usersUpdate',
      component: UsersView,
      props: { process: ProcessType.Update }
    },
    {
      path: '/users/create',
      name: 'usersCreate',
      component: UsersView,
      props: { process: ProcessType.Create }
    },
  ]
})

export default router

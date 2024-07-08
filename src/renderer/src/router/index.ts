import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/router/mainRoutes'
import MainView from '@/views/MainView.vue'
import { applicationPaths } from '@/constants/applicationPaths'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: applicationPaths.HOME.path,
      name: applicationPaths.HOME.name,
      redirect: '/visor',
      component: MainView,
      children: mainRoutes()
    },
    {
      path: '/:pathMatch(.*)*',
      name: '',
      redirect: '/'
    }
  ]
})

export default router

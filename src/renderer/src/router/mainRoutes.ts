import { RouteRecordRaw } from 'vue-router'
import { roleNames } from '@/constants/roleNames'
import VisorView from '@/views/VisorView.vue'

const routes = (): Array<RouteRecordRaw> => [
  {
    path: '/visor',
    name: 'visor',
    meta: {
      transition: 'slide',
      requiresAuth: true,
      authorize: [roleNames.ADV_USER, roleNames.ADMIN],
      sidebar: true,
      icon: 'mdi-account-multiple'
    },
    component: VisorView
  }
]

export default routes

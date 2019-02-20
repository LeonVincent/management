import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CarouselTable from '@/views/CarouselTable'
import Echarts from '@/views/Echarts'
import FormView from '@/views/FormView'
import Newproblem from '@/views/Newproblem'
import Oldproblem from '@/views/Oldproblem'
import Trash from '@/views/Trash'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/Newproblem'
        },
        {
          path: '/Login',
          name: 'Login',
          component: Login
        },
        {
          path: '/Oldproblem',
          component: Oldproblem,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/Trash',
          component: Trash,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: '/Newproblem',
          component: Newproblem,
          meta: {
            requireAuth: true,
          },
        }
      ]
    }
  ]
})

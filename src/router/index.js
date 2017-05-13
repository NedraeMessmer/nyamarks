import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production' ? '/nyamarks/' : '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
  ],
})

import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import EditLink from '@/components/EditLink';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/edit/:id',
      name: 'EditLink',
      component: EditLink,
      props: true,
    },
  ],
})
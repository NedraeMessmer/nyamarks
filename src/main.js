// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

import router from './router';
import vuexStore from './store';

// Components
import TagPill from '@/components/TagPill';
Vue.component('tagPill', TagPill);

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store(vuexStore);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

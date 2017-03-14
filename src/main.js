// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import linkStore from './link-store';

Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
const store = new Vuex.Store(linkStore);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

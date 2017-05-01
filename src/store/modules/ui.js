import Vue from 'vue';
import * as types from '../mutation-types';

const state = {
  linkSearch: null,
  panels: {},
}

const mutations = {
  [types.SHOW_PANEL](state, {name}) {
    // Vue.set needed for reactivity
    return Vue.set(state.panels, name, true);
  },
  [types.HIDE_PANEL](state, {name}) {
    return state.panels[name] = false;
  },
  [types.LINK_QUERY](state, {query}) {
    return state.linkSearch = query;
  },
}

export default {
  state,
  mutations,
}

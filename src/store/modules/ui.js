import Vue from 'vue';
import * as types from '../mutation-types';

const state = {
  linkSearch: null,
  panels: {},
  modals: {},
  autosave: localStorage.getItem('autosave'),
}

const mutations = {
  [types.SHOW_PANEL](state, {name}) {
    // Vue.set needed for reactivity
    return Vue.set(state.panels, name, true);
  },
  [types.HIDE_PANEL](state, {name}) {
    return state.panels[name] = false;
  },
  [types.SHOW_MODAL](state, {name}) {
    return Vue.set(state.modals, name, true);
  },
  [types.HIDE_MODAL](state, {name}) {
    return state.modals[name] = false;
  },
  [types.LINK_QUERY](state, {query}) {
    return state.linkSearch = query;
  },
  [types.AUTOSAVE](state, {value}) {
    localStorage.setItem('autosave', JSON.stringify(value));

    return state.autosave = value;
  },
}

export default {
  state,
  mutations,
}

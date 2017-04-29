import * as types from '../mutation-types';

const state = {
  showOptions: false,
  linkSearch: null,
}

const mutations = {
  [types.SHOW_OPTIONS](state) {
    return state.showOptions = true;
  },
  [types.HIDE_OPTIONS](state) {
    return state.showOptions = false;
  },
  [types.LINK_QUERY](state, {query}) {
    return state.linkSearch = query;
  },
}

export default {
  state,
  mutations,
}

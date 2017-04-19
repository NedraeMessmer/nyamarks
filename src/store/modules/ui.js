import * as types from '../mutation-types';

const state = {
  showOptions: false,
}

const mutations = {
  [types.SHOW_OPTIONS](state) {
    return state.showOptions = true;
  },
  [types.HIDE_OPTIONS](state) {
    return state.showOptions = false;
  },
}

export default {
  state,
  mutations,
}

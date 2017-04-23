import * as types from '../mutation-types';

const state = {
  main: [
    {id: 0, name: 'search'},
    {id: 1, name: 'google'},
    {id: 2, name: 'video'},
    {id: 3, name: 'youtube'},
    {id: 4, name: 'bing'},
    {id: 5, name: 'microsoft'},
    {id: 6, name: 'developer'},
    {id: 7, name: 'mozilla'},
  ],

  $tracking: 7,
}

const mutations = {
  [types.ADD_TAG](state, {tag}) {
    const tagExists = state.main.findIndex(item => item.name === tag) >= 0;

    if (tagExists) {
      return state.main;
    }

    const nextId = state.$tracking ? state.$tracking + 1 : 0;

    const newTag = {
      id: nextId,
      name: tag,
    }

    state.$tracking = nextId;

    return state.main.push(newTag);
  },
  [types.REMOVE_TAG](state, {id}) {
    const index = state.main.findIndex(tag => tag.id === id);

    return state.main.splice(index, 1);
  },
  [types.RESET_TAGS](state, {tags, $tracking = null}) {
    state.$tracking = $tracking;
    state.main = [...tags];

    return state.main;
  },
}

export default {
  state,
  mutations,
}

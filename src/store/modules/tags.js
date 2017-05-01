import * as types from '../mutation-types';

// Initial state
const state = {
  main: [
    {name: 'search'},
    {name: 'google'},
    {name: 'video'},
    {name: 'youtube'},
    {name: 'bing'},
    {name: 'microsoft'},
    {name: 'developer'},
    {name: 'mozilla'},
  ],
}

// Indexing
state.main = state.main.map(indexTag);

// Tracking tags
state.$tracking = state.main.length;

const mutations = {
  [types.ADD_TAG](state, {tag}) {
    const tagExists = state.main.findIndex(item => item.name === tag) >= 0;

    if (tagExists || tag === '') {
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
  [types.RESET_TAGS](state, {tags}) {
    let indexedTags;

    if (tags.$tracking) {
      state.$tracking = tags.$tracking;
      indexedTags = tags.main;
    } else {
      state.$tracking = tags.length;
      indexedTags = tags.map(indexTag);
    }

    return state.main = [...indexedTags];
  },
}

function indexTag(tag, index) {
  tag.id = index;

  return tag;
}

export default {
  state,
  mutations,
}

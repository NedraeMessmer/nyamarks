import * as types from './mutation-types';

export const addLink = ({commit, dispatch}, {link}) => {
  const tags = link.tags;

  commit(types.ADD_LINK, {link});
  dispatch('addTags', {tags});
}

export const removeLink = ({commit}, {index}) => {
  commit(types.REMOVE_LINK, {index});
}

export const updateLink = ({commit, dispatch}, {index, link}) => {
  return new Promise(resolve => {
    const tags = link.tags;

    commit(types.UPDATE_LINK, {index, link});
    dispatch('addTags', {tags});

    resolve();
  });
};

export const addTags = ({commit}, {tags}) => {
  tags.forEach(tag => commit(types.ADD_TAG, {tag}));
}

export const removeTag = ({commit}, {id}) => {
  commit(types.REMOVE_TAG, {id});
}

export const resetData = ({commit}, {data}) => {
  return new Promise(resolve => {
    const {links, tags, $tracking} = data;

    commit(types.RESET_TAGS, {tags, $tracking});
    commit(types.RESET_LINKS, {links});

    resolve();
  });
}

// UI actions
export const showOptions = ({commit}) => {
  const showOptions = true;

  commit(types.SHOW_OPTIONS, {showOptions});
}

export const hideOptions = ({commit}) => {
  const showOptions = false;

  commit(types.HIDE_OPTIONS, {showOptions});
}

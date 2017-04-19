import * as types from './mutation-types';

export const addLink = ({commit, dispatch}, {link}) => {
  const tags = link.tags;

  commit(types.ADD_LINK, {link});
  dispatch('addTags', {tags});
}

export const removeLink = ({commit}, {id}) => {
  commit(types.REMOVE_LINK, {id});
}

export const updateLink = ({commit}, {index, link}) => {
  return new Promise(resolve => {
    commit(types.UPDATE_LINK, {index, link});
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
  const {links, tags, $tracking} = data;

  commit(types.RESET_TAGS, {tags, $tracking});
  commit(types.RESET_LINKS, {links});
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

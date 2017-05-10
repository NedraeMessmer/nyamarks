import * as types from './mutation-types';

export const addLink = ({commit, dispatch}, {link}) => {
  const tags = link.tags;

  commit(types.ADD_LINK, {link});
  dispatch('addTags', {tags});
}

export const removeLink = ({commit}, {id}) => {
  commit(types.REMOVE_LINK, {id});
}

export const updateLink = ({commit, dispatch}, {id, link}) => {
  return new Promise(resolve => {
    const tags = link.tags;

    commit(types.UPDATE_LINK, {id, link});
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
    const {links, tags} = data;

    commit(types.RESET_TAGS, {tags});
    commit(types.RESET_LINKS, {links});

    resolve();
  });
}

// UI actions
export const showPanel = ({commit}, {name}) => {
  commit(types.SHOW_PANEL, {name});
}

export const hidePanel = ({commit}, {name}) => {
  commit(types.HIDE_PANEL, {name});
}

export const linkQuery = ({commit}, {query}) => {
  return new Promise(resolve => {
    commit(types.LINK_QUERY, {query});

    resolve();
  });
};

export const autosave = ({commit}, {value}) => {
  commit(types.AUTOSAVE, {value});
};

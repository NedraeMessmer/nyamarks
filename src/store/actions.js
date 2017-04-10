import * as types from './mutation-types';

export const addLink = ({commit, dispatch}, {link}) => {
  const tags = link.tags;

  commit(types.ADD_LINK, {link});
  dispatch('addTags', {tags});
}

export const removeLink = ({commit}, {id}) => {
  commit(types.REMOVE_LINK, {id});
}

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

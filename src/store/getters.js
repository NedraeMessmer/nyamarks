export const getLink = state => index => {
  const link = {...state.links.main[index]};

  link.tagString = link.tags.join(' ');

  return link;
}

export const getTaggedLinks = state => tags => {
  if (!tags || tags.length === 0) {
    return [...state.links.main];
  }

  return state.links.main.filter(link => {
    return link.tags.some(val => {
      return tags.indexOf(val) >= 0;
    });
  });
}

export const getMatchingLinks = state => query => {
  query;

  return [...state.links.main];
}

export const getTags = state => () => {
  return state.tags.main;
}

export const getStoreAsJson = state => () => {
  const links = state.links.main;
  const tags = state.tags.main;
  const $tracking = state.tags.$tracking;

  return JSON.stringify({
    links,
    tags,
    $tracking,
  });
}

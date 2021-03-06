export const link = state => id => {
  return state.links.main.find(link => link.id === id);
}

export const taggedLinks = state => tags => {
  if (!tags || tags.length === 0) {
    return state.links.main;
  }

  return state.links.main.filter(link => {
    return link.tags.some(val => {
      return tags.indexOf(val) >= 0;
    });
  });
}

export const matchingLinks = state => query => {
  if (!query) {
    return state.links.main;
  }

  const search = Array.isArray(query) ? query : query.split(' ');

  return state.links.main.filter(link => {
    const hasTag = link.tags.some(val => {
      return search.indexOf(val) >= 0;
    });

    const hasDescription = search.reduce((prev, cur) => {
      const str = cur.toLowerCase();
      const found = link.description.toLowerCase().includes(str);

      return found || prev;
    }, false);

    const hasTitle = search.reduce((prev, cur) => {
      const str = cur.toLowerCase();
      const found = link.name.toLowerCase().includes(str);

      return found || prev;
    }, false);

    return hasTag || hasDescription || hasTitle;
  });
}

export const matchingLinksCount = (state, getters) => query => {
  return getters.matchingLinks(query).length;
}

export const tags = state => state.tags.main;

export const storeAsJson = state => () => {
  const links = state.links;
  const tags = state.tags;

  return JSON.stringify({
    links,
    tags,
  });
}

export const panels = state => state.ui.panels;

export const showPanel = state => name => state.ui.panels[name];

export const linkSearch = state => state.ui.linkSearch;

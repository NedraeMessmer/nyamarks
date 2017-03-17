const linkStore = {
  state: {
    links: [
      {
        name: 'Google',
        url: 'https://google.com',
        description: 'Google Search',
        tags: [
          'search',
          'google',
        ],
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com',
        description: 'Videos',
        tags: [
          'video',
          'google',
          'youtube',
        ],
      },
      {
        name: 'Bing',
        url: 'https://bing.com',
        description: 'Bing Search',
        tags: [
          'search',
          'bing',
          'microsoft',
        ],
      },
      {
        name: 'Mozilla Developer Network',
        url: 'https://developer.mozilla.org',
        description: 'Developers!',
        tags: [
          'search',
          'developer',
          'mozilla',
        ],
      },
    ],
    tags: [
      'search',
      'google',
      'video',
      'youtube',
      'bing',
      'microsoft',
      'developer',
      'mozilla',
    ],
  },

  mutations: {
    addLink(state, {link}) {
      link.tags = link.tags.split(' ');

      return state.links.push(link);
    },

    removeLink(state, {index}) {
      return state.links.splice(index, 1);
    },

    updateLink(state, {index, link}) {
      link.tags = link.tags.split(' ');

      return state.links.splice(index, 1, link);
    },

    loadLinks(state, {links}) {
      return state.links = links;
    },

    addTags(state, {tags}) {
      let normalizedTags;

      if (Array.isArray(tags)) {
        normalizedTags = tags;
      } else {
        normalizedTags = tags.split(' ');
      }

      const missingTags = normalizedTags.filter(cur => {
        return !state.tags.includes(cur);
      });

      return state.tags = state.tags.concat(missingTags);
    },

    removeTags(state, {tags}) {
      let normalizedTags;

      if (Array.isArray(tags)) {
        normalizedTags = tags;
      } else {
        normalizedTags = tags.split(' ');
      }

      return state.tags = state.tags.filter(cur => {
        return !normalizedTags.includes(cur);
      });
    },
  },

  getters: {
    getLink: state => index => {
      const link = {...state.links[index]};

      link.tags = link.tags.join(' ');

      return link;
    },

    getTaggedLinks: (state) => (tags) => {
      if (!tags || tags.length === 0) {
        return [...state.links];
      }

      return state.links.filter((link) => {
        return link.tags.some((val) => {
          return tags.indexOf(val) >= 0;
        });
      });
    },

    getMatchingLinks: state => query => {
      query;

      return [...state.links];
    },
  },
}

export default linkStore;

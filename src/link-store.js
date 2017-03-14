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
  },

  mutations: {
    addLink(state, payload) {
      const link = payload.link;

      link.tags = link.tags.split(' ');

      return state.links.push(link);
    },

    removeLink(state, payload) {
      return state.links.splice(payload.index, 1);
    },

    updateLink(state, payload) {
      return state.links.splice(payload.index, 1, payload.link);
    },

    loadLinks(state, payload) {
      return state.links = payload.links;
    },
  },

  getters: {
    getLink: (state) => (index) => state.links[index],

    getTaggedLinks: (state) => (tags) => {
      if (!tags || tags.length === 0) {
        return state.links;
      }

      return state.links.filter((link) => {
        return link.tags.some((val) => {
          return tags.indexOf(val) >= 0;
        });
      });
    },
  },
}

export default linkStore;

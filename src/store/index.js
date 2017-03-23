export default {
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
      {id: 0, name: 'search'},
      {id: 1, name: 'google'},
      {id: 2, name: 'video'},
      {id: 3, name: 'youtube'},
      {id: 4, name: 'bing'},
      {id: 5, name: 'microsoft'},
      {id: 6, name: 'developer'},
      {id: 7, name: 'mozilla'},
    ],

    // Special tracking of IDs
    $tracking: {
      tags: 7,
    },
  },

  mutations: {
    addLink(state, {link}) {
      const currentLinks = [...state.links];

      return state.links = [...currentLinks, link];
    },

    removeLink(state, {index}) {
      return state.links.splice(index, 1);
    },

    updateLink(state, {index, link}) {
      link.tags = link.tags.split(' ');

      return state.links.splice(index, 1, link);
    },

    loadData(state, {data}) {
      state.links = data.links;
      state.tags = data.tags;
      state.$tracking = data.$tracking;

      return state;
    },

    addTags(state, {tags}) {
      const currentTags = [...state.tags];
      const nextId = state.$tracking.tags;

      if (currentTags.length === 0) {
        return null;
      }

      // Function to check if tag already exists
      function tagExists(tag) {
        const currentTagNames = currentTags.map(cur => cur.name);

        return currentTagNames.includes(tag);
      }

      // Remove duplicates from array
      const newTags = tags.filter((cur, index, self) => {
        return index === self.indexOf(cur);
      });

      // Discard tags that already exist
      const missingTags = newTags.filter(tag => {
        return !tagExists(tag);
      });

      // Build tag objects with IDs
      const tagsWithId = missingTags.reduce((prev, next) => {
        return [
          ...prev,
          {
            name: next,
            id: nextId + 1,
          },
        ];
      }, []);

      // Update tag tracking
      state.$tracking.tags = nextId + tagsWithId.length;

      // Update tags
      state.tags = [...currentTags, ...tagsWithId];

      return state;
    },

    removeTag(state, {id}) {
      return state.tags = state.tags.filter(tag => {
        return tag.id !== id;
      });
    },
  },

  actions: {
    addLink({commit}, {link}) {
      const tags = link.tags;

      commit('addLink', {link});
      commit('addTags', {tags});
    },
  },

  getters: {
    getLink: state => index => {
      const link = {...state.links[index]};

      link.tags = link.tags.join(' ');

      return link;
    },

    getTaggedLinks: state => tags => {
      if (!tags || tags.length === 0) {
        return [...state.links];
      }

      return state.links.filter(link => {
        return link.tags.some(val => {
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

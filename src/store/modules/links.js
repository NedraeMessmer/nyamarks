import * as types from '../mutation-types';

// Initial state
const state = {
  main: [
    {
      name: 'Google',
      url: 'https://google.com',
      description: 'Google Search',
      tags: [
        'google',
        'search',
      ],
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      description: 'Videos',
      tags: [
        'google',
        'video',
        'youtube',
      ],
    },
    {
      name: 'Mozilla Developer Network',
      url: 'https://developer.mozilla.org',
      description: 'Developers!',
      tags: [
        'development',
        'mozilla',
        'search',
      ],
    },
    {
      name: 'Vue.js',
      url: 'https://vuejs.org',
      description: 'The progressive Javascript framework',
      tags: [
        'development',
        'javascript',
        'vue',
        'vuejs',
      ],
    },
    {
      name: 'Devdocs.io',
      url: 'https://devdocs.io',
      description: 'DevDocs API documentation',
      tags: [
        'api',
        'development',
        'documentation',
        'programming',
      ],
    },
  ],
}

// Indexing
state.main = state.main.map(indexLink);

// Tracking IDs
state.$tracking = state.main.length;

const mutations = {
  [types.ADD_LINK](state, {link}) {
    const nextId = state.$tracking || 0;

    const newLink = {
      ...link,
      id: nextId,
    }

    state.$tracking = state.$tracking + 1;

    return state.main.push(newLink);
  },
  [types.REMOVE_LINK](state, {id}) {
    const index = state.main.findIndex(link => link.id === id);

    return state.main.splice(index, 1);
  },
  [types.UPDATE_LINK](state, {id, link}) {
    const index = state.main.findIndex(link => link.id === id);

    return state.main.splice(index, 1, link);
  },
  [types.RESET_LINKS](state, {links}) {
    let indexedLinks;

    if (links.$tracking) {
      state.$tracking = links.$tracking;
      indexedLinks = links.main;
    } else {
      state.$tracking = links.length;
      indexedLinks = links.map(indexLink);
    }

    return state.main = [...indexedLinks];
  },
}

function indexLink(link, index) {
  link.id = index;

  return link;
}

export default {
  state,
  mutations,
}

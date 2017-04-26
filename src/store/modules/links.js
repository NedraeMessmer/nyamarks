import * as types from '../mutation-types';

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
      name: 'Bing',
      url: 'https://bing.com',
      description: 'Bing Search',
      tags: [
        'bing',
        'microsoft',
        'search',
      ],
    },
    {
      name: 'Mozilla Developer Network',
      url: 'https://developer.mozilla.org',
      description: 'Developers!',
      tags: [
        'developer',
        'mozilla',
        'search',
      ],
    },
  ],
}

const mutations = {
  [types.ADD_LINK](state, {link}) {
    return state.main.push(link);
  },
  [types.REMOVE_LINK](state, {index}) {
    return state.main.splice(index, 1);
  },
  [types.UPDATE_LINK](state, {index, link}) {
    return state.main.splice(index, 1, link);
  },
  [types.RESET_LINKS](state, {links}) {
    return state.main = [...links];
  },
}

export default {
  state,
  mutations,
}

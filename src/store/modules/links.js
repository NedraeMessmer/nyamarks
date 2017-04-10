import * as types from '../mutation-types';

const state = {
  main: [
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
}

const mutations = {
  [types.ADD_LINK](state, {link}) {
    return state.main.push(link);
  },
  [types.REMOVE_LINK](state, {index}) {
    return state.main.splice(index, 1);
  },
  [types.UPDATE_LINK](state, {index, link}) {
    link.tags = link.tags.split(' ');

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

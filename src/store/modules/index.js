/* global require:false */
const files = require.context('.', false, /\.js$/)
const modules = {}

function toUpper(s, g) {
  return g.toUpperCase();
}

files.keys().forEach((key) => {
  if (key === './index.js') return;

  const nKey = key
    .replace(/(\.\/|\.js)/g, '')
    .replace(/-([a-z])/gi, toUpper); // kebab-case to camelCase

  modules[nKey] = files(key).default
})

export default modules;

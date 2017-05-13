# nyamarks :hearts:

> Portable offline bookmarks using [vue.js](https://vuejs.org) and [vuex](https://vuex.vuejs.org)

## Features

* Save to and load from JSON. Export your links in one browser, import them in another
* Save to localStorage for persistence
* Autosave optional when adding, deleting or modifying a link
* Search in titles, URLs, descriptions and tags
* Click on a tag for easy filtering by that text

## TODO

* [x] Auto-save to localStorage by default
* [ ] Consolidate styles
* [x] Better Import button
  * [x] Preview file to import (shows # of links)
* [ ] Responsive layout
* [ ] Rework tag system
  * [ ] Deletable tag pills
  * [ ] Autocomplete tags
* [ ] Fuzzy(-ier) searching
* [ ] Maybe extension version (Chrome/Firefox)
  * [ ] Bookmarklet for basic functionality

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

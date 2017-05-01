<template>
  <div id="app">
    <options-panel></options-panel>
    <header-component></header-component>

    <div id="main-view">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>

    <footer-component></footer-component>
  </div>
</template>

<script>
import {version} from '../package.json';

import Header from '@/components/Header.vue';
import Options from '@/components/OptionsPanel.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'app',
  components: {
    'header-component': Header,
    'options-panel': Options,
    'footer-component': Footer,
  },
  data() {
    return {
      showOptions: false,
      env: process.env.NODE_ENV,
      version,
    }
  },
}
</script>

<style lang="scss">
$default-text: rgb(44, 62, 80);
$input-highlight: rgb(64, 0, 192);

$font-stack: Lato, Helvetica, Arial, sans-serif;

body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  color: $default-text;
  font-family: $font-stack;
  padding: 0 15px;
}

#main-view {
  margin-top: 90px;
  margin-bottom: 60px;
}

.wip {
  color: rgb(255, 102, 0);
  font-size: smaller;
  opacity: 0.5;
}

a {
  cursor: pointer;
}

button {
  font-family: $font-stack;
}

input:not([type=file]),
textarea {
  font-family: $font-stack;
  border: 0;
  border-bottom: 2px solid $input-highlight;
  padding: 5px;

  &::placeholder {
    color: mix($default-text, white, 40%);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  position: absolute;
}

.slide-enter {
  transform: translateX(500px);
}

.slide-leave-to {
  transform: translateX(-500px);
}
</style>

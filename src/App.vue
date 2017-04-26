<template>
  <div id="app">
    <options-panel></options-panel>
    <header-component></header-component>
    <div class="main-view">
      <router-view></router-view>
    </div>

    <p class="env">
      env: {{env}} |
      version: {{version}} |
      <a href="https://github.com/NedraeMessmer/nyamarks">Source</a>
    </p>
  </div>
</template>

<script>
import {version} from '../package.json';

import Header from '@/components/Header.vue';
import Options from '@/components/OptionsPanel.vue';

export default {
  name: 'app',
  components: {
    'header-component': Header,
    'options-panel': Options,
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
$default-text: #2c3e50;
$input-highlight: rgb(64, 0, 192);

$font-stack: Lato, Helvetica, Arial, sans-serif;

body {
  margin: 0;
}

#app {
  color: $default-text;
  font-family: $font-stack;
  padding: 0 15px;
}

.main-view {
  margin-top: 90px;
}

.env {
  font-size: smaller;
  opacity: 0.5;
  text-align: right;
}

.wip {
  color: hsla(25, 100%, 50%, 1);
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
</style>

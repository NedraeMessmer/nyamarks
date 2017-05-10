<template>
  <div id="app">
    <side-panel
      class="options-panel"
      name="options"
      position="left">
      <options-form></options-form>
    </side-panel>

    <side-panel
      class="new-link-panel"
      name="newLink"
      position="right">
      <new-link></new-link>
    </side-panel>

    <header-component></header-component>

    <div id="main-view">
      <router-view></router-view>
    </div>

    <footer-component></footer-component>
  </div>
</template>

<script>
import {version} from '../package.json';

import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';
import SidePanel from '@/components/SidePanel.vue';
import NewLink from '@/components/NewLink';
import OptionsForm from '@/components/Options.vue';

export default {
  name: 'app',
  components: {
    HeaderComponent,
    FooterComponent,
    SidePanel,
    NewLink,
    OptionsForm,
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

// Debug classes
.wip {
  color: rgb(255, 102, 0);
  font-size: smaller;
  opacity: 0.5;
}

// Basic elements
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

// Icon overrides
.fa-animated {
  transition: all 0.25s;
}

// Other components
.options-panel {
  // width: 30vw;
}
</style>

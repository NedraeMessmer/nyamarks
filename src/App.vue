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
    }
  },
}
</script>

<style lang="scss">
@import '/styles/variables';

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
    color: $placeholder-text;
  }
}

// Icon overrides
.fa-animated {
  transition: all 0.25s;
}

// Buttons
a.btn,
button {
  background-color: $btn-default-bg;
  border: none;
  border-radius: 2px;
  box-shadow: inset 0 -3px rgba(0, 0, 0, 0.5);
  color: $btn-default-color;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  display: inline-block;
  margin: 2px;
  padding: 5px 8px 8px;
  text-decoration: none;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
  transition: background-color 0.25s ease-in;

  &:hover {
    background-color: $btn-default-hover-bg;
  }

  &.delete {
    background-color: $btn-delete-bg;
    color: $btn-delete-color;

    &:hover {
      background-color: $btn-delete-hover-bg;
    }
  }
}
</style>

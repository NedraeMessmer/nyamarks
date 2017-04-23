<template>
  <div id="app">
    <options-panel></options-panel>
    <header-component></header-component>
    <router-view></router-view>

    <p class="env">
      Env: {{env}} |
      <a href="https://github.com/NedraeMessmer/nyamarks">Source</a>
    </p>
  </div>
</template>

<script>
import log from '@/helpers/log';

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
    }
  },
  created() {
    // Load links from localStorage on startup
    this.loadFromLocalStorage();
  },
  methods: {
    loadFromLocalStorage() {
      const stored = localStorage.getItem('nyamarks');

      if (!stored) {
        log.info('Initializing default links');

        return false;
      }

      const data = JSON.parse(stored);

      log.info('Initializing with stored data');

      return this.$store.dispatch('resetData', {data});
    },
  },
}
</script>

<style scoped>
#app {
  color: #2c3e50;
  font-family: Lato, Helvetica, Arial, sans-serif;
}

.env {
  font-size: smaller;
  opacity: 0.5;
  text-align: right;
}
</style>

<template>
  <div id="app">
    <options-panel></options-panel>
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Options from './components/OptionsPanel.vue';

const info = process.env.NODE_ENV === 'production' ?
  () => {} :
  console.info; // eslint-disable-line

export default {
  name: 'app',
  components: {
    'header-component': Header,
    'options-panel': Options,
  },
  data() {
    return {
      showOptions: false,
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
        info('Initializing default links');

        return false;
      }

      const data = JSON.parse(stored);

      info('Initializing with stored data');

      return this.$store.dispatch('resetData', {data});
    },
  },
}
</script>

<style>
#app {
  color: #2c3e50;
  font-family: Lato, Helvetica, Arial, sans-serif;
}
</style>

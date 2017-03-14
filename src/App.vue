<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'header-component': Header,
  },
}
</script>

<style>
#app {
  color: #2c3e50;
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>

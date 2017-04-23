<template>
  <div id="header">
    <div>
      <h2>
        <router-link to="/">nyamarks</router-link>
        <span class="toggle-options" @click="showOptions()">
          options
          <span class="wip">(WIP)</span>
        </span>
      </h2>
    </div>
    <div>
      <p>Portable bookmarks</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'header',
  methods: {
    ...mapActions([
      'showOptions',
    ]),
  },
}
</script>

<style scoped lang="scss">
#header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  text-align: center;

  > div {
    width: 20%;
  }

  h2 a {
    color: rgba(64, 0, 192, 0.6);
    text-decoration: none;
  }

  .toggle-options {
    cursor: pointer;
    font-size: smaller;
    opacity: 0.2;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>

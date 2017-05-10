<template>
  <header>
    <div class="title">
      <h2>
        <router-link to="/">nyamarks</router-link>
        <a class="toggle-options" @click="showOptions">
          options
          <span class="wip">(WIP)</span>
        </a>
      </h2>
    </div>
    <div class="subtitle">
      <p>
        <a @click="showNewLink">
          <span class="fa fa-fw fa-plus"></span>
          Add new link
        </a>
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showOptions() {
      return this.$store.dispatch('showPanel', {name: 'options'});
    },
    showNewLink() {
      return this.$store.dispatch('showPanel', {name: 'newLink'});
    },
  },
}
</script>

<style scoped lang="scss">
header {
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  display: flex;
  height: 60px;
  justify-content: space-between;
  left: 0;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  position: fixed;
  top: 0;
  width: calc(100% - 30px);
  z-index: 3;

  > div {
    width: 30vw;
  }

  > .title {
    text-align: left;
  }

  > .subtitle {
    text-align: right;
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

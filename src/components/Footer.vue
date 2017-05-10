<template>
  <footer>
    <p class="by">
      By <a href="https://github.com/NedraeMessmer" target="_blank">Nedrae</a> |
      <a href="https://github.com/NedraeMessmer/nyamarks" target="_blank">
        <span class="fa fa-fw fa-github"></span>
      </a>
      <a href="https://gitgud.io/Nedrae/nyamarks" target="_blank">
        <span class="fa fa-fw fa-gitlab"></span>
      </a> |
      powered by <a href="https://vuejs.org" target="_blank">vue.js {{vueVersion}}</a>
    </p>

    <p class="env">
      version: {{appVersion}}
      {{env === 'development' ? 'DEV' : null}}
    </p>
  </footer>
</template>

<script>
import {version as appVersion} from '@/../package.json';
import {version as vueVersion} from 'vue/package.json';

export default {
  name: 'footer',
  data() {
    return {
      env: process.env.NODE_ENV,
      appVersion,
      vueVersion,
    }
  },
}
</script>

<style scoped lang="scss">
footer {
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 2px solid rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  font-size: smaller;
  height: 40px;
  justify-content: space-between;
  left: 0;
  padding-left: 15px;
  padding-right: 15px;
  position: fixed;
  width: calc(100% - 30px);
  z-index: 3;

  > * {
    margin: 0;
    opacity: 0.5;
    transition: opacity 0.25s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

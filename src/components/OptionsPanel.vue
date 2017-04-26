<template>
  <div id="options-panel">
    <transition name="open">
      <div class="overlay" v-show="showOptions" @click="dismiss()"></div>
    </transition>
    <transition name="open">
      <div class="options-content" v-show="showOptions">
        <h2>Options</h2>

        <h3>Save/load</h3>

        <div class="local-storage">
          <h4>localStorage</h4>

          <div class="actions">
            <button v-on:click="saveToLocalStorage">Save</button>
            <button v-on:click="loadFromLocalStorage">Load</button>
            <button v-on:click="clearLocalStorage">Clear</button>
          </div>
        </div>

        <div class="file-storage">
          <h4>File</h4>

          <div class="actions">
            <button v-on:click="saveToFile">Save</button>

            <div class="fileForm">
              <input ref="loadFile" type="file" accept="application/json,.json">
              <br>
              <button v-on:click="loadFromFile">Load</button>
            </div>
          </div>
        </div>

        <div>
          <label>
            <input type="checkbox">
            Automatically save links to localStorage
            <span class="wip">(WIP)</span>
          </label>
        </div>

        <button type="button" @click="dismiss()">
          Close
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import log from '@/helpers/log';

export default {
  name: 'options-panel',
  computed: {
    ...mapState({
      showOptions: state => state.ui.showOptions,
    }),
  },
  created() {
    // Load links from localStorage on startup
    this.loadFromLocalStorage();
  },
  methods: {
    dismiss() {
      return this.$store.dispatch('hideOptions');
    },

    saveToLocalStorage() {
      const json = this.$store.getters.storeAsJson();

      return localStorage.setItem('nyamarks', json);
    },

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

    clearLocalStorage() {
      return localStorage.removeItem('nyamarks');
    },

    saveToFile() {
      const json = this.$store.getters.storeAsJson();
      const trigger = document.createElement('a');
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      trigger.setAttribute('download', 'nyamarks.json');
      trigger.setAttribute('href',
        `data:application/json;charset=utf-8,${encodeURIComponent(json)}`);

      return trigger.dispatchEvent(event);
    },

    loadFromFile() {
      const file = this.$refs.loadFile.files[0];
      const contents = new FileReader();
      const form = document.forms.loadLinks;

      contents.onload = event => {
        const data = JSON.parse(event.target.result);

        this.$store.dispatch('resetData', {data});

        return form.reset();
      };

      contents.readAsText(file);
    },

  },
}
</script>

<style scoped lang="scss">
// Transitions
.open-enter-active,
.open-leave-active {
  &.overlay {
    transition: opacity 0.25s;
  }
  &.options-content {
    transition: transform 0.25s;
  }
}

.open-enter,
.open-leave-to {
  &.overlay {
    opacity: 0;
  }
  &.options-content {
    transform: translateX(-30vw);
  }
}

// Layout
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.options-content {
  background-color: white;
  box-shadow: 0 0 10px black;
  box-sizing: border-box;
  height: 100%;
  left: 0;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 30vw;
  z-index: 6;
}

.local-storage,
.file-storage {
  align-content: flex-start;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;

  > h4 {
    margin: 0;
  }

  button, input {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

.file-storage > h4 {
  align-self: flex-start;
}
</style>

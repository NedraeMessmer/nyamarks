<template>
  <div id="options">
    <div class="options-header">
      <h2>Options</h2>
    </div>

    <h3>Save/load</h3>

    <div class="local-storage">
      <h4>localStorage</h4>

      <div class="actions">
        <button @click="saveToLocalStorage">Save</button>
        <button @click="loadFromLocalStorage">Load</button>
        <button @click="clearLocalStorage">Clear</button>
      </div>
    </div>

    <div class="file-storage">
      <h4>File</h4>

      <div class="actions">
        <button @click="saveToFile">Save</button>

        <div class="fileForm">
          <input ref="loadFile" type="file" accept="application/json,.json">
          <br>
          <button @click="loadFromFile">Load</button>
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
  </div>
</template>

<script>
import log from '@/helpers/log';

export default {
  name: 'options',
  created() {
    // Load links from localStorage on startup
    this.loadFromLocalStorage();
  },
  methods: {
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

      contents.onload = event => {
        const data = JSON.parse(event.target.result);

        return this.$store.dispatch('resetData', {data})
          .then(() => {
            this.$refs.loadFile.value = null;
          });
      };

      contents.readAsText(file);
    },

  },
}
</script>

<style scoped lang="scss">
.options-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
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

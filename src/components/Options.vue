<template>
  <div id="options">
    <div class="options-header">
      <h2>Options</h2>
    </div>

    <h3>Save/load</h3>

    <div class="local-storage">
      <h4>
        <span>localStorage</span>

        <label>
          <input type="checkbox" v-model="autosave">
          Auto-save
        </label>
      </h4>

      <div class="actions">
        <button @click="saveToLocalStorage" v-show="!autosave">
          <span class="fa fa-fw fa-download"></span>
          Save
        </button>
        <button @click="loadFromLocalStorage" v-show="!autosave">
          <span class="fa fa-fw fa-upload"></span>
          Load
        </button>
        <button @click="clearLocalStorage" title="Clear localStorage">
          <span class="fa fa-fw fa-trash"></span>
          Clear
        </button>
      </div>
    </div>

    <div class="file-storage">
      <h4>File</h4>

      <div class="actions">
        <button @click="saveFile">
          <span class="fa fa-fw fa-download"></span>
          Export
        </button>

        <div class="fileForm">
          <input
            ref="loadFile"
            type="file"
            accept="application/json,.json"
            v-on:change="readFile">
          <button @click="loadFile">
            <span class="fa fa-fw fa-upload"></span>
            Import
          </button>
        </div>
      </div>

      <modal-dialog
        name="importPreview"
        title="Import links"
        :on-dismiss="cancelImport"
        ok-text="Import"
        :on-ok="importData">
        <div>
          <p>You are about to import <strong>{{fileSummary.links.length}}</strong> links from <strong>{{selectedFilename}}</strong></p>
          <p>Importing links will overwrite your current list of links.</p>
        </div>
      </modal-dialog>

      <modal-dialog
        name="importError"
        title="Error!"
        cancel-text="Dismiss"
        :on-dismiss="cancelImport">
        <div>
          <p>Your file is malformed!</p>
          <p>Please verify that the file you selected was exported from <strong>nyamarks</strong>.</p>
        </div>
      </modal-dialog>
    </div>
  </div>
</template>

<script>
import log from '@/helpers/log';
import ModalDialog from '@/components/Modal';

export default {
  name: 'options',
  components: {
    ModalDialog,
  },
  data() {
    return {
      selectedFile: null,
      selectedFilename: '',
      fileSummary: {
        links: [],
      },
    }
  },
  created() {
    // Load links from localStorage on startup
    this.loadFromLocalStorage();

    // Clear file info
    this.clearLoadedFile();
  },
  computed: {
    autosave: {
      get() {
        return this.$store.state.ui.autosave;
      },

      set: function(value) {
        return this.$store.dispatch('autosave', {value});
      },
    },
  },
  methods: {
    saveToLocalStorage() {
      const json = this.$store.getters.storeAsJson();

      return localStorage.setItem('nyamarks', json);
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('nyamarks');
      const autosave = localStorage.getItem('autosave');

      // Set autosave for the app
      if (autosave) {
        const value = JSON.parse(autosave);

        this.$store.dispatch('autosave', {value});
      }

      if (!stored) {
        log.info('Initializing default links');

        return false;
      }

      const data = JSON.parse(stored);

      log.info('Initializing with stored data');

      // Hydrate with the data
      this.$store.dispatch('resetData', {data});
    },

    clearLocalStorage() {
      return localStorage.removeItem('nyamarks');
    },

    saveFile() {
      const json = this.$store.getters.storeAsJson();
      const trigger = document.createElement('a');
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      trigger.setAttribute('download', 'nyamarks.json');
      trigger.setAttribute('href',
        `data:application/json;charset=utf-8,${encodeURIComponent(json)}`);

      return trigger.dispatchEvent(event);
    },

    loadFile() {
      const input = this.$refs.loadFile;
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      input.dispatchEvent(event);
    },

    readFile() {
      const file = this.$refs.loadFile.files[0];
      const contents = new FileReader();

      contents.onload = event => {
        const data = JSON.parse(event.target.result);

        // Cheap validation
        if (!(data && data.links && data.links.main)) {
          this.$store.dispatch('showModal', {name: 'importError'});

          return false;
        }

        this.selectedFile = data;
        this.selectedFilename = file.name;

        this.fileSummary = {
          links: data.links.main,
        };

        this.$store.dispatch('showModal', {name: 'importPreview'});
      };

      contents.readAsText(file);
    },

    importData() {
      const data = this.selectedFile;

      return this.$store.dispatch('resetData', {data})
        .then(() => {
          this.$refs.loadFile.value = null;
          this.clearLoadedFile();

          // Autosave
          if (this.$store.state.ui.autosave) {
            this.saveToLocalStorage();
          }
        });
    },

    cancelImport() {
      this.$refs.loadFile.value = null;
      this.clearLoadedFile();
    },

    clearLoadedFile() {
      this.selectedFile = null;
      this.selectedFilename = '';

      this.fileSummary = {
        links: [],
      };
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
  h4 {
    align-items: center;
    display: flex;
    justify-content: space-between;

    label {
      font-size: 0.7em;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;

    > * {
      display: block;
    }
  }
}

.file-storage input[type=file] {
  display: none;
}
</style>

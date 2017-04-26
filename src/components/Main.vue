<template>
  <div id="main">
    <h1>{{welcome}}</h1>

    <form class="newLink" name="newLink" v-on:submit.prevent="addLink">
      <h2>Add new link</h2>

      <p><input placeholder="Name" v-model.trim="newLink.name"></p>
      <p><input placeholder="URL (required)" v-model.trim="newLink.url" required></p>
      <p><input placeholder="Tags (space-delimited)" v-model.trim="newLink.tags"></p>
      <p>
        <textarea placeholder="Description" v-model.trim="newLink.description"></textarea>
      </p>

      <button type="submit">Add link</button>
    </form>

    <link-list></link-list>

    <div>
      <a class="wip" v-on:click="debugToggleTags">
        Toggle tags (WIP)
      </a>
    </div>
    <div v-show="debugTags">
      <div>
        <h3>Current tags <span class="wip">(WIP)</span></h3>

        <tag-list></tag-list>
      </div>
    </div>

    <div>
      <h3>Save/load</h3>

      <button v-on:click="saveToDisk">Save to disk</button>
      <button v-on:click="saveToLocalStorage">Save to localStorage</button>

      <form name="loadLinks" v-on:submit.prevent>
        <input ref="loadFile" type="file" accept="application/json,.json">
        <button v-on:click="loadFromDisk">Load links</button>
        <button v-on:click="loadFromLocalStorage">Load from localStorage</button>
        <button v-on:click="clearLocalStorage">Clear localStorage</button>
      </form>
    </div>
  </div>
</template>

<script>
import linkList from '@/components/LinkList';
import tagList from '@/components/TagList';

const newLink = {
  name: '',
  url: '',
  tags: '',
  description: '',
};

export default {
  name: 'Main',
  data() {
    return {
      welcome: 'Welcome to nyamarks',
      newLink: {...newLink},
      fileLoad: null,
      debugTags: false,
    }
  },
  methods: {
    addLink() {
      const link = {...this.newLink};
      const form = document.forms.newLink;

      // Normalize tags
      if (link.tags === '') {
        link.tags = [];
      } else {
        link.tags = link.tags.split(' ');
      }

      // Reset form
      form.reset();
      this.newLink = {...newLink};

      this.$store.dispatch('addLink', {link});
    },

    saveToDisk() {
      const json = this.$store.getters.storeAsJson();
      const trigger = document.createElement('a');
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      trigger.setAttribute('download', 'nyamarks.json');
      trigger.setAttribute('href',
        `data:application/json;charset=utf-8,${encodeURIComponent(json)}`);

      return trigger.dispatchEvent(event);
    },

    loadFromDisk() {
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

    saveToLocalStorage() {
      const json = this.$store.getters.storeAsJson();

      return localStorage.setItem('nyamarks', json);
    },

    loadFromLocalStorage() {
      const json = localStorage.getItem('nyamarks');

      if (!json) {
        return false;
      }

      const data = JSON.parse(json);

      return this.$store.dispatch('resetData', {data});
    },

    clearLocalStorage() {
      return localStorage.removeItem('nyamarks');
    },

    debugToggleTags() {
      return this.debugTags = !this.debugTags;
    },
  },
  components: {
    linkList,
    tagList,
  },
}
</script>

<style scoped lang="scss">
#main {
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

.newLink {
  input, textarea {
    width: 25vw;
  }
}
</style>

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

    <div>
      <h3>Current links</h3>

      <link-list></link-list>
    </div>

    <div>
      <h3>Current tags</h3>

      <tag-list></tag-list>
    </div>

    <div>
      <button v-on:click="saveToDisk">Save to disk</button>
      <button v-on:click="saveToLocalStorage">Save to localStorage</button>

      <form name="loadLinks" v-on:submit.prevent>
        <input id="file" type="file" accept="application/json,.json">
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
    }
  },
  computed: {
    allTags() {
      return this.$store.state.tags;
    },
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

      this.$store.dispatch({
        type: 'addLink',
        link,
      });
    },

    stringifyData(state) {
      const {links, tags, $tracking} = state;
      const data = {
        links,
        tags,
        $tracking,
      };

      return JSON.stringify(data);
    },

    saveToDisk() {
      const json = this.stringifyData(this.$store.state);
      const trigger = document.createElement('a');
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      trigger.setAttribute('download', 'nyamarks.json');
      trigger.setAttribute('href',
        `data:application/json;charset=utf-8,${encodeURIComponent(json)}`);

      return trigger.dispatchEvent(event);
    },

    loadFromDisk() {
      const file = Array.from(document.querySelectorAll('#file'))[0].files[0];
      const contents = new FileReader();
      const form = document.forms.loadLinks;

      contents.onload = event => {
        const data = JSON.parse(event.target.result);

        this.$store.commit({
          type: 'loadData',
          data,
        });

        return form.reset();
      };

      contents.readAsText(file);
    },

    saveToLocalStorage() {
      const json = this.stringifyData(this.$store.state);

      return localStorage.setItem('nyamarks', json);
    },

    loadFromLocalStorage() {
      const json = localStorage.getItem('nyamarks');

      if (!json) {
        return false;
      }

      const data = JSON.parse(json);

      return this.$store.commit({
        type: 'loadData',
        data,
      });
    },

    clearLocalStorage() {
      return localStorage.removeItem('nyamarks');
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

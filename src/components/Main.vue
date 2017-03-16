<template>
  <div id="main">
    <h1>{{welcome}}</h1>

    <form class="newLink" name="newLink" v-on:submit.prevent="addLink">
      <h2>Add new link</h2>

      <p><input placeholder="Name" v-model="newLink.name"></p>
      <p><input placeholder="URL (required)" v-model="newLink.url" required></p>
      <p><input placeholder="Tags (space-delimited)" v-model="newLink.tags"></p>
      <p>
        <textarea placeholder="Description" v-model="newLink.description"></textarea>
      </p>

      <button type="submit">Add link</button>
    </form>

    <div>
      <h3>Current links</h3>

      <link-list></link-list>
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

export default {
  name: 'Main',
  data() {
    return {
      welcome: 'Welcome to nyamarks',
      newLink: {},
      fileLoad: null,
    }
  },
  methods: {
    addLink() {
      const link = {...this.newLink};
      const form = document.forms.newLink;

      form.reset();

      return this.$store.commit({
        type: 'addLink',
        link,
      });
    },

    saveToDisk() {
      const links = JSON.stringify(this.$store.state.links);
      const trigger = document.createElement('a');
      const event = new MouseEvent('click', {bubbles: true, cancelable: true});

      trigger.setAttribute('download', 'nyamarks.json');
      trigger.setAttribute('href',
        `data:application/json;charset=utf-8,${encodeURIComponent(links)}`);

      return trigger.dispatchEvent(event);
    },

    loadFromDisk() {
      const file = Array.from(document.querySelectorAll('#file'))[0].files[0];
      const contents = new FileReader();
      const form = document.forms.loadLinks;

      contents.onload = (event) => {
        const links = JSON.parse(event.target.result);

        this.$store.commit({
          type: 'loadLinks',
          links,
        });

        return form.reset();
      };

      contents.readAsText(file);
    },

    saveToLocalStorage() {
      const links = JSON.stringify(this.$store.state.links);

      return localStorage.setItem('nyamarks', links);
    },

    loadFromLocalStorage() {
      const json = localStorage.getItem('nyamarks');

      if (!json) {
        return false;
      }

      const links = JSON.parse(json);

      return this.$store.commit({
        type: 'loadLinks',
        links,
      });
    },

    clearLocalStorage() {
      return localStorage.removeItem('nyamarks');
    },
  },
  components: {
    linkList,
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

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <form name="newLink" v-on:submit="addLink">
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

      <ul class="link-list">
        <li v-for="(link, index) in links">
          <a v-bind:href="link.url">{{ link.name }}</a>
          <span class="small">{{ link.description }}</span>
          <button v-on:click="removeLink(index)">Remove</button>
        </li>
      </ul>
    </div>

    <div>
      <h3>Links with tag 'search'</h3>
      <ul class="link-list">
        <li v-for="(link, index) in filteredLinks">
          <a v-bind:href="link.url">{{ link.name }}</a>
          <span class="small">{{ link.description }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h3>Single link (2)</h3>
      <p>
        <a v-bind:href="singleLink.url">{{ singleLink.name }}</a>
        <span class="small">{{ singleLink.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const emptyLink = {
  name: '',
  url: '',
  description: '',
};

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to nyamarks',
      newLink: {...emptyLink},
    }
  },
  computed: {
    singleLink() {
      return this.$store.getters.getLink(2);
    },

    filteredLinks() {
      return this.$store.getters.getTaggedLinks(['search']);
    },

    ...mapState([
      'links',
    ]),
  },
  methods: {
    addLink() {
      const link = {...this.newLink};

      this.newLink = {...emptyLink};

      return this.$store.commit({
        type: 'addLink',
        link,
      });
    },

    removeLink(index) {
      return this.$store.commit({
        type: 'removeLink',
        index,
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: rgb(255, 0, 192);
  cursor: pointer;
}

.link-list {
  text-align: left;
}
</style>

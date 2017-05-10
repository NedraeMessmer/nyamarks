<template>
  <form class="edit-link" name="editLink" @submit.prevent="updateLink">
    <h2 class="link-name">
      <span>Editing link {{id}}:</span><br>
      {{name}}
    </h2>

    <p><input placeholder="Name" v-model.trim="link.name"></p>
    <p><input placeholder="URL (required)" v-model.trim="link.url" required></p>
    <p><input placeholder="Tags (space-delimited)" v-model.trim="link.tags"></p>
    <p>
      <textarea placeholder="Description" v-model.trim="link.description"></textarea>
    </p>

    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  name: 'EditLink',
  props: ['id'],
  computed: {
    link() {
      const link = this.$store.getters.link(this.id);
      const {name, url, tags, description} = link;

      return {
        name,
        url,
        tags: tags.join(' '),
        description,
      };
    },
    name() {
      return this.link.name;
    },
  },
  methods: {
    updateLink() {
      const link = {...this.link};
      const id = this.id;

      // Normalize tags
      if (link.tags === '') {
        link.tags = [];
      } else {
        link.tags = link.tags.replace(/\s+/, ' ').split(' ').sort();
      }

      this.$store.dispatch('updateLink', {id, link})
      .then(() => {
        // Autosave
        if (this.$store.state.ui.autosave) {
          const json = this.$store.getters.storeAsJson();

          localStorage.setItem('nyamarks', json);
        }

        // Emit event
        this.$emit('update-link', link);
      });
    },
  },
}
</script>

<style scoped lang="scss">
.edit-link {
  h2 span {
    font-size: 0.6em;
    font-weight: normal;
    opacity: 0.7;
  }

  input, textarea {
    width: 25vw;
  }

  button {
    background-color: rgb(64, 0, 192);
    border: none;
    border-radius: 2px;
    box-shadow: inset 0 -3px rgba(0, 0, 0, 0.5);
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    margin: 2px;
    padding: 5px 8px 8px;
    text-decoration: none;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: mix(rgb(64, 0, 192), white, 50%);
    }
  }
}
</style>

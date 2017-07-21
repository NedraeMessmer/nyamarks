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

    <button type="submit">
      <span class="fa fa-fw fa-check"></span>
      Save
    </button>
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
}
</style>

<template>
  <div id="edit-link">
    <form class="edit-link-form" name="editLink" @submit.prevent="updateLink">
      <h4>Edit link {{id}}:</h4>
      <h2>{{name}}</h2>

      <p><input placeholder="Name" v-model.trim="link.name"></p>
      <p><input placeholder="URL (required)" v-model.trim="link.url" required></p>
      <p><input placeholder="Tags (space-delimited)" v-model.trim="link.tags"></p>
      <p>
        <textarea placeholder="Description" v-model.trim="link.description"></textarea>
      </p>

      <button type="submit">Update link</button>
    </form>

  </div>
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
        this.$emit('update-link', link);
      });
    },
  },
}
</script>

<style scoped lang="scss">
#edit-link {
  h2 {
    font-weight: normal;
  }

  input, textarea {
    width: 25vw;
  }
}

.edit-link-form {
  text-align: center;
}

.linkId {
  opacity: 0.5;
}
</style>

<template>
  <div id="edit-link">
    <div>
      <router-link :to="{name: 'Main'}">
        ← Return
      </router-link>
    </div>

    <form class="edit-link-form" name="editLink" @submit.prevent="updateLink">
      <h4>Edit link:</h4>
      <h2>
        <strong>{{link.name}}</strong>
        <small class="linkId">{{id}}</small>
      </h2>

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
      const {id, name, url, tags, description} = link;

      return {
        id,
        name,
        url,
        tags: tags.join(' '),
        description,
      };
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
        this.$router.push({name: 'Main'});
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

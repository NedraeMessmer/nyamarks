<template>
  <div id="edit-link">
    <div>
      <router-link v-bind:to="{name: 'Main'}">
        ← Return
      </router-link>
    </div>

    <form class="edit-link-form" name="editLink" v-on:submit.prevent="updateLink">
      <h2>Edit link: {{link.name}}</h2>

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
      return this.$store.getters.link(this.id);
    },
  },
  methods: {
    updateLink() {
      const link = {...this.link};

      this.$store.dispatch('updateLink', {
        id: this.id,
        link,
      })
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
}

.edit-link-form {
  text-align: center;
}
</style>

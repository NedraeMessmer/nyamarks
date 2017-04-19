<template>
  <div class="tag-list-container">
    <div class="tag-list">
      <tag-pill
        v-for="tag in tags"
        v-bind:tagname="tag.name"
        v-bind:key="tag.id"
        v-bind:deletable="true"
        v-on:delete-pill="removeTag(tag.id)"
        ></tag-pill>
    </div>

    <form v-on:submit.prevent="addTags">
      <input v-model.trim="newTags" placeholder="Tags">
      <button type="submit">Add tags</button>
    </form>
  </div>
</template>

<script>
import tagPill from '@/components/TagPill';
import {mapGetters} from 'vuex';

export default {
  name: 'TagList',
  data() {
    return {
      newTags: '',
    }
  },
  computed: {
    ...mapGetters([
      'tags',
    ]),
  },
  methods: {
    addTags() {
      if (this.newTags === '') {
        return false;
      }

      const tags = this.newTags.split(' ');

      this.newTags = '';

      return this.$store.commit({
        type: 'addTags',
        tags,
      });
    },

    removeTag(id) {
      return this.$store.dispatch({
        type: 'removeTag',
        id,
      });
    },
  },
  components: {
    tagPill,
  },
}
</script>

<style scoped>
</style>

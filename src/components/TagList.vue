<template>
  <div class="tag-list-container">
    <div class="tag-list">
      <tag-pill
        v-for="tag in tags"
        :tagname="tag.name"
        :key="tag.id"
        :deletable="true"
        @delete-pill="removeTag(tag.id)"
        ></tag-pill>
    </div>

    <form @submit.prevent="addTags">
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

      return this.$store.dispatch('addTags', {tags});
    },

    removeTag(id) {
      return this.$store.dispatch('removeTag', {id});
    },
  },
  components: {
    tagPill,
  },
}
</script>

<style scoped>
</style>

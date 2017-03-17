<template>
  <div class="tag-list-container">
    <div class="tag-list">
      <tag-pill
        v-for="(tag, index) in tags"
        v-bind:tagname="tag"
        v-bind:key="index"
        v-bind:deletable="true"
        v-on:delete-pill="removeTag([tag])"
        ></tag-pill>
    </div>

    <p>
      <input v-model="newTags" placeholder="Tags">
      <button v-on:click="addTags">Add tags</button>
    </p>
  </div>
</template>

<script>
// import {mapState} from 'vuex';
import tagPill from '@/components/TagPill';

export default {
  name: 'TagList',
  data() {
    return {
      newTags: '',
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags;
    },
  },
  methods: {
    addTags() {
      const tags = this.newTags.split(' ');

      return this.$store.commit({
        type: 'addTags',
        tags,
      });
    },

    removeTag(tags) {
      return this.$store.commit({
        type: 'removeTags',
        tags,
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

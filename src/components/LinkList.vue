<template>
  <div class="link-list-container">
    <div class="link-list-filters">
      <p><input v-model.lazy="search" placeholder="Search..."></p>
    </div>

    <div class="link-list">
      <link-item
        v-for="(link, index) in filteredLinks"
        v-bind:link="link"
        v-bind:key="index"
        v-bind:link-id="index"></link-item>
    </div>
  </div>
</template>

<script>
import linkItem from '@/components/LinkItem';

export default {
  name: 'LinkList',
  data() {
    return {
      search: null,
    }
  },
  computed: {
    filteredLinks() {
      const searchTags = (this.search && this.search.split(' ')) || null;

      return this.$store.getters.getTaggedLinks(searchTags);
    },
  },
  components: {
    linkItem,
  },
}
</script>

<style scoped>
</style>

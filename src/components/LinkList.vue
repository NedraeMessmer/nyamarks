<template>
  <div class="link-list-container">
    <div class="link-list-filters">
      <p>
        <input v-model.trim="search" placeholder="Search title, description, tag">
      </p>
    </div>

    <div class="link-list">
      <link-item
        v-for="(link, index) in matchingLinks(this.search)"
        v-bind:link="link"
        v-bind:key="index"
        v-bind:link-id="index"
        v-on:delete-link="removeLink(index)"></link-item>
    </div>
  </div>
</template>

<script>
import linkItem from '@/components/LinkItem';
import {mapGetters} from 'vuex';

export default {
  name: 'LinkList',
  data() {
    return {
      search: null,
    }
  },
  computed: {
    ...mapGetters([
      'matchingLinks',
    ]),
  },
  methods: {
    removeLink(index) {
      return this.$store.dispatch('removeLink', {index});
    },
  },
  components: {
    linkItem,
  },
}
</script>

<style scoped>
input {
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-size: larger;
  width: 30vw;
}
</style>

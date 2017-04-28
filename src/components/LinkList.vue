<template>
  <div class="link-list-container">
    <div class="link-list-header">
      <h2>Your links</h2>

      <div class="link-list-filter">
        <input v-model.trim="search" placeholder="Search title, description, tag">
      </div>
    </div>

    <div class="link-list">
      <link-item
        v-for="(link, index) in matchingLinks(this.search)"
        :link="link"
        :key="index"
        :link-id="index"
        @delete-link="removeLink(index)"></link-item>
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

<style scoped lang="scss">
.link-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  margin: 0 auto;
  text-align: left;

  > * {
    flex: 1 1 auto;
  }

  .link-list-title {
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .link-list-filter {
    text-align: right;

    > input {
      width: 85%;
      font-size: larger;
    }
  }
}
</style>

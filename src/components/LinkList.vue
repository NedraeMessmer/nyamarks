<template>
  <div class="link-list-container">
    <div class="link-list-header">
      <h2>Your links</h2>

      <div class="link-list-filter">
        <input class="query" v-model.trim="search" placeholder="Search title, description, tag">
        <button class="search" type="button" @click="clearSearch()">X</button>
      </div>
    </div>

    <div class="link-list">
      <transition-group name="slide-fade">
        <link-item
          v-for="(link, index) in matchingLinks(this.search)"
          :link="link"
          :key="index"
          :link-id="index"
          @delete-link="removeLink(index)"></link-item>
      </transition-group>
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
      'linkSearch',
    ]),
  },
  watch: {
    linkSearch(next) {
      this.search = next;
    },
  },
  methods: {
    clearSearch() {
      this.search = null;
      // return this.$store.dispatch('linkQuery', {query: null});
    },
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
.link-list-container {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.link-list-header {
  width: 40vw;
}

.link-list-title {
  margin-bottom: 5px;
  margin-top: 5px;
}

.link-list-filter {
  text-align: right;

  > .query {
    width: 85%;
  }

  > .search {
    background-color: rgb(192, 0, 64);
    border-radius: 6px;
    border: 0;
    color: white;
    cursor: pointer;
    font-weight: bold;
    height: 24px;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
    width: 24px;
  }
}

.link-list {
  width: 90vw;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30vw);
}
</style>

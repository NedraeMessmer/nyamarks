<template>
  <div class="link-list-container">
    <div class="link-list-header">
      <h2>
        Your links
        <small>({{linkSummary}})</small>
      </h2>

      <div class="link-list-filter">
        <input
          class="query"
          placeholder="Search title, description, tag"
          :value="search"
          @keyup="runQuery">
        <button class="search" type="button" @click="clearSearch()">X</button>
      </div>
    </div>

    <div class="link-list">
      <transition-group name="fold" appear tag="div">
        <div
          class="link-item-wrap"
          v-for="link in matchingLinks(this.search)"
          :key="link">
          <link-item
            :link="link"
            @delete-link="removeLink({id: link.id})"></link-item>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {throttle} from 'lodash';

import linkItem from '@/components/LinkItem';

export default {
  name: 'LinkList',
  data() {
    return {
      search: null,
    }
  },
  computed: {
    ...mapGetters([
      'linkSearch',
      'matchingLinks',
      'matchingLinksCount',
    ]),
    linkSummary() {
      const total = this.$store.state.links.main.length;
      const matching = this.matchingLinksCount(this.search);

      if (total === matching) {
        return `${total}`;
      }

      return `${matching} / ${total}`;
    },
  },
  watch: {
    linkSearch(next) {
      this.search = next;
    },
  },
  methods: {
    ...mapActions([
      'removeLink',
    ]),
    clearSearch() {
      return this.$store.dispatch('linkQuery', {query: null});
    },
    runQuery: throttle(function(event) {
      const query = event.target.value;

      return this.$store.dispatch('linkQuery', {query});
    }, 500),
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
  perspective: 3000px;
  width: 90vw;
}

.link-item-wrap {
  position: relative;
  transition: all 0.25s;
  width: 100%;
}

.fold-leave-active {
  position: absolute;
  transform-origin: top center;
}

.fold-enter,
.fold-leave-to {
  opacity: 0;
  transform: rotate3d(1, 0, 0, -90deg);
}
</style>

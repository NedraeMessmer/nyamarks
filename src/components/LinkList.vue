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
          v-model="linkSearch">
        <button
          class="clear-search"
          type="button"
          @click="clearSearch()">
          <span class="fa fa-fw fa-times"></span>
        </button>
      </div>
    </div>

    <div class="link-list">
      <transition-group name="fold" appear tag="div">
        <div
          class="link-item-wrap"
          v-for="link in matchingLinks(this.linkSearch)"
          :key="link">
          <link-item
            :link="link"
            @edit-link="editLink(link.id)"
            @delete-link="removeLink({id: link.id})"></link-item>
        </div>
      </transition-group>
    </div>

    <side-panel
      class="edit-link-panel"
      name="editLink"
      position="right">
      <edit-link
        v-if="linkToEdit != null"
        :id="linkToEdit"
        @update-link="doneEditLink"></edit-link>
    </side-panel>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {throttle} from 'lodash';

import SidePanel from '@/components/SidePanel';
import EditLink from '@/components/EditLink';
import LinkItem from '@/components/LinkItem';

export default {
  name: 'LinkList',
  components: {
    SidePanel,
    EditLink,
    LinkItem,
  },
  data() {
    return {
      search: null,
      linkToEdit: null,
    }
  },
  computed: {
    ...mapGetters([
      'matchingLinks',
      'matchingLinksCount',
    ]),
    linkSearch: {
      get() {
        return this.$store.getters.linkSearch;
      },

      set: throttle(function(query) {
        this.$store.dispatch('linkQuery', {query});
      }, 500),
    },
    linkSummary() {
      const total = this.$store.state.links.main.length;
      const matching = this.matchingLinksCount(this.linkSearch);

      if (total === matching) {
        return `${total}`;
      }

      return `${matching} / ${total}`;
    },
  },
  methods: {
    removeLink({id}) {
      this.$store.dispatch('removeLink', {id});

      // Autosave
      if (this.$store.state.ui.autosave) {
        const json = this.$store.getters.storeAsJson();

        localStorage.setItem('nyamarks', json);
      }
    },
    clearSearch() {
      return this.linkSearch = '';
    },
    editLink(id) {
      this.linkToEdit = id;

      return this.$store.dispatch('showPanel', {name: 'editLink'});
    },
    doneEditLink() {
      this.linkToEdit = null;

      return this.$store.dispatch('hidePanel', {name: 'editLink'});
    },
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

  > .clear-search {
    background-color: rgb(192, 0, 64);
    border-radius: 6px;
    border: 0;
    color: white;
    cursor: pointer;
    font-weight: bold;
    height: 24px;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
    width: auto;
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

.edit-link-panel {
  width: 40vw;
}

// Transitions
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

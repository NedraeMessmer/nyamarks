<template>
  <div id="main">
    <h1>{{welcome}}</h1>

    <form class="new-link" name="newLink" @submit.prevent="addLink">
      <h2>
        <a @click.prevent="toggleNewLink">
          Add new link
          <span
            class="fa fa-fw fa-chevron-down fa-animated"
            :class="{'fa-flip-vertical': showNewLink}"></span>
        </a>
      </h2>

      <transition name="fold">
        <div class="new-link-form" v-show="showNewLink">
          <p><input placeholder="Name" v-model.trim="newLink.name"></p>
          <p><input placeholder="URL (required)" v-model.trim="newLink.url" required></p>
          <p><input placeholder="Tags (space-delimited)" v-model.trim="newLink.tags"></p>
          <p>
            <textarea placeholder="Description" v-model.trim="newLink.description"></textarea>
          </p>

          <button type="submit">Add link</button>
        </div>
      </transition>
    </form>

    <link-list></link-list>

    <div>
      <a class="wip" @click="debugToggleTags">
        Toggle tags (WIP)
      </a>
    </div>
    <div v-show="debugTags">
      <div>
        <h3>Current tags <span class="wip">(WIP)</span></h3>

        <tag-list></tag-list>
      </div>
    </div>
  </div>
</template>

<script>
import LinkList from '@/components/LinkList';
import TagList from '@/components/TagList';

const newLink = {
  name: '',
  url: '',
  tags: '',
  description: '',
};

export default {
  name: 'Main',
  components: {
    LinkList,
    TagList,
  },
  data() {
    return {
      welcome: 'Welcome to nyamarks',
      newLink: {...newLink},
      fileLoad: null,
      debugTags: false,
      showNewLink: false,
    }
  },
  methods: {
    toggleNewLink() {
      return this.showNewLink = !this.showNewLink;
    },

    addLink() {
      const link = {...this.newLink};
      const form = document.forms.newLink;

      // Normalize tags
      if (link.tags === '') {
        link.tags = [];
      } else {
        link.tags = link.tags.split(' ').sort();
      }

      // Reset form
      form.reset();
      this.newLink = {...newLink};

      this.$store.dispatch('addLink', {link});
    },

    debugToggleTags() {
      return this.debugTags = !this.debugTags;
    },
  },
}
</script>

<style scoped lang="scss">
#main {
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

.new-link {
  input, textarea {
    width: 25vw;
  }

  .linkArrow {
    display: inline-block;
    transition: transform 0.25s;

    &.toggled {
      transform: rotateX(-180deg);
    }
  }
}

// Transitions
.fold-enter-active,
.fold-leave-active {
  transform-origin: top center;
  transition: opacity 0.25s, transform 0.25s;
}

.fold-enter,
.fold-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>

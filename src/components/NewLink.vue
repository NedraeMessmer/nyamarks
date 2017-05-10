<template>
  <form class="new-link" name="newLink" @submit.prevent="addLink">
    <h2>
      <a @click.prevent="toggleForm" v-if="toggle">
        Add new link
        <span
          class="fa fa-fw fa-chevron-down fa-animated"
          :class="{'fa-flip-vertical': showForm}"></span>
      </a>
      <span v-if="!toggle">Add new link</span>
    </h2>

    <transition name="fold">
      <div v-show="!toggle || showForm">
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
</template>

<script>
const newLink = {
  name: '',
  url: '',
  tags: '',
  description: '',
};

export default {
  name: 'AddLink',
  props: {
    toggle: {type: Boolean, required: false, default: false},
  },
  data() {
    return {
      newLink: {...newLink},
      showForm: !this.toggle,
    }
  },
  methods: {
    toggleForm() {
      return this.showForm = !this.showForm;
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

      // Dispatch action
      this.$store.dispatch('addLink', {link});

      // Autosave
      if (this.$store.state.ui.autosave) {
        const json = this.$store.getters.storeAsJson();

        localStorage.setItem('nyamarks', json);
      }
    },
  },
}
</script>

<style scoped lang="scss">
.new-link {
  input, textarea {
    width: 25vw;
  }

  button {
    background-color: rgb(64, 0, 192);
    border: none;
    border-radius: 2px;
    box-shadow: inset 0 -3px rgba(0, 0, 0, 0.5);
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    margin: 2px;
    padding: 5px 8px 8px;
    text-decoration: none;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: mix(rgb(64, 0, 192), white, 50%);
    }
  }
}

.fold-enter-active,
.fold-leave-active {
  transform-origin: top center;
  transition: opacity 0.25s ease-in, transform 0.25s ease-in;
}

.fold-enter,
.fold-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>

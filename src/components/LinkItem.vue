<template>
  <div class="link-item">
    <div class="name">
      <p>{{link.name}}</p>
    </div>
    <div class="url">
      <p><a v-bind:href="link.url" target="_blank">{{link.url}}</a></p>
    </div>
    <div class="description">
      <p>{{link.description}}</p>
    </div>
    <div class="tags">
      <tag-pill
        v-for="(tag, index) in link.tags"
        v-bind:tagname="tag"
        v-bind:key="index"></tag-pill>
    </div>
    <div class="actions">
      <router-link v-bind:to="editLink">Edit</router-link>
      <button v-on:click="removeLink(linkId)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkItem',
  props: ['link', 'linkId'],
  data() {
    return {
      editLink: {
        name: 'EditLink',
        params: {id: this.linkId},
      },
    }
  },
  methods: {
    removeLink() {
      this.$emit('delete-link');
    },
  },
};
</script>

<style scoped lang="scss">
.link-item {
  display: flex;
  text-align: left;

  > div {
    flex: 1 1 auto;
    padding: 10px;
    width: 20%;
  }

  .name {
    font-weight: bold;
  }

  .tags,
  .actions {
    align-items: center;
    display: flex;
  }

  .actions {
    justify-content: center;
  }

  .actions {
    a, button {
      background-color: rgba(64, 0, 192, 0.8);
      border: none;
      border-radius: 2px;
      box-shadow: inset 0 -3px rgba(0, 0, 0, 0.5);
      color: white;
      cursor: pointer;
      font-family: 'Lato', sans-serif;
      font-size: 1em;
      display: inline-block;
      margin: 2px;
      padding: 5px 8px 8px;
      text-decoration: none;
      text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
      transition: background-color 0.2s ease-in;

      &:hover {
        background-color: rgba(128, 0, 128, 0.8);
      }
    }
  }
}
</style>

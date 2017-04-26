<template>
  <div class="link-item">
    <div class="link">
      <a v-bind:href="link.url" target="_blank">
        <p class="name" v-if="link.name">{{link.name}}</p>
        <p class="url">{{link.url}}</p>
      </a>
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
      <button class="delete" v-on:click="removeLink(linkId)">Delete</button>
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
    flex: 3 1 auto;
    padding: 10px;
    position: relative;
    width: 20%;

    &.tags,
    &.actions {
      flex: 1 3 10vw;
    }
  }

  .link > a {
    color: #2c3e50;
    display: block;
    height: 100%;
    overflow: hidden;
    text-decoration: none;
    width: 100%;

    &:after {
      background-image: linear-gradient(to right, transparent, white);
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      right: 10px;
      top: 0;
      width: 15px;
      z-index: 2;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    .name {
      font-weight: bold;
      text-decoration: none;

      + .url {
        font-size: smaller;
      }
    }

    .url {
      color: rgb(0, 128, 192);
    }

    &:hover .url {
      text-decoration: underline;
    }
  }

  .tags,
  .actions {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .actions {
    justify-content: flex-end;
  }

  .actions {
    a, button {
      background-color: rgb(64, 0, 192);
      border: none;
      border-radius: 2px;
      box-shadow: inset 0 -3px rgba(0, 0, 0, 0.5);
      color: white;
      cursor: pointer;
      font-size: 1em;
      font-weight: bold;
      display: inline-block;
      margin: 2px;
      padding: 5px 8px 8px;
      text-decoration: none;
      text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
      transition: background-color 0.2s ease-in;

      &:hover {
        background-color: mix(rgb(64, 0, 192), white, 50%);
      }

      &.delete:hover {
        background-color: rgb(216, 32, 64);
      }
    }
  }
}
</style>

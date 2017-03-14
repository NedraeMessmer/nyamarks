<template>
  <div class="link-item">
    <div class="name">
      <p>{{link.name}}</p>
    </div>
    <div class="url">
      <p><a v-bind:href="link.url">{{link.url}}</a></p>
    </div>
    <div class="description">
      <p>{{link.description}}</p>
    </div>
    <div class="tags">
      <tag-pill v-for="(tag, index) in link.tags" v-bind:tagname="tag" v-bind:key="index"></tag-pill>
    </div>
    <div class="remove">
      <p><button v-on:click="removeLink(linkId)">Delete</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkItem',
  props: ['link', 'linkId'],
  methods: {
    removeLink(index) {
      return this.$store.commit({
        type: 'removeLink',
        index,
      });
    },
  },
};
</script>

<style scoped>
.link-item {
  display: flex;
}

.link-item > div {
  flex: 1 1 auto;
  border: 1px solid green;
}
</style>

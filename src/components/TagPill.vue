<template>
  <p class="tag-pill">
    {{tagname}}
    <button class="delete" v-on:click="deletePill" v-if="deletable">X</button>
  </p>
</template>

<script>
export default {
  props: ['tagname', 'deletable'],
  methods: {
    deletePill() {
      this.$emit('delete-pill');
    },
  },
}
</script>

<style scoped lang="scss">
.tag-pill {
  background-color: rgba(192, 0, 64, 0.8);
  border-radius: 2px;
  color: white;
  display: inline-block;
  margin: 2px;
  padding: 5px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);

  .delete {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    border: none;
    color: inherit;
    font-weight: bold;
    margin-left: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>

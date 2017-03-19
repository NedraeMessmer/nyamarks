<template>
  <div class="tag-pill">
    <span>{{tagname}}</span>
    <button class="delete" v-on:click="deletePill" v-if="deletable">X</button>
  </div>
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
  align-items: center;
  justify-content: space-between;
  background-color: rgba(192, 0, 64, 0.8);
  border-radius: 2px;
  color: white;
  display: inline-flex;
  margin: 2px;
  height: 28px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);

  > span {
    display: block;
    margin-left: 6px;
    margin-right: 6px;
  }

  > .delete {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    border: none;
    color: inherit;
    cursor: pointer;
    font-weight: bold;
    height: 28px;
    padding: 0;
    transition: background-color 0.2s ease-in;
    width: 28px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>

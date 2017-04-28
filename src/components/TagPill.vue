<template>
  <div class="tag-pill">
    <span>{{tagname}}</span>
    <button class="delete" @click="deletePill" v-if="deletable">X</button>
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
  background-color: rgb(192, 0, 64);
  border-radius: 6px;
  color: white;
  display: inline-flex;
  font-size: smaller;
  font-weight: bold;
  height: auto;
  justify-content: space-between;
  margin: 2px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);

  > span {
    display: block;
    margin: 4px 6px;
  }

  > .delete {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
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

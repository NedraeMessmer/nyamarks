<template>
  <p class="tag-pill">{{tagname}}</p>
</template>

<script>
export default {
  props: ['tagname'],
}
</script>

<style scoped>
.tag-pill {
  background-color: rgba(192, 0, 64, 0.8);
  border-radius: 2px;
  color: white;
  display: inline-block;
  margin: 2px;
  padding: 5px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
}
</style>

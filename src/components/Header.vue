<template>
  <div id="header">
    <div>
      <h2>
        <router-link to="/">nyamarks</router-link>
      </h2>
    </div>
    <div>
      <p>Portable bookmarks</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#header > div {
  width: 20%;
}
</style>

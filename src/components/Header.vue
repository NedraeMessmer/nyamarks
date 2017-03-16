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

<style scoped lang="scss">
#header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  text-align: center;

  > div {
    width: 20%;
  }

  h2 a {
    color: rgba(64, 0, 192, 0.6);
    text-decoration: none;
  }
}
</style>

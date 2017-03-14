<template>
  <div id="header">
    <div>
      <h2>nyamarks</h2>
    </div>
    <div>
      <p>Right side text</p>
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
}

#header > div {
  flex: 1 1 auto;
  justify-content: space-between;
}
</style>

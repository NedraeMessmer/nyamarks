<template>
  <div id="main">
    <h1>{{welcome}}</h1>

    <link-list></link-list>

    <div>
      <a class="wip" @click="debugToggleTags">
        Toggle tags (WIP)
      </a>
    </div>
    <div v-show="debugTags">
      <div>
        <h3>Current tags <span class="wip">(WIP)</span></h3>

        <tag-list></tag-list>
      </div>
    </div>
  </div>
</template>

<script>
import LinkList from '@/components/LinkList';
import TagList from '@/components/TagList';

export default {
  name: 'Main',
  components: {
    LinkList,
    TagList,
  },
  data() {
    return {
      welcome: 'Welcome to nyamarks',
      debugTags: false,
    }
  },
  methods: {
    debugToggleTags() {
      return this.debugTags = !this.debugTags;
    },
  },
}
</script>

<style scoped lang="scss">
#main {
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}
</style>

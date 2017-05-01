<template>
  <div class="link-item">
    <div class="link">
      <a :href="link.url" target="_blank">
        <p class="name" v-if="link.name">
          {{link.name}}
        </p>
        <p class="url">{{link.url}}</p>
      </a>
    </div>
    <div class="description">
      <p>{{link.description}}</p>
    </div>
    <div class="tags">
      <tag-pill
        v-for="(tag, index) in link.tags"
        :tagname="tag"
        :key="index"
        @click.native="linkQuery({query: tag})"></tag-pill>
    </div>
    <div class="actions">
      <!--router-link :to="editLinkRoute">Edit</router-link-->
      <button class="edit" title="Edit link" @click="editLink">
        <span class="fa fa-fw fa-pencil"></span>
      </button>
      <button class="delete" title="Delete link" @click="removeLink">
        <span class="fa fa-fw fa-trash"></span>
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'LinkItem',
  props: ['link'],
  methods: {
    ...mapActions([
      'linkQuery',
    ]),
    editLink() {
      this.$emit('edit-link');
    },
    removeLink() {
      this.$emit('delete-link');
    },
  },
};
</script>

<style scoped lang="scss">
.link-item {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  opacity: 0.75;
  text-align: left;
  transition: opacity 0.25s, border-bottom 0.25s;

  &:hover {
    opacity: 1;
    border-bottom: 1px solid #cccccc;
  }

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

  .link {
    align-items: center;
    display: flex;

    > a {
      color: #2c3e50;
      display: block;
      overflow: hidden;
      text-decoration: none;
      width: 100%;

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
        width: 100%;
        position: relative;

        &:after {
          background-image: linear-gradient(to left, white, transparent);
          content: '';
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 50px;
        }
      }

      &:hover .url {
        text-decoration: underline;
      }
    }
  }

  .tags,
  .actions {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .tag-pill {
    cursor: pointer;
  }

  .actions {
    justify-content: flex-end;

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

<template>
  <div id="options-panel">
    <transition name="open">
      <div class="overlay" v-show="showOptions" @click="dismiss()"></div>
    </transition>
    <transition name="open">
      <div class="options-form" v-show="showOptions">
        <button type="button" @click="dismiss()">
          Close
        </button>
        <p>Hello! Is this panel shown?</p>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'options-panel',
  computed: {
    ...mapState({
      showOptions: state => state.ui.showOptions,
    }),
  },
  methods: {
    dismiss() {
      return this.$store.dispatch('hideOptions');
    },
  },
}
</script>

<style scoped lang="scss">
// Transitions
.open-enter-active,
.open-leave-active {
  &.overlay {
    transition: opacity 0.25s;
  }
  &.options-form {
    transition: transform 0.25s;
  }
}

.open-enter,
.open-leave-to {
  &.overlay {
    opacity: 0;
  }
  &.options-form {
    transform: translateX(-30vw);
  }
}

// Layout
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.options-form {
  background-color: white;
  box-shadow: 0 0 10px black;
  box-sizing: border-box;
  height: 100%;
  left: 0;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 30vw;
  z-index: 6;
}
</style>

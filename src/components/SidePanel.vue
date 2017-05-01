<template>
  <div class="side-panel">
    <transition name="fade">
      <div
        class="overlay"
        v-show="showPanel"
        @click="dismiss()"></div>
    </transition>
    <transition :name="slideSide">
      <div
        :class="panelClass"
        v-show="showPanel">
        <button
          type="button"
          class="close-panel"
          @click="dismiss()">
          X
        </button>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'side-panel',
  props: {
    name: {type: String, required: true},
    side: {type: String, required: true},
  },
  data() {
    return {
      slideSide: this.side,
      panelClass: {
        'panel-content': true,
        left: this.side === 'left',
        right: this.side === 'right',
      },
    }
  },
  computed: {
    showPanel() {
      return this.$store.state.ui.panels[this.name];
    },
    panels() {
      return this.$store.getters.panels;
    },
  },
  methods: {
    dismiss() {
      const name = this.name;

      this.$emit('close-panel', this.name);

      return this.$store.dispatch('hidePanel', {name});
    },
  },
}
</script>

<style scoped lang="scss">
// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: transform 0.25s;
}

.left-enter,
.left-leave-to {
  transform: translateX(-30vw);
}

.right-enter,
.right-leave-to {
  transform: translateX(30vw);
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

.panel-content {
  background-color: white;
  box-shadow: 0 0 10px black;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  width: inherit;
  z-index: 6;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
}

.close-panel {
  background-color: rgb(192, 0, 64);
  border-radius: 6px;
  border: 0;
  color: white;
  cursor: pointer;
  font-weight: bold;
  height: 24px;
  position: absolute;
  right: 10px;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
  top: 10px;
  width: 24px;
}
</style>

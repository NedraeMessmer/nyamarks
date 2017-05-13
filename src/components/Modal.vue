<template>
  <div class="modal" v-show="showModalDelayed">
    <transition name="fade">
      <div
        class="overlay"
        v-show="showModal"
        @click="handleOverlayClick()"></div>
    </transition>
    <transition name="slide">
      <div
        class="modal-content"
        :class="modalClass"
        v-show="showModal">
        <button
          type="button"
          class="close-modal delete"
          v-if="closeButton"
          @click="dismiss()">
          <span class="fa fa-fw fa-times"></span>
        </button>

        <slot name="header">
          <div class="modal-header">
            <h2 class="title" v-if="title">{{title}}</h2>
            <h3 class="subtitle" v-if="subtitle">{{subtitle}}</h3>
          </div>
        </slot>

        <slot></slot>

        <div class="actions">
          <button
            v-if="okButton"
            @click="dismiss('ok')">
            {{okText}}
          </button>

          <button
            class="delete"
            v-if="cancelButton"
            @click="dismiss('cancel')">
            {{cancelText}}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    name: {type: String, required: true},
    title: {type: String},
    subtitle: {type: String},
    cancelButton: {type: Boolean, default: true},
    cancelText: {type: String, default: 'Cancel'},
    clickOverlayToClose: {type: Boolean, default: true},
    closeButton: {type: Boolean, default: true},
    closeWithEsc: {type: Boolean, default: true},
    okButton: {type: Boolean, default: true},
    okText: {type: String, default: 'OK'},
    onCancel: {type: Function},
    onDismiss: {type: Function},
    onOk: {type: Function},
  },
  data() {
    return {
      modalClass: {},
      showModalDelayed: this.$store.state.ui.modals[this.name],
    }
  },
  computed: {
    showModal() {
      return this.$store.state.ui.modals[this.name];
    },
  },
  methods: {
    dismiss(type) {
      const name = this.name;

      // Default handler is nothing
      function noop() {}
      let handler = this.onDismiss || noop;

      this.$emit('close-modal', name);

      // Use OK handler if available
      if (type === 'ok') {
        handler = this.onOk || noop;
      }

      // Use cancel handler if available, dismiss handler otherwise
      if (type === 'cancel') {
        handler = this.onCancel || this.onDismiss;
      }

      // Run handler
      handler();

      return this.$store.dispatch('hideModal', {name});
    },
    handleEscKey(event) {
      if (event.keyCode === 27) {
        this.dismiss();
      }
    },
    handleOverlayClick() {
      if (this.clickOverlayToClose) {
        this.dismiss();
      }
    },
  },
  watch: {
    showModal(next) {
      if (this.closeWithEsc) {
        // Dismiss modal when the escape key is released
        if (next) {
          document.addEventListener('keyup', this.handleEscKey);
        } else {
          document.removeEventListener('keyup', this.handleEscKey);
        }
      }

      // Set showModalDelayed, but wait 250ms only if false
      if (next) {
        this.showModalDelayed = next;
      } else {
        setTimeout(() => {
          this.showModalDelayed = next;
        }, 250);
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(15vw);
}

// Layout
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 6;
}

.modal {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.modal-header {
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
  padding-top: 6px;

  > .title,
  > .subtitle {
    margin-bottom: 0;
    margin-top: 0;
  }

  > .subtitle {
    color: mix($default-text, white, 60%);
    font-size: 0.9em;
  }

  > .title + .subtitle {
    margin-top: 5px;
  }
}

.modal-content {
  background-color: white;
  box-shadow: 0 0 10px black;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  text-align: left;
  position: relative;
  width: 50vw;
  z-index: 7;

  > .actions {
    border-top: 2px solid #ccc;
    padding-top: 8px;
    text-align: right;
  }
}

.close-modal {
  border-radius: 6px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>

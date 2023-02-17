<template>
  <div class="webcam">
    <button class="webcam-close btn" @click="close()">
      <icon class="icon" name="close"></icon>
    </button>
    <div class="container">
      <div class="user-info-wrapper">
        <div class="user-info-title">User Information</div>
        <div class="user-info-form">
          <form class="form" autocomplete="off">
            <error :error="error" @click="toggleError">{{ errorMsg }}</error>
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                class="form-input"
                placeholder="Enter your username"
                autocomplete="off"
                v-model="account.username"
                :class="{ err: error }"
                required
              />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                type="text"
                class="form-input"
                placeholder="Enter your description"
                autocomplete="off"
                v-model="account.description"
              />
            </div>
            <div class="form-button">
              <button
                type="submit"
                class="btn btn-summit"
                @click.prevent="updatedInfo"
              >
                Save
              </button>
              <button class="btn btn-cancel" @click.prevent="resetForm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("closePreview");
    },
  },
};
</script>

<style lang="scss" scoped>
.webcam {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba($color: #000000, $alpha: 0.92);
  &-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-close {
    position: fixed;
    top: 5rem;
    right: 5rem;
    color: transparent;
    .icon {
      @include icon(3.2rem);
    }
  }
  &-graphic {
    padding-top: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4rem;
  }
  &-content {
    margin: auto 0;
  }
  &-buttons {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
  }
  .btn {
    color: #ffffff;
    text-align: center;
    user-select: none;
    outline: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.7rem 1.4rem;
    font-size: 1.4rem;
    text-transform: capitalize;
    border-radius: 0.5rem;
    margin-right: 1rem;
    @include transition(
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out
    );
    cursor: pointer;
    &-summit {
      background-color: $secondary;
      &:hover {
        border: 1px solid $secondary;
      }
    }
    &-cancel {
      background-color: $primary;
      &:hover {
        border: 1px solid $primary;
      }
    }
  }
}
</style>
<template>
  <div class="auth">
    <loader v-if="loading" />
    <div class="card__wrapper">
      <div class="card">
        <div class="card__body">
          <h3 class="card__title logo">Heimat</h3>
          <h3 class="card__title">Create New Password</h3>
          <form class="form" autocomplete="off">
            <error :error="error" @click="toggleError">{{ errorMsg }} </error>
            <p class="form__info">
              Please create a new password that you do not use on any other
              site.
            </p>
            <div class="form__group">
              <label></label>
              <input
                :type="show ? 'text' : 'password'"
                :class="{ err: error }"
                class="form__input"
                placeholder="New Password"
                v-model="newPassword"
                required
                autocomplete="off"
              />
              <icon
                v-if="show"
                class="form__icon"
                @click.prevent="show = false"
                name="eye"
              ></icon>
              <icon
                v-else
                @click.prevent="show = true"
                class="form__icon"
                name="eye-slash"
              ></icon>
            </div>
            <div class="form__group">
              <label></label>
              <input
                :type="show ? 'text' : 'password'"
                :class="{ err: error }"
                class="form__input"
                placeholder="Confirm New Password"
                v-model="confirmPassword"
                required
                autocomplete="off"
              />
              <icon
                v-if="show"
                class="form__icon"
                @click.prevent="show = false"
                name="eye"
              ></icon>
              <icon
                v-else
                @click.prevent="show = true"
                class="form__icon"
                name="eye-slash"
              ></icon>
            </div>
            <div class="form__button">
              <button
                type="submit"
                class="btn btn__summit"
                @click.prevent="handleSummit"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "@/components/notify/Error.vue";
import Loader from "@/components/notify/Loader.vue";
export default {
  name: "Reset",
  data() {
    return {
      error: false,
      errorMsg: null,
      loading: false,
      show: false,
      newPassword: null,
      confirmPassword: null,
    };
  },
  components: { Error, Loader },
  methods: {
    async handleSummit() {
      if (this.newPassword && this.confirmPassword) {
        if (this.newPassword === this.confirmPassword) {
          console.log("You have been here before");
        } else {
          this.displayError("Password mismatch!");
        }
      } else {
        this.displayError("All fields must be filled!");
      }
    },
    toggleError() {
      this.error = false;
    },

    displayError(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "auth";
</style>

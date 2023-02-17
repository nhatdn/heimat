<template>
  <div class="auth">
    <div class="card__wrapper">
      <div class="card">
        <div class="card__body">
          <h3 class="card__title logo">Heimat</h3>
          <h3 class="card__title">Forgot Password</h3>
          <form class="form" autocomplete="off">
            <error :error="error" @click="toggleError">{{ errorMsg }} </error>
            <div class="form__group">
              <label></label>
              <input
                type="email"
                class="form__input"
                placeholder="Enter Your Email Address"
                autocomplete="off"
                v-model="email"
                :class="{ err: error }"
                required
              />
            </div>
            <div class="form__button">
              <button
                type="submit"
                class="btn btn__summit"
                @click.prevent="handleSummit"
              >
                Continue
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
export default {
  name: "Forgot",

  data() {
    return {
      error: false,
      errorMsg: null,
      email: null,
      isLoading: false,
    };
  },

  components: { Error },

  methods: {
    async handleSummit() {
      if (this.email) {
        try {
          const data = this.email;
          console.log(data);
          this.$router.push({ name: "Verify" });
        } catch (err) {
          this.displayError(
            "Something went wrong! Please ensure the email is in the right format!"
          );
          this.email = "";
        } finally {
          this.loading = false;
        }
      } else {
        this.displayError("Please fill out the email");
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

<template>
  <div class="auth">
    <loader v-if="loading" />
    <div class="card__wrapper">
      <div class="card">
        <div class="card__body">
          <h3 class="card__title logo">Heimat</h3>
          <h3 class="card__title">Verify Account</h3>
          <form class="form" autocomplete="off" @submit.prevent="verifyAccount">
            <error :error="error" @click="toggleError">{{ errorMsg }} </error>
            <p class="form__info">
              Please check your email and enter the 6 digits code that has just
              been sent. This code is only valid in 5 minutes.
            </p>
            <div class="form__group">
              <label></label>
              <input
                type="text"
                :class="{ err: error }"
                class="form__input"
                placeholder="Enter the code"
                v-model="code"
                autocomplete="off"
                required
              />
            </div>
            <div class="form__button">
              <button
                type="submit"
                class="btn btn__summit"
                @click.prevent="verifyAccount"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthRepository } from "@/repositories";
import { mapGetters } from "vuex";
import Error from "@/components/notify/Error.vue";
import Loader from "@/components/notify/Loader.vue";
import { setToken } from "@/helpers";

export default {
  name: "Verify",
  data() {
    return {
      error: false,
      errorMsg: null,
      loading: false,
      code: null,
    };
  },
  components: { Error, Loader },
  computed: mapGetters("user", ["getUser"]),
  methods: {
    async verifyAccount() {
      if (this.code) {
        console.log(this.$route.params.email);
        const data = { code: this.code, email: this.$route.params.email };
        const response = await AuthRepository.verify(data);
        setToken(response.data);
        this.$router.push({
          name: "Home",
          params: {
            ...response.data,
          },
        });
      } else {
        this.displayError("All fields must be filled!");
        return;
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

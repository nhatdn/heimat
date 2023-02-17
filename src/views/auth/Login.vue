<template>
  <div class="auth">
    <loader v-if="loading" />
    <div class="card__wrapper">
      <div class="card">
        <div class="card__body">
          <h3 class="card__title logo">Heimat</h3>
          <h3 class="card__title">Login</h3>
          <form class="form" autocomplete="off">
            <error :error="error" @click="toggleError">{{ errorMsg }} </error>
            <div class="form__group">
              <label></label>
              <input
                type="text"
                class="form__input"
                :class="{ err: error }"
                placeholder="Username or email"
                v-model="account"
                autocomplete="off"
                minlength="1"
                required
              />
            </div>
            <div class="form__group">
              <label></label>
              <input
                :type="show ? 'text' : 'password'"
                class="form__input"
                placeholder="Password"
                :class="{ err: error }"
                v-model="user.password"
                autocomplete="off"
                minlength="6"
                required
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
            <div class="form__forgot">
              <router-link :to="{ name: 'Forgot' }"
                >Forgot password?</router-link
              >
            </div>

            <div class="form__button">
              <button
                type="submit"
                class="btn btn__summit"
                @click.prevent="handleSummit()"
              >
                Login
              </button>
            </div>
            <div class="form__button">
              <button class="btn btn__google" @click.prevent="ggLogin()">
                Google
              </button>
            </div>
            <p class="card__navigating">
              Don't have an Account?
              <router-link :to="{ name: 'Register' }">Sign Up</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/helpers";
import Error from "@/components/notify/Error.vue";
import Loader from "@/components/notify/Loader.vue";
import { AuthRepository } from "@/repositories";
export default {
  components: { Error },
  name: "Login",
  component: {
    Loader,
  },
  data() {
    return {
      error: false,
      errorMsg: null,
      loading: false,
      show: false,
      account: null,
      user: {
        password: null,
      },
      isLogin: false,
    };
  },
  methods: {
    async ggLogin() {
      try {
        this.loading = true;
        const ggUser = await this.$gAuth.signIn();
        console.log("UserId", ggUser.getId());
        console.log("authCode", ggUser.getAuthResponse());
        console.log("profile", ggUser.getBasicProfile());
        const id = ggUser.getId();
        const email = ggUser.getBasicProfile().yv;
        const access_token = ggUser.getAuthResponse().access_token;
        const refresh_token = ggUser.getAuthResponse().refresh_token;
        const data = {
          id,
          email,
          access_token,
          refresh_token,
        };
        console.log("Data " + data);
        const response = await AuthRepository.login(data);
        if (response.status === "200") {
          localStorage.setItem("token", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.$router.push({ name: "Home" });
        }
      } catch {
        console.log("Error");
      } finally {
        this.loading = false;
      }
    },
    async handleSummit() {
      if (this.user.password && this.account) {
        try {
          this.loading = true;
          this.checkAccountInput();
          const data = this.user;
          let response = await AuthRepository.login(data);

          if (response.data.code == 403) {
            this.$router.push({
              name: "Error",
              params: { error: response.data.content },
            });
            return;
          }
          if (response.data.code == 200) {
            setToken(response.data);
            this.$router.push({ name: "Home" });
          }
        } catch {
          this.displayError("Incorrect username or password!");
          return;
        } finally {
          this.loading = false;
        }
      } else {
        this.displayError("All fields must be filled!");
      }
    },

    checkAccountInput() {
      if (this.account.search("@") != -1) {
        this.user.email = this.account;
      } else {
        this.user.username = this.account;
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

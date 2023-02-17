<template>
  <div class="auth">
    <loader v-if="loading" />
    <div class="content__wrapper">
      <div class="card">
        <div class="card__body">
          <h3 class="card__title logo">Heimat</h3>
          <h3 class="card__title">Register</h3>
          <form class="form" autocomplete="off">
            <error :error="error" @click="toggleError">{{ errorMsg }} </error>
            <div class="form__group">
              <label></label>
              <input
                type="text"
                :class="{ err: error }"
                class="form__input"
                placeholder="Fullname"
                v-model="accountData.fullname"
                required
                autocomplete="off"
              />
            </div>
            <div class="form__group">
              <label></label>
              <input
                type="text"
                :class="{ err: error }"
                class="form__input"
                placeholder="Email"
                v-model="accountData.email"
                required
                autocomplete="off"
              />
            </div>
            <div class="form__group">
              <label></label>
              <input
                type="text"
                :class="{ err: error }"
                class="form__input"
                placeholder="Username"
                v-model="accountData.username"
                required
                autocomplete="off"
              />
            </div>
            <div class="form__group">
              <label></label>
              <input
                :type="show ? 'text' : 'password'"
                :class="{ err: error }"
                class="form__input"
                placeholder="Password"
                v-model="accountData.password"
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
            <div class="form__group group__birth">
              <label for="birth">Date of birth</label>
              <input
                id="birth"
                name="birth"
                type="date"
                :class="{ err: error }"
                class="form__input"
                placeholder="Choose a date"
                v-model="accountData.birth"
                required
                autocomplete="off"
              />
            </div>
            <div class="form__group group__gender">
              <p for="gender">Gender</p>
              <div class="gender__item">
                <input
                  v-model="accountData.gender"
                  type="radio"
                  id="male"
                  name="gender"
                  value="0"
                  checked
                />
                <label for="male">Male</label><br />
              </div>
              <div class="gender__item">
                <input
                  v-model="accountData.gender"
                  type="radio"
                  id="female"
                  name="gender"
                  value="1"
                />
                <label for="female">Female</label><br />
              </div>
              <div class="gender__item">
                <input
                  v-model="accountData.gender"
                  type="radio"
                  id="neutral"
                  name="gender"
                  value="2"
                /><label for="neutral">Neutral</label>
              </div>
            </div>
            <div class="form__button">
              <button
                type="submit"
                class="btn btn__summit"
                @click.prevent="handleSummit()"
              >
                Register
              </button>
            </div>
            <div class="form__button">
              <button class="btn btn__google" @click.prevent="ggLogin()">
                Google
              </button>
            </div>
            <p class="card__navigating">
              Already have an account?<router-link :to="{ name: 'Login' }">
                Sign In</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "@/components/notify/Error.vue";
import Loader from "@/components/notify/Loader.vue";
import { AuthRepository } from "@/repositories";
import { setToken } from "@/helpers";

export default {
  name: "Register",

  data() {
    return {
      error: false,
      errorMsg: null,
      show: false,
      accountData: {
        fullname: null,
        username: null,
        email: null,
        password: null,
        birthday: null,
        gender: 0,
        created_date: null,
      },
      loading: false,
    };
  },

  components: { Error, Loader },

  methods: {
    async ggLogin() {
      console.log("handle GG");
    },
    
    async handleSummit() {
      if (this.isValidData()) {
        try {
          this.loading = true;
          this.accountData.created_date = new Date();
          const data = this.accountData;

          const response = await AuthRepository.register(data);
          console.log(response);
          if (response.status == "200") {
            setToken(response.data);
            this.$router.push({
              name: "Verify",
              params: {
                ...this.accountData,
              },
            });
          }
        } catch {
          this.displayError(
            "Something went wrong! Please ensure all fields are in the right format!"
          );
          this.resetData();
        } finally {
          this.loading = false;
        }
      } else {
        this.displayError("All fields must be filled!");
      }
    },

    displayError(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },

    toggleError() {
      this.error = false;
    },

    isValidData() {
      return (
        this.accountData.fullname &&
        this.accountData.email &&
        this.accountData.username &&
        this.accountData.password &&
        this.accountData.birth
      );
    },

    resetData() {
      this.accountData.fullname = "";
      this.accountData.email = "";
      this.accountData.username = "";
      this.accountData.password = "";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "auth";
.auth {
  padding: 5rem 0;
}
.group {
  &__birth {
    flex-direction: column;
    label {
      color: $light-color-semi;
      font-size: 1.4rem;
      padding-bottom: 1rem;
    }
  }
  &__gender {
    justify-content: space-between;
    align-items: center;
    .gender__item {
      display: flex;
      align-items: center;
    }
    p {
      color: $light-color-semi;
      font-size: 1.6rem;
    }
    label {
      padding-left: 0.5rem;
      color: $light-color-semi;
      font-size: 1.4rem;
    }
  }
}
</style>

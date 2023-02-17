<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-title">Add new admin</div>
      <div class="modal-form">
        <form class="form" autocomplete="off">
          <error :error="error" @click="toggleError">{{ errorMsg }}</error>
          <div class="form-group">
            <label>Fullname</label>
            <input
              type="text"
              class="form-input"
              placeholder="Fullname"
              autocomplete="off"
              v-model="account.fullname"
              :class="{ err: error }"
              required
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-input"
              placeholder="Email"
              autocomplete="off"
              v-model="account.email"
              :class="{ err: error }"
              required
            />
          </div>
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-input"
              placeholder="Username"
              autocomplete="off"
              v-model="account.username"
              :class="{ err: error }"
              required
            />
          </div>
          <div class="form-group password">
            <label>Password</label>
            <input
              :type="show ? 'text' : 'password'"
              class="form-input"
              placeholder="Password"
              autocomplete="off"
              v-model="account.password"
              :class="{ err: error }"
              minlength="6"
              required
            />
            <icon
              v-if="show"
              class="form-icon"
              @click.prevent="show = false"
              name="eye"
            ></icon>
            <icon
              v-else
              @click.prevent="show = true"
              class="form-icon"
              name="eye-slash"
            ></icon>
          </div>
          <div class="form-button">
            <button
              type="submit"
              class="btn btn-summit"
              @click.prevent="addAdmin"
            >
              Add
            </button>
            <button class="btn btn-cancel" @click.prevent="closeModal">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ManagementRepository } from "@/repositories";
import Error from "@/components/notify/Error.vue";
export default {
  data() {
    return {
      account: {
        fullname: null,
        email: null,
        username: null,
        password: null,
        created_date: null,
      },
      show: false,
      error: false,
      errorMsg: null,
    };
  },
  components: { Error },
  methods: {
    async addAdmin() {
      if (
        this.account.fullname &&
        this.account.username &&
        this.account.password
      ) {
        this.account.created_date = new Date();
        const res = await ManagementRepository.createAdmin({ ...this.account });
        console.log(res);
        this.closeModal();
        this.$emit("finished");
      } else {
        this.error = true;
        this.errorMsg = "Please fill all the fields!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
    closeModal() {
      this.$emit("close");
    },
    toggleError() {
      this.error = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  &-wrapper {
    margin: auto auto;
    background: rgba($color: #fff, $alpha: 0.9);
    min-width: 50rem;
    border-radius: 0.5rem;
    padding: 2rem;
  }
  &-title {
    font-size: 2.4rem;
    text-align: center;
    padding: 1rem;
  }
  .form {
    &-group {
      margin-bottom: 1.5rem;
      &.password {
        position: relative;
      }
      label {
        display: inline-block;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: $dark-color-semi;
      }
      input {
        border: 1px solid $primary-color;
        font-size: 1.4rem;
        padding: 1rem;
        color: $dark-color-dark;
        border-radius: 0.5rem;
        width: 100%;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        outline: none;
        &:focus {
          border: 1px solid $primary-color-dark;
        }
        &::placeholder {
          color: $dark-color-semi;
        }
        &.err {
          border: 1px solid $error;
        }
      }
    }
    &-icon {
      position: absolute;
      right: 2rem;
      top: 60%;
      width: 2rem;
      height: 2rem;
      fill: $dark-color-dark;
      cursor: pointer;
    }
    &-button {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
      .btn {
        color: #ffffff;
        text-align: center;
        user-select: none;
        outline: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.7rem 1.4rem;
        font-size: 1.6rem;
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
  }
}
</style>

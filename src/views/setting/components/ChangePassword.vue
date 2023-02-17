<template>
  <div class="user-info">
    <div class="user-info-wrapper">
      <div class="user-info-title">Change Password</div>
      <div class="user-info-form">
        <form class="form" autocomplete="off">
          <error :error="error" @click="toggleError">{{ errorMsg }}</error>
          <div class="form-group password">
            <label>Old Password</label>
            <input
              :type="show ? 'text' : 'password'"
              :class="{ err: error }"
              class="form-input"
              placeholder="Old Password"
              v-model="oldPassword"
              required
              autocomplete="off"
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
          <div class="form-group password">
            <label>New Password</label>
            <input
              :type="show ? 'text' : 'password'"
              :class="{ err: error }"
              class="form-input"
              placeholder="New Password"
              v-model="newPassword"
              required
              autocomplete="off"
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
          <!-- <div class="form-group password">
            <label>Confirm New Password</label>
            <input
              :type="show ? 'text' : 'password'"
              :class="{ err: error }"
              class="form-input"
              placeholder="Confirm New Password"
              v-model="confirmPassword"
              required
              autocomplete="off"
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
          </div> -->
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
</template>

<script>
import { AuthRepository } from "@/repositories";
import Error from "@/components/notify/Error.vue";
export default {
  data() {
    return {
      oldPassword: null,
      newPassword: null,
      confirmPassword: null,
      show: false,
      error: false,
      errorMsg: null,
    };
  },
  components: { Error },
  methods: {
    async updatedInfo() {
      if (this.oldPassword && this.newPassword) {
        if (this.oldPassword.length > 6 && this.newPassword.length > 6) {
          const data = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          };
          const res = await AuthRepository.changePassword(data);
          if (res.status === 200) {
            console.log(res);
            alert("Your password has been changed successfully");
          }
        } else {
          this.error = true;
          this.errorMsg = "The passwords need to be at least 6 digits";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.error = true;
        this.errorMsg = "Please fill all the fields!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },

    resetForm() {
      this.oldPassword = null;
      this.newPassword = null;
      this.confirmPassword = null;
    },

    toggleError() {
      this.error = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "setting";
</style>

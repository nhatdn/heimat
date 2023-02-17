<template>
  <div class="user-info">
    <webcam
      ref="Webcam"
      v-if="isOpenCam"
      @finish="reloadProfile"
      @closePreview="closePreview"
    />
    <div class="user-info-wrapper">
      <div class="user-info-title">User Information</div>
      <div class="user-info-form">
        <form class="form" autocomplete="off">
          <div class="user__image">
            <div class="user__image-upload">
              <a class="upload__button" @click="isToggleShow = !isToggleShow"
                ><icon name="plus" class="icon"></icon></a
              ><input
                type="file"
                ref="userAvatar"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                @change="fileChange"
              />
              <!-- id="avatar" -->
              <div class="navbar-dropdown" v-show="isToggleShow">
                <label class="dropdown-item" for="avatar">
                  <div class="preview-thumbnail">
                    <div class="preview-icon">
                      <icon name="arrow-up"></icon>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <p class="preview-subject">Upload from your device</p>
                  </div>
                </label>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item" @click="openCam()">
                  <div class="preview-thumbnail">
                    <div class="preview-icon">
                      <icon name="camera"></icon>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <p class="preview-subject">Open the webcam</p>
                  </div>
                </a>
              </div>
            </div>
            <img :src="user.avatar" alt="avatar" />
          </div>
          <error :error="error" @click="toggleError">{{ errorMsg }}</error>
          <div class="form-group">
            <label>Fullname</label>
            <input
              type="text"
              class="form-input"
              placeholder="Enter your fullname"
              autocomplete="off"
              v-model="user.fullname"
              :class="{ err: error }"
              required
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-input"
              placeholder="Enter your email"
              autocomplete="off"
              :value="user.email"
              required
              readonly
            />
          </div>
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-input"
              placeholder="Enter your username"
              autocomplete="off"
              :value="user.username"
              required
              readonly
            />
          </div>
          <!-- <div class="form-group group__birth">
            <label for="birth">Date of birth</label>
            <input
              id="birth"
              name="birth"
              type="date"
              :class="{ err: error }"
              class="form-input"
              placeholder="Choose a date"
              value="24/8/2001"
              required
              autocomplete="off"
            />
          </div>
          <div class="group__gender">
            <p for="gender">Gender</p>
            <div class="gender__item">
              <input
                v-model="user.gender"
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
                v-model="user.gender"
                type="radio"
                id="female"
                name="gender"
                value="1"
              />
              <label for="female">Female</label><br />
            </div>
            <div class="gender__item">
              <input
                v-model="user.gender"
                type="radio"
                id="neutral"
                name="gender"
                value="2"
              /><label for="neutral">Neutral</label>
            </div>
          </div> -->
          <div class="form-group">
            <label>Description</label>
            <textarea
              type="text"
              class="form-input"
              placeholder="Enter your description"
              autocomplete="off"
              v-model="user.description"
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
</template>

<script>
import { UserRepository } from "@/repositories";
import Webcam from "@/components/webcam";
import Error from "@/components/notify/Error.vue";
import { mapActions, mapGetters } from "vuex";
import { formatBirthday } from "@/utils";
export default {
  data() {
    return {
      oldInfo: {},
      show: false,
      error: false,
      errorMsg: null,
      isToggleShow: null,
      isOpenCam: false,
      newAvatar: null,
    };
  },
  created() {
    console.log("shift" + this.user.birth);
    this.user.birth = formatBirthday(this.user.birth);
    console.log(this.user.birth);
    this.oldInfo = { ...this.user };
  },
  computed: mapGetters({ user: "user/getUser" }),
  components: { Error, Webcam },
  methods: {
    ...mapActions({ reloadProfile: "user/getInformation" }),
    openCam() {
      this.isToggleShow = false;
      this.isOpenCam = !this.isOpenCam;
      this.$refs.Webcam.openWebcam();
    },

    async fileChange() {
      console.log(this.$refs.userAvatar.files);
      this.newAvatar = this.$refs.userAvatar.files[0];
      await this.saveChangeAvatar();
    },

    closePreview() {
      this.isOpenCam = !this.isOpenCam;
    },
    finish() {
      this.reloadProfile();
    },

    async saveChangeAvatar() {
      let formData = new FormData();
      formData.append("avatar", this.newAvatar);
      await UserRepository.update(formData);
      this.reloadProfile();
      this.isToggleShow = false;
    },

    async updatedInfo() {
      if (this.user.fullname) {
        let formData = new FormData();
        formData.append("profile", JSON.stringify(this.user));
        const res = await UserRepository.update(formData);
        if (res.status === 200) {
          console.log(res);
          alert("Your information has been changed successfully");
        }
      } else {
        this.displayError("Please fill all the fields!");
      }
    },

    resetForm() {
      // reset the changes
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
@import "setting";
.user {
  &__image {
    display: flex;
    justify-content: center;
    position: relative;
    margin: 0 auto;
    img {
      @include roundImage(22rem);
      border: 5px solid $primary-color;
    }
    .upload__button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 58%;
      @include roundObject(4.5rem);
      background-color: $secondary-color;
      cursor: pointer;
      .icon {
        fill: #fff;
      }
    }
    input[type="file"] {
      display: none;
    }
  }
}
.preview {
  &-thumbnail {
    .profile-pic {
      width: 4rem;
      height: 4rem;
      @include roundImage(4rem);
    }
  }
  &-icon {
    width: 3rem;
    height: 3rem;
    text-align: center;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    .icon {
      @include icon(1.8rem, #595959);
    }
  }
  &-subject {
    font-size: 1.5rem;
    &-description {
      font-size: 1.2rem;
      color: $dark-color-light;
    }
  }
}

.navbar {
  &-dropdown {
    position: absolute;
    font-size: 0.9rem;
    margin-top: 0;
    top: 110%;
    right: 0;
    left: auto;
    border: none;
    border-radius: 4px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    animation-duration: 0.25s;
    animation-fill-mode: both;
    min-width: 10rem;
    color: #828282;
    text-align: left;
    list-style: none;
    background-color: #fffafa;
    background-clip: padding-box;

    .dropdown {
      &-item {
        display: flex;
        align-items: center;
        padding: 1.1rem 1.3rem;
        gap: 1.5rem;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background-color: $primary-color-light;
        }
      }
      &-divider {
        border-top: 1px solid #eeeeee;
      }
      &-navigating {
        text-align: center;
      }
    }
    &-title {
      font-weight: 600;
    }

    &-title,
    .dropdown-navigating {
      font-size: 1.6rem;
      padding: 1.5rem 2rem;
    }
  }
}

.group {
  &__birth {
    display: flex;
    flex-direction: column;
    label {
      color: $light-color-semi;
      font-size: 1.4rem;
      padding-bottom: 1rem;
    }
  }
  &__gender {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .gender__item {
      display: flex;
      align-items: center;
      padding: 3rem 0;
    }
    p {
      color: $dark-color-semi;
      font-size: 1.6rem;
    }
    label {
      padding-left: 0.5rem;
      color: $dark-color-semi;
      font-size: 1.4rem;
    }
  }
}
</style>

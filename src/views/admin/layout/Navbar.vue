<template>
  <nav class="navbar" :class="{ close: toggle }">
    <div class="navbar-brand-wrapper">
      <router-link :to="{ name: 'Home' }" class="navbar-brand-logo-mini"
        ><span>H</span></router-link
      >
    </div>
    <div class="navbar-menu-wrapper">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="minimize"
        @click.prevent="toggleSidebar()"
      >
        <icon name="bars"></icon>
      </button>
      <ul class="navbar-nav-right">
        <li class="nav-item" @click="toggleMessMenu()">
          <a class="nav-link">
            <icon name="envelope"></icon>
            <span class="dot"></span>
          </a>
          <div class="navbar-dropdown" v-show="openMess">
            <h6 class="navbar-dropdown-title">Messages</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item">
              <div class="preview-thumbnail">
                <img
                  src="@/assets/images/author.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Mark send you a message</p>
                <p class="preview-subject-description">1 Minutes ago</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item">
              <div class="preview-thumbnail">
                <img
                  src="@/assets/images/author.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Cregh send you a message</p>
                <p class="preview-subject-description">15 Minutes ago</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <img
                  src="@/assets/images/author.jpg"
                  alt="image"
                  class="profile-pic"
                />
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Profile picture updated</p>
                <p class="preview-subject-description">18 Minutes ago</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <p class="dropdown-navigating">4 new messages</p>
          </div>
        </li>
        <li class="nav-item" @click="toggleNotifyMenu()">
          <a class="nav-link">
            <icon name="bell"></icon>
            <span class="dot"></span>
          </a>
          <div class="navbar-dropdown" v-show="openNotify">
            <h6 class="navbar-dropdown-title">Notifications</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item">
              <div class="preview-thumbnail">
                <div class="preview-icon">
                  <icon name="calendar"></icon>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Event today</p>
                <p class="preview-subject-description">
                  Just a reminder that you have an event today
                </p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item">
              <div class="preview-thumbnail">
                <div class="preview-icon">
                  <icon name="hammer"></icon>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Settings</p>
                <p class="preview-subject-description">Update dashboard</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon">
                  <icon name="link"></icon>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Launch Admin</p>
                <p class="preview-subject-description">New admin wow!</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <p class="dropdown-navigating">See all notifications</p>
          </div>
        </li>
        <li class="nav-item" @click="toggleAccountMenu()">
          <a class="nav-link">
            <div class="navbar-profile">
              <img :src="user.avatar" alt="admin" />
              <p class="navbar-profile-name">{{ user.fullname }}</p>
              <icon name="caret-down"></icon>
            </div>
          </a>
          <div class="navbar-dropdown" v-show="openAccount">
            <h6 class="navbar-dropdown-title">Profile</h6>
            <div class="dropdown-divider"></div>
            <router-link
              class="dropdown-item"
              :to="{ name: 'UserInformation' }"
            >
              <div class="preview-thumbnail">
                <div class="preview-icon">
                  <icon name="setting"></icon>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Settings</p>
              </div>
            </router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item preview-item" @click.prevent="logout">
              <div class="preview-thumbnail">
                <div class="preview-icon">
                  <icon name="signout"></icon>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject">Log out</p>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import instance from "@/axios";
import {
  getLocalToken,
  removeLocalToken,
  removeLocalRefreshToken,
} from "@/axios/storage";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      openMess: null,
      openNotify: null,
      openAccount: null,
    };
  },
  computed: mapGetters({ user: "user/getUser" }),

  methods: {
    toggleAccountMenu() {
      if (this.openNotify || this.openMess) {
        this.openNotify = false;
        this.openMess = false;
      }
      this.openAccount = !this.openAccount;
    },
    toggleNotifyMenu() {
      if (this.openAccount || this.openMess) {
        this.openAccount = false;
        this.openMess = false;
      }
      this.openNotify = !this.openNotify;
    },
    toggleMessMenu() {
      if (this.openAccount || this.openNotify) {
        this.openAccount = false;
        this.openNotify = false;
      }
      return (this.openMess = !this.openMess);
    },
    toggleSidebar() {
      this.$emit("toggleSidebar");
    },
    async logout() {
      // logout with GG
      // this.gAuth.signOut();
      // logout normally
      console.log("hello");
      let config = {
        headers: {
          Authorization: "Bearer " + getLocalToken(),
        },
      };
      const response = await instance.post("/auth/logout", config);
      if (response.status === 200) {
        removeLocalToken();
        removeLocalRefreshToken();
        this.$store.dispatch("setUser", null);
        this.$router.push({ name: "Home" });
      }
    },
  },
  props: ["toggle"],
  // !!! use vue-click-outside later
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  background: #191c24;
  left: 244px;
  z-index: 313;
  @include transition(left 0.25s ease);
  @media #{$tablet} {
    left: 0;
    width: 100%;
  }
  &.close {
    left: 70px;
  }
  &-brand {
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 244px;
      height: 7rem;
      @include transition(width 0.25s ease, background 0.25s ease);
      background: #191c24;
      display: none;
      @media #{$phone-landscape} {
        display: flex;
      }
    }
    &-logo-mini {
      width: 100%;
      margin-right: 0;
      padding-right: 1.3rem;
      font-size: 1.5rem;
      color: #38425e;
      white-space: nowrap;
    }
  }
  &-menu {
    &-wrapper {
      display: flex;
      flex-grow: 1;
      align-items: stretch;
      width: 100%;
      height: 7rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      color: $light-color;
      @include boxShadow(20px 19px 34px -15px rgba(0, 0, 0, 0.5));
      @include transition(width 0.25s ease);
    }
  }
  &-toggler {
    align-self: center;
    padding: 0.25rem 0.75rem;
    height: 7rem;
    background-color: transparent;
    border: none;
    outline: none;
    outline-offset: 0;
    font-size: 0.8rem;
    line-height: 1;
    fill: #6c7293;
    cursor: pointer;
    -webkit-appearance: button;
  }
  &-nav-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    .nav {
      &-item {
        position: relative;
        display: flex;
        fill: $light-color;
        border-right: 1px solid #2c2e33;
        cursor: pointer;
        &:last-child {
          border: 1px solid transparent;
          .navbar-dropdown {
            top: 5rem;
            right: 4rem;
          }
        }
      }
      &-link {
        position: relative;
        padding: 0.5rem 2rem;
        font-size: 0.9rem;
        white-space: nowrap;
        .dot {
          width: 0.7rem;
          height: 0.7rem;
          background: $success;
          position: absolute;
          top: 0.5rem;
          left: 56%;
          border-radius: 50%;
        }
      }
    }
  }
  &-profile {
    display: flex;
    align-items: center;
    padding: 0 3rem 0 2rem;
    & > img {
      @include roundImage(3.5rem);
    }
    &-name {
      white-space: nowrap;
      margin-left: 1rem;
      margin-right: 0.5rem;
      font-size: 1.4rem;
    }
    & icon {
      @media #{$phone-landscape} {
        display: none;
      }
    }
  }
  &-dropdown {
    position: absolute;
    font-size: 0.9rem;
    margin-top: 0;
    top: 3.6rem;
    right: 0;
    left: auto;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 35px -3px black;
    animation-duration: 0.25s;
    animation-fill-mode: both;
    min-width: 10rem;
    color: #ffffff;
    text-align: left;
    list-style: none;
    background-color: #191c24;
    background-clip: padding-box;

    .dropdown {
      &-item {
        display: flex;
        align-items: center;
        padding: 11px 13px;
        gap: 1.5rem;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background-color: #13151b;
        }
      }
      &-divider {
        // overflow: hidden;
        border-top: 1px solid #2c2e33;
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
  .preview {
    &-thumbnail {
      .profile-pic {
        @include roundImage(4rem);
      }
    }
    &-icon {
      width: 40px;
      height: 40px;
      text-align: center;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #0d0d0d;
      fill: #fff;
    }
    &-subject {
      font-size: 1.5rem;
      &-description {
        font-size: 1.2rem;
        color: $dark-color-light;
      }
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="header-top">
      <div class="container">
        <div class="header-container">
          <div class="header-logo">
            <router-link :to="{ name: 'Home' }"
              ><span class="logo">Heimat</span></router-link
            >
          </div>
          <div class="header-mid__wrapper">
            <div class="header-mid">
              <div class="time">
                <div id="current-time">{{ currentTime }}</div>
              </div>
              <div class="header-search">
                <input
                  v-model="keySearch"
                  @keyup.enter="searching()"
                  type="text"
                  placeholder="Search here..."
                />
                <icon class="search" name="search"></icon>
              </div>
            </div>
          </div>
          <div class="header-end" v-if="isLogin">
            <ul class="navbar-nav-right">
              <li class="nav-item" @click="toggleNotifyMenu()">
                <a class="nav-link">
                  <icon class="icon" name="bell"></icon>
                  <span class="dot"></span>
                </a>
                <Notifications v-show="openNotify"></Notifications>
              </li>
              <li class="nav-item" @click="toggleMessMenu()">
                <a class="nav-link">
                  <icon class="icon" name="envelope"></icon>
                  <span class="dot"></span>
                </a>
                <messages v-show="openMess"></messages>
              </li>
              <li class="nav-item" @click="toggleAccountMenu()">
                <a class="nav-link">
                  <div class="navbar-profile" v-if="user.avatar">
                    <img :src="user.avatar" alt="avatar" />
                  </div>
                  <author-default v-else />
                </a>
                <div class="navbar-dropdown" v-show="openAccount">
                  <h6 class="navbar-dropdown-title">Profile</h6>
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Dashboard' }"
                    v-if="isAdmin"
                  >
                    <div class="preview-thumbnail">
                      <div class="preview-icon">
                        <icon class="icon" name="screwdriver"></icon>
                      </div>
                    </div>
                    <div class="preview-item-content">
                      <p class="preview-subject">Manage</p>
                    </div>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'UserInformation' }"
                  >
                    <div class="preview-thumbnail">
                      <div class="preview-icon">
                        <icon class="icon" name="setting"></icon>
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
                        <icon class="icon" name="signout"></icon>
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
          <div v-else class="header-end">
            <router-link class="header-btn" :to="{ name: 'Login' }">
              <icon class="btn-icon" name="user-lock"></icon>Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <div class="header2">
          <div class="header2-start">
            <router-link :to="{ name: 'AllMembers' }"
              ><p class="p">Featured Member</p></router-link
            >
          </div>
          <div class="header2-end">
            <!-- <icon class="icon" name="chevron-left"></icon> -->
            <ul>
              <router-link :to="{ name: 'AllCategory' }"
                ><li>All</li></router-link
              >
              <router-link
                :to="{ name: 'Category', params: { categoryId: category._id } }"
                v-for="category in categoryList"
                :key="category._id"
                ><li>{{ category.name }}</li></router-link
              >
            </ul>
            <!-- <icon class="icon" name="chevron-right"></icon> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Messages from "./dropDown/Messages.vue";
// import Setting from "./dropDown/Setting.vue";
import AuthorDefault from "@/components/miscellaneous/AvatarDefault.vue";
import { clearToken } from "@/helpers";
import { formatTime } from "@/utils";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { AuthRepository } from "@/repositories";
import Notifications from "./dropDown/Notifications.vue";

export default {
  name: "Header", //Setting
  components: { AuthorDefault, Messages, Notifications },
  data() {
    return {
      openMess: null,
      openNotify: null,
      openAccount: null,
      keySearch: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user/getUser",
      isLogin: "user/isAuthenticated",
      categoryList: "category/getCategoryList",
      isAdmin: "user/isAdmin",
    }),
    currentTime() {
      return formatTime();
    },
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions({ getCategories: "category/getData" }),
    ...mapActions({ getSearch: "search/searchBlogsAndUsers" }),
    ...mapMutations({}),
    searching() {
      if (this.keySearch.trim() != "") {
        if (this.$route.name != "Search")
          this.$router.push({
            name: "Search",
          });
        this.getSearch({ keyword: this.keySearch });
        this.keySearch = "";
      }
    },
    async logout() {
      // logout with GG
      // this.gAuth.signOut();
      // logout normally
      const response = await AuthRepository.logout();
      if (response.status === 200) clearToken();
    },

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
      this.openMess = !this.openMess;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Header";
</style>

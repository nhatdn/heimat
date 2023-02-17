<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="footer-navigate container">
        <div class="footer-logo">
          <router-link :to="{ name: 'Home' }"
            ><span class="logo">HEIMAT</span>
          </router-link>
        </div>
        <div class="footer-item">
          <router-link class="footer-link" :to="{ name: 'About' }"
            >ABOUT HEIMAT</router-link
          >
          <router-link class="footer-link" :to="{ name: 'AllCategory' }"
            >CATEGORY</router-link
          >
          <router-link class="footer-link" :to="{ name: 'TermsOfUse' }"
            >TERMS OF USE</router-link
          >
        </div>
      </div>
    </div>
    <p>&copy; {{ currentYear }}, Heimat</p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear: function () {
      let date = new Date();
      return date.getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  &-wrapper {
    border-top: 0.1rem solid $dark-color-lighter;
    border-bottom: 0.1rem solid $dark-color-lighter;
  }
  &-navigate {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-logo {
    display: inline-block;
    font-family: $font-logo;
    font-style: normal;
    font-weight: normal;
    font-size: 3.2rem;
    line-height: 3.8rem;
    letter-spacing: 1rem;
    color: rgba(0, 0, 0, 0.64);
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  &-item {
    display: inline-block;
  }
  & p {
    font-size: 1.3rem;
    text-align: center;
    font-family: $font-logo;
    letter-spacing: 0.29em;
    color: $dark-color-semi;
    padding: 2rem;
  }
  &-link {
    font-size: 1.5rem;
    padding: 1rem;
    @include transition(color 0.3s ease);
    &:hover {
      color: $dark-color-dark;
    }
  }
}
</style>
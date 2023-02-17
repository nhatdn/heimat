<template>
  <div class="container">
    <div class="setting">
      <div class="setting__left">
        <sidebar />
      </div>
      <div class="setting__right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./layout/Sidebar";
export default {
  components: { Sidebar },
  name: "Setting",
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  // background: $dark-color;
  &__left {
    width: 244px;
    @include transition(width 0.25s ease);
    &.close {
      width: 70px;
    }
  }
  &__right {
    width: calc(100% - 244px);
    margin-top: 7rem;
    @include transition(width 0.25s ease);
    &.close {
      width: calc(100% - 70px);
    }
  }
}
</style>

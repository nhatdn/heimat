<template>
  <div class="admin">
    <div class="admin__left" :class="{ close: toggle }">
      <sidebar :toggle="toggle" />
    </div>
    <div class="admin__right" :class="{ close: toggle }">
      <navbar @toggleSidebar="toggleSidebar" :toggle="toggle" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
export default {
  components: { Navbar, Sidebar },
  name: 'Admin',
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
.admin {
  display: flex;
  background: $dark-color;
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

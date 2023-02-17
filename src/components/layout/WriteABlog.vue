<template>
  <transition name="rotate">
    <router-link :to="{ name: 'CreateBlog' }"
      ><div class="write-a-blog shortcut" :style="customStyle">
        <icon name="pen" class="shortcut-icon"></icon></div
    ></router-link>
  </transition>
</template>

<script>
export default {
  name: "WriteABlog",
  props: {
    visibilityHeight: {
      type: Number,
      default: 100,
    },
    backPosition: {
      type: Number,
      default: 0,
    },
    customStyle: {
      type: Object,
      default: function () {
        return {
          right: "5rem",
          bottom: "3rem",
          width: "6rem",
          height: "6rem",
          "border-radius": "50%",
          background: "#055b5c",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.shortcut {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: $secondary-color-light;
    .shortcut-icon {
      transform: scale(1.1, 1.1);
    }
  }
  &-icon {
    @include icon(2rem, #fff);
  }
}
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.5s ease;
}

.rotate-enter,
.rotate-leave-to {
  transform: rotate(360deg);
}
</style>

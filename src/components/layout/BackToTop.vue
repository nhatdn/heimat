<template>
  <transition name="rotate">
    <div
      class="back-to-top shortcut"
      v-show="visible"
      :style="customStyle"
      @click="backToTop"
    >
      <icon name="angle-up" class="shortcut-icon"></icon>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
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
          right: '6rem',
          bottom: '10rem',
          width: '4rem',
          height: '4rem',
          'border-radius': '50%',
          background: '#08979d',
        };
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight;
    },
    backToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

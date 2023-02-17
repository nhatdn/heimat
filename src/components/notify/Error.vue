<template>
  <Transition name="slide-fade">
    <div class="err" v-show="error">
      <p><span>Error: </span><slot /></p>
      <icon name="close" class="err-icon" @click="onClick"></icon>
    </div>
  </Transition>
</template>

<script>
export default {
  props: ['error'],
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.err {
  position: relative;
  border: 1px solid $error;
  background: rgba($color: $error, $alpha: 0.5);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 3rem 1rem 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  opacity: 1;
  @include transition(all 0.3s ease);
  &-icon {
    position: absolute;
    top: 35%;
    right: 1rem;
    fill: $light-color-light;
    cursor: pointer;
  }
}
</style>

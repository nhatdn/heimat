<template>
  <div class="progress d-flex">
    <div class="loader">
      <span style="--i: 0"></span>
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
      <span style="--i: 8"></span>
      <span style="--i: 9"></span>
    </div>
    <p class="content">Wellcome to Heimat !!!</p>
  </div>
</template>

<script>
export default {
  name: "Progress",
};
</script>

<style lang="scss" scoped>
.progress {
  flex-direction: column-reverse;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  .content {
    font-size: 4rem;
    font-weight: 700;
    margin: 2rem;
    color: $primary-color;
  }
  .loader {
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    transform: rotate(175deg);
    span {
      position: absolute;
      top: calc(1.2rem * var(--i));
      left: calc(1.2rem * var(--i));
      right: calc(1.2rem * var(--i));
      bottom: calc(1.2rem * var(--i));
      border: 1rem solid #0b0b0b;
      border-top: 1rem solid #0f0;
      border-left: 1rem solid #0f0;
      border-radius: 50%;
      animation: animate 1s alternate ease-in-out infinite;
      filter: hue-rotate(calc(60deg * var(--i)));
      animation-delay: calc(-0.1s * (var(--i)));
    }
    @keyframes animate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(90deg);
      }
    }
  }
}
</style>

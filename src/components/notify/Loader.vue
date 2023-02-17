<template>
  <div class="loader">
    <div class="loading">
      <hr />
      <hr />
      <hr />
      <hr />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: #fff;
  z-index: 100000;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}
.loading hr {
  position: absolute;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  animation: animateLoading 2s ease infinite;
}
@keyframes animateLoading {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
.loading {
  :first-child {
    background: #00f;
    animation-delay: -1.5s;
  }
  :nth-child(2) {
    background: #f00;
    animation-delay: -1s;
  }
  :nth-child(3) {
    background: #ff0;
    animation-delay: -0.5s;
  }
  :nth-child(4) {
    background: #00f0ff;
  }
}
</style>

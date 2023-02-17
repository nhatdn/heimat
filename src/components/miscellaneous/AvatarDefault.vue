<template>
  <div class="AvatarDefault d-flex">
    <div class="wrapper d-flex">
      <div class="head"></div>
      <div class="body"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvatarDefault",
};
</script>

<style lang="scss" scoped>
.AvatarDefault {
  cursor: pointer;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: linear-gradient(#fb02f6, #5e53fe);
  .wrapper {
    flex-direction: column;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    .body {
      height: 1.7rem;
      width: 2.5rem;
      border-radius: 50% 50% 30% 30%;
      background-color: white;
    }
  }
  .head {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    background-color: white;
  }
}
</style>

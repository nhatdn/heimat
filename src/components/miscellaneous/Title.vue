<template>
  <div class="title">
    <h3>{{ content }}</h3>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["content"],
};
</script>

<style lang="scss" scoped>
.title {
  padding: 2rem 0;
  h3 {
    font-family: $font-primary;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $light-color-darker;
    &::before {
      content: "";
      margin-right: 2rem;
      padding-right: 0.3rem;
      height: 100%;
      background-color: $light-color-darker;
    }
  }
}
</style>
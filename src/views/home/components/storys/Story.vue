<template>
  <div
    class="story"
    v-bind:style="{
      'background-image': 'url(' + img + ')',
    }"
  >
    <div class="author">
      <span class="author-name"> {{ author }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowMore",

  props: {
    img: String,
    author: String,
  },
};
</script>

<style lang="scss" scoped>
.story {
  cursor: pointer;
  margin: 0 0.5rem;
  width: 10rem;
  height: 15rem;
  background-color: #ffeeff;
  border: 0.1rem solid #ee17ee;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .author {
    width: 100%;
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    position: absolute;
    bottom: 0.5rem;
  }
}
</style>

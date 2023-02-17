<template>
  <div class="story-list d-flex">
    <FollowMore></FollowMore>
    <div class="story-wrapper d-flex">
      <Story
        v-for="index in 2"
        :key="index"
        img="https://previews.123rf.com/images/liligraphie/liligraphie1407/liligraphie140700274/29664045-soft-pink-tulips-old-love-letters-and-cards-sentimental-vintage-background-with-flowers-and-papers.jpg"
        author="Johny Dang"
      ></Story>
    </div>
  </div>
</template>

<script>
import FollowMore from "../followMore/FollowMore.vue";
import Story from "../storys/Story.vue";
export default {
  name: "ListStory",
  components: {
    FollowMore,
    Story,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.story {
  &-list {
    align-items: flex-start;
    justify-content: flex-start;
  }
  &-wrapper {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
    max-width: 60rem;
    min-width: 60rem;
    // overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>

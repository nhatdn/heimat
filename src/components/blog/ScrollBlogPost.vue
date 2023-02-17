<template>
  <div class="blog-post">
    <div class="blog-list scroll">
      <blog-card v-for="item in blogs" :key="item.id" :blog="item" />
    </div>
  </div>
</template>

<script>
import BlogCard from "./ScrollBlogCard.vue";
export default {
  name: "BlogPost",
  components: {
    BlogCard,
  },
  props: ["blogs"],
};
</script>

<style lang="scss" scoped>
.blog {
  &-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 2rem;
    padding: 0 2rem;
    @media #{$tablet} {
      scroll-snap-type: x mandatory;
      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>

<template>
  <div class="blog-post">
    <div class="blog-list">
      <blog-card
        v-for="item in blogPost"
        :key="item.id"
        :blog="item"
        :editable="false"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard.vue";
export default {
  name: "BlogPost",
  components: {
    BlogCard,
  },
  props: ["blogPost"],
};
</script>

<style lang="scss" scoped>
.blog {
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>

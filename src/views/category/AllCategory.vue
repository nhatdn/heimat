<template>
  <div class="category">
    <div class="category__hero">
      <div class="category__title">All Category</div>
      <div class="category__description">This is the category page</div>
    </div>
    <div class="category__content container">
      <div class="category__list">
        <blog-card
          v-for="item in AllBlogsOfAllUsers"
          :key="item.id"
          :blog="item"
          :editable="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BlogRepository } from "@/repositories";
import BlogCard from "@/components/blog/BlogCard.vue";
export default {
  name: "AllCategory",
  data() {
    return {
      AllBlogsOfAllUsers: [],
    };
  },
  components: {
    BlogCard,
  },
  created() {
    this.getAllBlogsOfAllUsers();
  },
  methods: {
    async getAllBlogsOfAllUsers() {
      const response = await BlogRepository.getAll();
      console.log(response.data.result);
      this.AllBlogsOfAllUsers = response.data.result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./category";
</style>

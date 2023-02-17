<template>
  <div class="category">
    <div
      class="category__hero"
      :style="{ 'background-image': 'url(' + category.cover + ')' }"
    >
      <div class="category__title">{{ category.name }}</div>
      <div class="category__description">{{ category.description }}</div>
    </div>
    <div class="category__content container">
      <div class="category__list" v-if="blogs.length != 0">
        <!-- <div class="category__card" v-for="idx in 12" :key="idx">
          <div class="category__name">Blog Name</div>
        </div> -->
        <blog-card
          v-for="blog in blogs"
          :key="blog._id"
          :blog="blog"
          :isCurrentUser="false"
        />
      </div>
      <div class="category__announce" v-else>This category has no blogs.</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BlogCard from "@/components/blog/BlogCard";
export default {
  components: { BlogCard },
  name: "Category",
  data() {
    return {
      category: "",
      blogs: [],
    };
  },
  methods: {
    getBlogsByCategory() {
      const id = this.$route.params.categoryId;
      this.category = this.getCategory(id);
      this.$store.dispatch("blog/setBlogsByCategoryId", id).finally(() => {
        this.blogs = this.$store.getters["blog/getBlogsByCategoryId"];
      });
    },
  },
  created() {
    this.getBlogsByCategory();
  },
  watch: {
    "$route.params.categoryId": {
      handler() {
        this.getBlogsByCategory();
      },
      immedately: true,
    },
  },
  computed: {
    ...mapGetters({ categoryList: "category/getCategoryList" }),
    ...mapGetters({ getCategory: "category/getCategory" }),
  },
};
</script>

<style lang="scss" scoped>
@import "./category";
</style>
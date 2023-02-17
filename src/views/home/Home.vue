<template>
  <div class="home">
    <loader v-if="loading" />
    <div v-else class="container">
      <div class="home-section">
        <Title content="Don't miss it"></Title>
        <div class="section-content">
          <div class="section-hightlight">
            <PostHightLight :blog="this.blogs[3]"></PostHightLight>
          </div>
          <div class="section-article">
            <ListArticles :blogs="this.blogs.slice(-3)"></ListArticles>
          </div>
        </div>
      </div>
      <div class="home-section">
        <Title content="Article of the month"></Title>
        <BlogPost :blogs="blogByMonth"></BlogPost>
      </div>
      <div class="section-wrapper">
        <div class="home-section">
          <Title content="For you"></Title>
          <ListArticles :blogs="RecommendedBlogs.blogs"></ListArticles>
          <div class="pagination d-flex">
            <a class="pagination-left" @click.prevent="handlePagination()">
              <icon name="angle-double-left"></icon>
            </a>
            <a
              class="pagination-page"
              :class="choosePagination == index ? 'active' : ''"
              v-for="(item, index) in RecommendedBlogs.pagination
                .totalPagination"
              :key="index"
              @click.prevent="
                handlePagination(index + 1);
                choosePagination = index;
              "
            >
              {{ index + 1 }}
            </a>
            <a
              class="pagination-right"
              @click.prevent="
                handlePagination(RecommendedBlogs.pagination.totalPagination)
              "
            >
              <icon name="angle-double-right"></icon>
            </a>
          </div>
        </div>
        <div class="home-section">
          <Title content="Maybe you care"></Title>
          <div class="section-content">
            <ListShortArticles
              :blogs="this.blogs.slice(-7)"
            ></ListShortArticles>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BlogRepository } from "@/repositories";
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/notify/Loader.vue";
import Title from "@/components/miscellaneous/Title.vue";
import BlogPost from "@/components/blog/ScrollBlogPost.vue";
import PostHightLight from "./components/postHightLight/PostHightLight.vue";
import ListArticles from "./components/listArticles/ListArticles.vue";
import ListShortArticles from "./components/listArticles/ListShortArticles.vue";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      blogs: null,
      choosePagination: 0,
      RecommendedBlogs: {
        blogs: [],
        pagination: {},
      },
      blogByMonth: [],
    };
  },
  components: {
    Title,
    PostHightLight,
    ListArticles,
    BlogPost,
    ListShortArticles,
    Loader,
  },
  computed: mapGetters({
    user: "user/getUser",
    categories: "category/getCategoryList",
  }),
  created() {
    this.getBlogs();
    if (!this.user) {
      this.getUser();
    }
    this.handlePagination();
    this.blogsInMonth();
  },
  methods: {
    ...mapActions({ getUser: "user/getInformation" }),
    async handlePagination(pagination = 1) {
      const response = await BlogRepository.getByPagination({
        pagination,
      });
      this.RecommendedBlogs = response.data;
    },
    async blogsInMonth() {
      const response = await BlogRepository.getByMonth({
        start: new Date(
          "1/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
        ),
        end: new Date(),
      });
      this.blogByMonth = response.data.result;
    },
    async getBlogs() {
      try {
        this.loading = true;
        const response = await BlogRepository.getAll();
        if (response.status === 200) {
          this.blogs = response.data.result;
        }
      } catch (e) {
        console.log("Error: " + e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: $primary-color;
}
.home {
  &-discover {
    flex-grow: 1;
  }
  &-user {
    &-wrapper {
      display: flex;
      padding: 2rem 0 1rem;
      gap: 2rem;
    }
  }
  .section {
    &-wrapper {
      display: flex;
      padding: 3rem 0;
      gap: 5rem;
    }

    &-hightlight {
      flex-grow: 4;
      flex-basis: 40%;
    }
    &-article {
      flex-grow: 6;
      flex-basis: 60%;
    }
    &-content {
      display: flex;
    }
  }
}
.wapper {
  align-items: flex-start;
}
.pagination {
  &-left {
    cursor: pointer;
    padding: 1rem 1.5rem;
    margin-right: 1rem;
    &:hover {
      background-color: #ffddff;
    }
  }
  &-right {
    cursor: pointer;
    padding: 1rem 1.5rem;
    margin-left: 1rem;
    &:hover {
      background-color: #ffddff;
    }
  }
  &-page {
    font-size: 1.4rem;
    cursor: pointer;
    padding: 1rem 1.5rem;
    margin: 0 0.5rem;
    &:hover {
      background-color: #ffddff;
    }
  }
}
</style>

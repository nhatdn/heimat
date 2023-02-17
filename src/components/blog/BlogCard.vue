<template>
  <div class="blog-card">
    <router-link :to="{ name: 'ViewBlog', params: { blogId: blog._id } }">
      <img class="blog-card__image" :src="blog.cover" alt="blog-card" />
      <div v-if="editable" class="blog-card__action">
        <div class="blog-card__icon">
          <icon name="edit"></icon>
        </div>
        <div class="blog-card__icon">
          <icon name="trash-alt"></icon>
        </div>
      </div>
      <div class="blog-card__bottom">
        <div class="blog-card__content">
          <span class="blog-card__category">{{ blog.category[0].name }}</span>
          <h6 class="blog-card__title">
            {{ blog.title }}
          </h6>
          <p class="blog-card__description">{{ blog.description }}</p>
        </div>
        <div class="blog-card__author" v-show="!isCurrentUser">
          <author
            :name="blog.user[0].fullname"
            :image="blog.user[0].avatar"
            :id="blog.user[0]._id"
            :username="blog.user[0].username"
          />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Author from "@/components/miscellaneous/Author.vue";
import { mapGetters } from "vuex";
export default {
  components: { Author },
  name: "BlogCard",
  props: ["blog", "editable", "isCurrentUser"], //change to mapGetters later
  computed: mapGetters({ category: "category/getCategory" }),
  methods: {
    convertCategory(index) {
      return this.category(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0 1.3rem 2.7rem -0.5rem,
    rgba(0, 0, 0, 0.3) 0 0.8rem 1.6rem -0.8rem;
  cursor: pointer;
  transition: 0.2s;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  &:hover {
    transform: translate(-0.3rem, -0.5rem) rotate(3deg);
  }
  @media #{$phablet} {
    &:hover {
      transform: none;
    }
  }
  & > a {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &__image {
    width: 100%;
    height: 18rem;
    object-fit: cover;
    border-radius: 0.3rem;
    flex-shrink: 0;
  }
  &__action {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6rem;
    height: 3.6rem;
    background-color: $light-color;
    fill: $dark-color-semi;
    border: 0.1rem $light-color-semi;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:first-child {
      margin-bottom: 1rem;
    }
    &:hover {
      background-color: $dark-color-semi;
      fill: $light-color;
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  &__category {
    font-size: 1.6rem;
    font-weight: 500;
    text-transform: capitalize;
    padding: 1rem 0 0.5rem;
    color: $dark-color-dark;
    flex-shrink: 0;
  }
  &__title {
    font-size: 1.8rem;
    font-weight: 600;
    color: $dark-color;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
  &__author {
    padding-top: 1rem;
    flex-shrink: 0;
  }
  &__description {
    font-size: 1.4rem;
    color: $dark-color-light;
    @include textClamp(3);
  }
}
</style>

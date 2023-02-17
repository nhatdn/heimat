<template>
  <router-link :to="{ name: 'ViewBlog', params: { blogId: blog._id } }">
    <div class="Articles">
      <div class="cover">
        <img :src="blog.cover" alt="" class="img-cover" />
      </div>
      <div class="content-post d-flex">
        <div class="topic-post-and-time d-flex">
          <p class="topic">{{ blog.category[0].name }}</p>
          <p class="time" :title="typeTimeDefault(blog.created_date)">
            {{ timeSince(blog.created_date) }}
          </p>
        </div>
        <p class="title-post">
          {{ blog.title }}
        </p>
        <p class="introduction">
          {{ blog.description }}
        </p>
        <div class="wrapper-author">
          <author
            :name="blog.user[0].fullname"
            :image="blog.user[0].avatar"
            :id="blog.user[0]._id"
            :username="blog.user[0].username"
          />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Author from "@/components/miscellaneous/Author.vue";
export default {
  name: "Articles",
  components: {
    Author,
  },
  props: ["blog"],
};
</script>

<style scoped lang="scss">
.Articles {
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  .cover {
    margin-right: 1rem;
    max-width: 25rem;
    min-width: 25rem;
    .img-cover {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
  }
  .content-post {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 1rem;
    .topic-post-and-time {
      justify-content: flex-start;
      .topic {
        padding-right: 1rem;
        border-right: 0.1 solid black;
        font-weight: 500;
        font-size: 1.4rem;
        text-transform: uppercase;
        color: #000000;
      }
      .time {
        margin-left: 1rem;
        font-size: 1.2rem;
        color: rgba(0, 0, 0, 0.56);
      }
    }
    .title-post {
      margin: 1rem 0;
      font-weight: 700;
      font-size: 1.8rem;
      color: #000000;
      transition: color 0.2s ease;
      &:hover {
        color: $primary-color-dark;
      }
    }
    .introduction {
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .wrapper-author {
    margin: 0.5rem 0;
  }
}
</style>

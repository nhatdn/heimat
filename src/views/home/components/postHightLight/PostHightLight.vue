<template>
  <div class="PostHightLight">
    <router-link :to="{ name: 'ViewBlog', params: { blogId: blog._id } }">
      <div class="cover">
        <img :src="blog.cover" alt="cover" class="img-cover" />
      </div>
      <div class="name-post-and-time d-flex">
        <p class="name">{{ blog.category[0].name }}</p>
        <p class="time">
          {{ timeSince(blog.created_date) }}
        </p>
      </div>
      <p class="title-post">
        {{ blog.title }}
      </p>
      <p class="introduction">
        {{ blog.description }}
      </p>
      <div class="wapper-author">
        <author
          :name="blog.user[0].fullname"
          :image="blog.user[0].avatar"
          :id="blog.user[0]._id"
          :username="blog.user[0].username"
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import Author from "@/components/miscellaneous/Author";
export default {
  name: "PostHightLight",
  components: {
    Author,
  },
  props: ["blog"],
};
</script>

<style scoped lang="scss">
.PostHightLight {
  width: 50rem;
  margin-right: 3rem;
  .cover {
    width: 50rem;
    height: 30rem;
    .img-cover {
      cursor: pointer;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }
  }
  .name-post-and-time {
    margin: 1rem 0;
    justify-content: flex-start;
    .name {
      font-size: 1.8rem;
      text-transform: uppercase;
      color: #000000;
      padding-right: 1.6rem;
      border-right: 0.15rem solid black;
    }
    .time {
      margin-left: 1.6rem;
      font-style: normal;
      font-weight: normal;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.56);
    }
  }
  .title-post {
    font-size: 2.4rem;
    font-weight: 800;
    color: #000000;
    transition: color 0.2s ease;
    &:hover {
      color: $primary-color-dark;
    }
  }
  .introduction {
    margin-top: 1.5rem;
    font-size: 1.6rem;
    color: rgba(0, 0, 0, 0.65);
  }
  .wapper-author {
    margin: 3rem 0;
    margin-left: 2.2rem;
  }
}
</style>

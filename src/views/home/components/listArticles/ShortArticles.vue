<template>
  <div class="short-article">
    <router-link :to="{ name: 'ViewBlog', params: { blogId: blog._id } }">
      <div class="wrapper">
        <div class="avatar">
          <img :src="blog.cover" alt="" class="img-avatar" />
        </div>
        <div class="content-post">
          <div class="title">{{ blog.title }}</div>
          <div class="time-and-author d-flex">
            <router-link
              :to="{
                name: 'Profile',
                params: {
                  userId: blog.user[0]._id,
                  userUsername: blog.user[0].user,
                },
              }"
              class="author-name"
              >{{ blog.user[0].fullname }}</router-link
            >
            <span class="space-between">-</span>
            <p class="time" :title="typeTimeDefault(blog.created_date)">
              {{ timeSince(blog.created_date) }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ShortArticles",
  props: ["blog"],
};
</script>

<style lang="scss" scoped>
.short-article {
  padding: 0.5rem 0;
  cursor: pointer;
  border-radius: 0.8rem;
  .wrapper {
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
  &:hover {
    background: #ffeeff;
  }
  .avatar {
    flex-shrink: 0;
    height: 6rem;
    width: 6rem;
    .img-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .content-post {
    margin-left: 1.5rem;
    .title {
      font-weight: 700;
      font-size: 1.4rem;
      color: #000000;
    }
    .time-and-author {
      justify-content: flex-start;
    }
    .author-name {
      font-style: normal;
      font-weight: 700;
      font-size: 1.25rem;
      color: rgba(0, 0, 0, 0.69);
    }
    .space-between {
      font-size: 2rem;
      padding: 0 0.8rem;
    }
    .time {
      font-weight: 600;
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.46);
    }
  }
}
</style>

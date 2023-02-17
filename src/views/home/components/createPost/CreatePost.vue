<template>
  <div class="CreatePost">
    <div class="create-post d-flex">
      <div class="avatar">
         <img class="cover" :src="user.avatar" v-if="user" alt="avatar" />
        <AvatarDefault v-else></AvatarDefault>
      </div>
      <div class="create-content">
        <textarea
          @click="navigateToCreateBlog"
          class="create-content-editor"
          id="write-content"
          placeholder="Write your mind here!!!"
        ></textarea>
      </div>
    </div>
    <div class="add-attach"></div>
  </div>
</template>

<script>
import AvatarDefault from "@/components/miscellaneous/AvatarDefault.vue";

export default {
  components: {
    AvatarDefault,
  },
  methods: {
    navigateToCreateBlog() {
      this.$router.push({ name: "CreateBlog" });
    },
  }, props: {
    user: {},
  },
};
</script>

<style lang="scss" scoped>
.CreatePost {
  background: rgba(255, 221, 255, 0.5);
  margin-top: 1rem;
  border: 0.1rem solid #ffddff;
  border-radius: 1rem;
  min-width: 60rem;
  max-width: 60rem;
}
.create-post {
  padding: 1rem 0.5rem 1rem 1rem;
  justify-content: flex-start;
}
.create-content {
  width: 100%;

  margin: 0 1rem;
  justify-content: flex-start;

  .avatar {
    flex-shrink: 0;
  }
  &-editor {
    padding: 0 2rem;
    height: 4.5rem;
    width: 100%;
    overflow: hidden;
    border: none;
    border-radius: 2.5rem;
    background-color: #ffe3ff;
    line-height: 4.5rem;
    font-weight: 500;
    font-size: 1.4rem;
    font-family: $font-primary;
    color: rgba(0, 0, 0, 0.49);
    resize: none;
    outline: none;
  }
}
.cover {
  @include roundImage(4rem)
}
</style>

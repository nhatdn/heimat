<template>
  <div class="author">
    <router-link
      :to="{
        name: 'Profile',
        params: { userId: id, userUsername: username },
      }"
    >
      <img :src="image" alt="author" /><span>{{ name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: ["image", "name", "id", "username"],
};
</script>

<style lang="scss" scoped>
.author {
  a {
    display: flex;
    align-items: center;
  }
  img {
    width: 3.6rem;
    height: 3.6rem;
    object-fit: cover;
    border-radius: 50%;
    color: $dark-color-semi;
  }
  span {
    padding: 1rem;
    font-family: $font-primary;
    font-size: 1.6rem;
    font-weight: bold;
    color: $dark-color-semi;
    &:hover {
      color: $dark-color-dark;
    }
  }
}
</style>

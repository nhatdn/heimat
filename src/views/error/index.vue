<template>
  <div class="container">
    <div class="error">
      <!-- <p>This is Error Page</p>
      <p v-if="$route.params.error">{{ $route.params.error }}</p>
      <router-link :to="{ name: 'Home' }">Back to home page</router-link>
      <router-link :to="{ name: 'Login' }">Back to login page</router-link> -->

      <error-404></error-404>
    </div>
  </div>
</template>

<script>
import Error404 from "./error404";
export default {
  name: "Error",
  components: { Error404 },
};
</script>

<style lang="scss" scoped>
.error {
  margin: 5rem 0;
  p,
  a {
    font-size: 2rem;
  }
  a {
    border: 1px solid black;
    border-radius: 0.5rem;
    display: inline-block;
    padding: 0.6rem;
    margin-top: 1rem;
    margin-right: 1rem;
  }
}
</style>

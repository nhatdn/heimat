<template>
  <div class="ListArticles">
    <Articles
      v-for="(item, index) in blogs"
      :key="index"
      :blog="item"
    ></Articles>
  </div>
</template>

<script>
import Articles from "./Articles.vue";
export default {
  name: "ListArticles",
  components: {
    Articles,
  },
  props: ["blogs"],
  created() {
    console.log(this.blogs);
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="ListShortArticles">
    <ShortArticle
      v-for="(item, index) in blogs"
      :key="index"
      :blog="item"
    ></ShortArticle>
  </div>
</template>

<script>
import ShortArticle from "./ShortArticles.vue";

export default {
  components: {
    ShortArticle,
  },
  props: ["blogs"],
};
</script>

<style></style>

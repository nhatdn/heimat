<template>
  <div id="app">
    <component :is="this.$route.meta.layout ? 'Layout' : 'div'">
      <router-view />
    </component>
    <back-to-top />
    <component
      v-if="user"
      :is="this.$route.meta.ableToWrite ? 'write-a-blog' : 'div'"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BackToTop from "./components/layout/BackToTop.vue";
import WriteABlog from "./components/layout/WriteABlog.vue";
import Layout from "./layouts/LayoutPrimary";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Layout,
    BackToTop,
    WriteABlog,
  },
  computed: mapGetters({ user: "user/isAuthenticated" }),
};
</script>

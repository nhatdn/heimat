<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="SearchingResult container">
    <div class="option-searching">
      <button
        class="for-blog btn"
        :class="option == 1 ? 'active' : ''"
        @click="option = 1"
      >
        Members list
      </button>
      <button
        class="for-user btn"
        :class="option == 2 ? 'active' : ''"
        @click="option = 2"
      >
        Blogs list
      </button>
      <button
        class="for-blog btn"
        :class="option == 3 ? 'active' : ''"
        @click="option = 3"
      >
        All
      </button>
    </div>
    <div class="result">
      <div
        class="dont-exist"
        v-if="getResult.users.length == 0 && getResult.users.length == 0"
      >
        Could not find the one you are searching for, try something else.
      </div>
      <div class="container-result" v-else>
        <div v-if="option == 1 || option == 3">
          <Title
            v-if="getResult.users.length != 0"
            content="Members list"
          ></Title>
          <div class="member-list">
            <profile-card
              v-for="(item, index) in getResult.users"
              :key="index"
              :Profile="item"
            />
          </div>
        </div>
        <div v-if="option == 2 || option == 3">
          <Title
            v-if="getResult.blogs.length != 0"
            content="Blogs list"
          ></Title>
          <blog-list :blogPost="getResult.blogs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/miscellaneous/Title.vue";
import BlogList from "../../components/blog/BlogList.vue";
import ProfileCard from "../members/components/ProfileCard.vue";
import { mapGetters } from "vuex";
export default {
  name: "SearchingResult",
  data() {
    return {
      option: 3,
    };
  },
  computed: {
    ...mapGetters({ getResult: "search/getResult" }),
  },
  components: {
    Title,
    ProfileCard,
    BlogList,
  },
};
</script>

<style lang="scss" scoped>
.member-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}
.container-result {
  margin: 3rem 0;
}
.option-searching {
  margin: 1rem 0;
  padding: 0.3rem 0;
  padding-left: 1rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .btn {
    font-size: 1.6rem;
    outline: none;
    border: none;
    padding: 0.8rem 1.4rem;
    margin-right: 0.5rem;
    color: white;
    background-color: $secondary-color;
    cursor: pointer;
    border-radius: 0.2rem;
  }
  .btn:hover {
    background-color: $secondary-color-dark;
  }
  .btn.active {
    background-color: $secondary-color-dark;
  }
}
.dont-exist {
  font-size: 1.6rem;
  height: 40rem;
  text-align: center;
}
</style>

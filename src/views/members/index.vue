<template>
  <div class="member">
    <div class="container">
      <Title content="Featured members" />
      <div class="member-list">
        <profile-card
          v-for="(item, index) in listMember"
          :key="index"
          :Profile="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/miscellaneous/Title.vue";
import ProfileCard from "./components/ProfileCard.vue";
import { UserRepository } from "@/repositories";
export default {
  components: { ProfileCard, Title },
  data() {
    return {
      listMember: [],
    };
  },
  created() {
    this.getListRepository();
  },
  methods: {
    async getListRepository() {
      const response = await UserRepository.outstandingMember();
      console.log("Featured");
      console.log(response.data);
      this.listMember = response.data.result;
    },
  },
};
</script>

<style lang="scss" scoped>
.member {
  margin: 7rem 0;
  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
}
</style>

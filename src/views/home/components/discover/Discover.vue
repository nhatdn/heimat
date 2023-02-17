<template>
  <div class="discover">
    <div class="wrapper">
      <h3 class="title">Discover</h3>
      <div class="famous-people d-flex" v-for="index in 3" :key="index">
        <div class="avatar">
          <img
            class="img-avatar"
            src="https://previews.123rf.com/images/liligraphie/liligraphie1407/liligraphie140700274/29664045-soft-pink-tulips-old-love-letters-and-cards-sentimental-vintage-background-with-flowers-and-papers.jpg"
            alt="avatar"
          />
        </div>
        <div class="name-and-description">
          <p class="name">Quang Vinh</p>
          <p class="description">Life is a game</p>
        </div>
        <div class="follow">
          <button class="btn-follow">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discover",
  props: {
    listDiscover: [],
  },
};
</script>

<style lang="scss" scoped>
.discover {
  background-color: #ffeeff;
  border: 0.1rem solid #ffddff;
  border-radius: 1rem;
  height: 100%;
  padding: 0.5rem 1.2rem;
  .title {
    margin: 1rem 0 0 3.2rem;
    font-size: 2rem;
    font-weight: 600;
    color: #0000008f;
  }
  .famous-people {
    margin: 1rem 0;
    border-radius: 0.8rem;
    padding: 1rem;
    justify-content: space-between;
    background-color: #ffe5ff;
    border: 0.1rem solid #ffddff;
  }
  .avatar {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    .img-avatar {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .name-and-description {
    .name {
      font-style: normal;
      font-weight: 700;
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
    .description {
      font-style: italic;
      font-weight: 600;
      font-size: 1.2rem;
      color: rgba(0, 0, 0, 0.42);
    }
  }
  .btn-follow {
    width: 7.6rem;
    height: 2.7rem;
    background-color: #83bece;
    outline: none;
    border: none;
    border-radius: 1rem;
    font-style: normal;
    font-weight: 600;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.42);
    cursor: pointer;
  }
}
</style>

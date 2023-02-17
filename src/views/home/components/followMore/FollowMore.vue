<template>
  <div class="FollowMore">
    <div class="follow-story d-flex">
      <div class="wapper d-flex">
        <div class="add-story d-flex">
          <icon class="icon" name="plus"></icon>
        </div>
      </div>
    </div>
    <div class="content">
      <span class="follow-more"> Follow more </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowMore",

  props: {
    img: String,
  },
};
</script>

<style lang="scss" scoped>
.FollowMore {
  cursor: pointer;
  margin: 0 0.3rem;
  height: 15rem;
  min-width: 7rem;
  width: 10rem;
  background-color: #ffeeff;
  border: 0.1rem solid #ee17ee;
  border-radius: 1rem;
  .follow-story {
    height: 78%;
    .wapper {
      width: 3.7rem;
      height: 3.7rem;
      background: linear-gradient(to right, #84d5ff, #e783fc);
      border-radius: 0.8rem;
      padding: 0.2rem;
      .add-story {
        border-radius: 0.6rem;
        height: 3rem;
        width: 3rem;
        background-color: #ffeeff;
        .icon {
          fill: #b3adfe;
        }
      }
    }
  }
  .content {
    text-align: center;
    color: rgba(0, 0, 0, 0.49);
    font-size: 1rem;
  }
}
</style>

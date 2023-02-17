<template>
  <div class="Attach d-flex">
    <div class="photo-and-video d-flex Attach-item">
      <div class="icon">
        <img :src="require('@/assets/icon/images.png')" alt="" />
      </div>
      <span class="title">Photo/Video</span>
    </div>
    <div class="emotion d-flex Attach-item">
      <div class="icon">
        <img :src="require('@/assets/icon/emotion.png')" alt="" />
      </div>
      <span class="title">Emotion</span>
    </div>
    <div class="check-in d-flex Attach-item">
      <div class="icon">
        <img :src="require('@/assets/icon/checkIn.png')" alt="" />
      </div>
      <span class="title">Check in</span>
    </div>
    <div class="file-gif d-flex Attach-item">
      <div class="icon">
        <img :src="require('@/assets/icon/gif.png')" alt="" />
      </div>
      <span class="title">File GIF</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Attach",
};
</script>

<style lang="scss" scoped>
.Attach {
  cursor: pointer;
  margin: 0.5rem 1.5rem;
  justify-content: space-between;
  &-item {
    justify-content: flex-start;
    height: 4rem;
    width: 12.5rem !important;
    padding-left: 1rem;
    &:hover {
      background: rgba(255, 188, 255, 0.5);
      border-radius: 0.8rem;
    }
  }
  .icon {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .title {
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.51);
  }
}
</style>

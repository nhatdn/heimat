<template>
  <div class="alert d-flex">
    <div class="container">
      <div id="alert-additional-content-5" class="alert-box" role="alert">
        <div class="img">
          <img
            class="img"
            src="@/assets/images/869563.png"
            alt="notification"
          />
        </div>
        <div class="alert">
          <h3>{{ title }}</h3>
        </div>
        <div class="alert-content alert">
          {{ content }}
        </div>
        <div class="alert">
          <button type="button" class="button">Close</button>
          <button
            type="button"
            onclick="Close()"
            class="dismiss-btn"
            id="close"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    title: String,
    content: String,
  },
  methods: {
    closeAlert() {
      document
        .querySelector(".alert")
        .parentNode.removeChild(document.querySelector(".alert"));
      this.$emit("ok");
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  .alert-box {
    padding: 2rem;
    width: 45rem;
    margin: auto;
    background: #1ff71c21;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0 0.3rem 0.8rem;
  }
  .alert {
    display: flex;
    align-items: center;
    position: relative;
  }
  .alert .ico {
    margin-right: 3rem;
    width: 4rem;
    height: 4rem;
    color: #39ff21;
    font-size: 50px;
    transform: translateY(-4rem);
  }
  .alert h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #28e53f;
  }
  .alert-content {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    font-size: 1.6rem;
    color: #28e53f;
  }
  .alert .button {
    color: #fff;
    background: #1fe41c;
    padding: 1rem 2rem;
    margin-right: 1rem;
    align-items: center;
    text-align: center;
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  }
  .alert .button:hover {
    color: #fff;
    background: #21ce1e;
  }
  .button i {
    font-size: 1.7rem;
    margin-right: 0.5em;
    width: 2rem;
    height: 2rem;
    color: #fff;
  }
  .dismiss-btn {
    border: 1px solid #1fe41c;
    border-radius: 1rem;
    padding: 1rem 2rem;
    background: transparent;
    cursor: pointer;
    color: #1fe41c;
    box-shadow: rgba(0, 0, 0, 0.15) 0.24rem 0.24rem 0.32rem;
  }
  .dismiss-btn:hover {
    background: #1fe41c;
    color: #fff;
  }
  .img {
    position: relative;
  }
  .img img {
    width: 10rem;
    position: absolute;
    float: right;
    right: -5.6rem;
    transform: translateY(-1rem);
    clip: rect(0, 6rem, 20rem, 0);
  }
}
</style>

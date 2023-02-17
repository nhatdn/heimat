<template>
  <div class="error">
    <div class="img">
      <img
        src="../../assets/images/hanhgia.png"
        alt="error 404"
        width="250rem"
      />
    </div>
    <div class="content">
      <div class="text">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p class="not-found">
          We are sorry, but the page you are looking for does not exist
        </p>
      </div>
    </div>
    <div class="btn">
      <router-link :to="{ name: 'Home' }"
        ><input type="button" value="Go Back"
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="scss" scoped>
.error {
  font-size: 2rem;
  margin-top: 10rem;
}
.img {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
p {
  text-align: center;
}
input {
  margin-top: 1.5rem;
  padding: 1rem 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background-color: #08979d;
  color: aliceblue;
  outline: none;
  cursor: pointer;
  border: none;
}
input:hover,
input:active {
  background-color: #055b5c;
}
</style>

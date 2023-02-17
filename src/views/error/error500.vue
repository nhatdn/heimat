<template>
  <div class="error">
    <div class="img">
      <img
        src="../../assets/images/error500.png"
        alt="error 500"
        width="250rem"
      />
    </div>
    <div class="content">
      <div class="text">
        <h1>500 Server Error</h1>
        <h2>Oops! Some thing went wrong</h2>
        <p class="not-found">
          Try to refresh this page or feel free to contact us if the problem persist
        </p>
      </div>
    </div>
    <div class="btn">
      <input type="button" value="Reload" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="scss" scoped>
.error{
  font-size: 2rem;
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
h1{
  text-align: center;
}
h2{
  text-align: center;
}
p{
  text-align: center;
}
input{
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
input:active{
  background-color: #055b5c;
}
</style>
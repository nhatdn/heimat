<template>
  <div class="about">
    <div class="header">
      <div class="list">
        <ul>
          <li><a href="#">Our Mission </a></li>
          <li><a href="#">Our Product </a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div class="logo">
        <router-link :to="{ name: 'Home' }"
          ><span class="logo">Heimat</span></router-link
        >
      </div>
      <div class="content">
        <p class="content-header">
          An ecosystem of products <br />
          supporting personal development <br />
          for the youth in Vietnam
        </p>
      </div>
      <div class="btn">
        <input type="button" value="Learn more" />
      </div>
    </div>
    <div class="mid-header">
      <div class="heading">
        <h2 class="heading-mid">OUR MISSION</h2>
      </div>
      <div class="content-mid">
        <p class="content">
          To become the top-of-mind destination <br />
          for the top minds of Vietnam to share <br />
          ideas/knowledge to not only fellow <br />
          Vietnamese but also the whole world
        </p>
      </div>
    </div>
    <div class="end-about">
      <div class="heading-about">
        <div class="end">
          <div class="end-heading">
            <h2 class="heading-end">Website Heimat</h2>
          </div>
          <div class="end-content">
            <p class="content-about">
              Social network for Vietnamese youth to share <br />
              ideas/knowledge and constructive discussion
            </p>
            <p class="list-ul">
              <ul>
              <li>10000 members</li>
              <li>Over 5000 monthly visitors</li>
              <li>
                4000+ articles written by community members, <br />
                with more than 30 new articles daily
              </li>
            </ul>
            </p>
          </div>
        </div>
        <img src="../../assets/images/image-about.png" alt="home image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about {
  & .header {
    background-image: url("../../assets/images/background-about.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    background-attachment: fixed;
    & .list {
      list-style: none;
      font-family: $font-primary;
      font-size: 2rem;
      line-height: 2.3rem;
      padding-top: 3rem;
      margin-left: 100rem;
    }
    & .list ul li a {
      color: #ffffff;
      padding: 1rem;
    }
    & .list ul li {
      display: inline-block;
    }
    & .logo {
      font-family: $font-primary;
      font-size: 7.2rem;
      line-height: 8.7rem;
      letter-spacing: 0.29em;
      color: #ffffff;
      margin-top: 17.5rem;
      text-align: center;
      text-transform: uppercase;
    }
    & .content-header {
      font-family: $font-primary;
      font-weight: 400;
      font-size: 3.5rem;
      line-height: 42px;
      text-align: center;
      letter-spacing: 0.29em;
      color: #ffffff;
    }
    & .btn {
      text-align: center;
      margin-top: 2rem;
    }
    & .btn input {
      padding: 1rem 2.5rem;
      border-radius: 10rem;
      background: rgba(#ffddff, 0.13);
      border: none;
      color: #ffffff;
      font-family: $font-primary;
      font-style: normal;
      font-size: 2rem;
      line-height: 2.5rem;
      text-align: center;
      letter-spacing: 0.29em;
      cursor: pointer;
      @include transition(background 0.3s ease);
    }
    .btn input:hover,
    .btn input:active {
      background: rgba(#ffddff, 0.22);
    }
  }
  & .mid-header {
    width: 85rem;
    margin-left: 20%;
    height: 70vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & .heading {
      display: inline-block;
      & .heading-mid {
        font-family: $font-primary;
        font-weight: 400;
        font-size: 3rem;
        line-height: 42px;
        letter-spacing: 0.29em;
        color: #ffffff;
        background: #f17d12;
        width: 36rem;
        height: 25.5rem;
        margin-top: 5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    & .content-mid {
      display: inline-block;

      & .content {
        font-size: 2.2rem;
        font-family: $font-primary;
        font-weight: 400;
        line-height: 2.3rem;
        margin-top: 3.5rem;
        color: rgba(0, 0, 0, 0.62);
      }
    }
  }
  .end-about {
    background-color: #ffd3bb;
    height: 80vh;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .heading-about {
      display: flex;
      gap: 5rem;
      margin-left: 10rem;
    }
    .heading-end {
      font-family: $font-primary;
      font-weight: 600;
      font-size: 4rem;
      line-height: 5rem;
      color: rgba(0, 0, 0, 0.71);
      display: inline-block;
    }
    .content-about {
      font-family: $font-primary;
      font-style: normal;
      font-size: 2.4rem;
      line-height: 2.5rem;
      color: rgba(0, 0, 0, 0.61);
      display: inline-block;
    }
    & li {
      font-family: $font-primary;
      font-style: normal;
      font-size: 2.2rem;
      line-height: 2.5rem;
      color: rgba(0, 0, 0, 0.61);
    }
    & img {
      float: right;
    }
  }
}
</style>

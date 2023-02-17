<template>
  <div class="profile">
    <div class="header-profile">
      <div class="img">
        <img src="../../assets/images/image-profile.png" alt="profile" />
      </div>
      <div class="btn">
        <input type="button" value="Sửa ảnh bìa" />
        <icon class="icon camera-retro1" name="camera-retro"></icon>
      </div>
    </div>
    <div class="avatar">
      <div class="image"></div>
      <icon class="icon camera-retro" name="camera-retro"></icon>
      <div class="heading-avatar">
        <h3>Book Face - Loser</h3>
        <p class="content-avatar">
          ”Sắp xếp cuộc sống và phát huy <br />
          hết năng lực bản thân?”
        </p>
      </div>
    </div>
    <div class="list">
      <ul>
        <li><a href="#">Bài viết</a></li>
        <li><a href="#">Giới thiệu </a></li>
        <li><a href="#">Bài viết đã lưu</a></li>
        <li><a href="#">Nháp</a></li>
        <li><a href="#">Đang theo dõi</a></li>
        <li><a href="#">Người theo dõi</a></li>
      </ul>
    </div>
    <div class="content-profile">
      <input type="textarea" value="Bài viết" />
    </div>
    <div class="end-profile"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.profile {
  max-width: 100rem;
  margin-left: 15%;
  margin-top: 1rem;
  height: 200vh;
  .btn {
    position: absolute;
    top: 1.5rem;
    left: 107rem;
  }
  .btn input {
    background: #f5f5f5;
    border-radius: 0.8rem;
    font-family: $font-primary;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 3rem;
    color: #555555;
    padding: 0.1rem 3rem;
    border: none;
    cursor: pointer;
  }
  input:hover,
  input:active {
    background: #f3eded;
  }
  .camera-retro1 {
    width: 1.5rem;
    fill: #555555;
    position: absolute;
    top: 0.8rem;
    right: 12rem;
  }
  .avatar {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 35rem;
    position: absolute;
    left: 37.5%;
    top: 25rem;
  }
  .image {
    background: #ffaff2;
    border: 0.3rem solid rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    border-radius: 5rem;
    height: 10rem;
    width: 10rem;
    margin-left: 12.5rem;
    margin-top: 2.5rem;
  }
  .camera-retro {
    width: 2.8rem;
    height: 2.4rem;
    fill: #555555;
    background: #e9e9e9;
    border: 0.3rem solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 22rem;
    padding: 0.1rem;
    position: absolute;
    top: 9rem;
    left: 20rem;
  }
  h3 {
    font-family: $font-primary;
    font-weight: 600;
    font-size: 2rem;
    line-height: 3.5rem;
    color: #494949;
    text-align: center;
  }
  .content-avatar {
    font-family: $font-primary;
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 2.5rem;
    text-align: center;
    color: #000000;
    margin-bottom: 10rem;
  }
  .list ul li {
    list-style: none;
    display: inline-block;
    padding: 1rem;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  .list ul li:hover,
  .list ul li:active {
    border-bottom: 2px solid #9b7ca9;
  }
  .list ul {
    margin-top: 15rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 0.1rem solid #b0b0b0;
    border-bottom: 0.1rem solid #b0b0b0;
  }
  a {
    color: #000000;
    transition: border-bottom 0.5s;
    font-family: $font-primary;
  }
  .list ul li a:hover,
  .list ul li a:active {
    color: #9b7ca9;
  }
  .content-profile {
    margin-top: 5rem;
  }
  .content-profile input {
    border: none;
    outline-width: 0;
    font-family: $font-primary;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    color: rgba(0, 0, 0, 0.64);
    border-left: 0.2rem solid rgba(0, 0, 0, 0.64);
    padding-left: 1rem;
    margin-left: 0.1rem;
  }
}
</style>

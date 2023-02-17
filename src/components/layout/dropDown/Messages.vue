<template>
  <div class="navbar-dropdown">
    <h6 class="navbar-dropdown-title">Messages</h6>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item">
      <div class="preview-thumbnail">
        <img src="@/assets/images/author.jpg" alt="image" class="profile-pic" />
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Mark send you a message</p>
        <p class="preview-subject-description">1 Minutes ago</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item">
      <div class="preview-thumbnail">
        <img src="@/assets/images/author.jpg" alt="image" class="profile-pic" />
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Cregh send you a message</p>
        <p class="preview-subject-description">15 Minutes ago</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item preview-item">
      <div class="preview-thumbnail">
        <img src="@/assets/images/author.jpg" alt="image" class="profile-pic" />
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Profile picture updated</p>
        <p class="preview-subject-description">18 Minutes ago</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <p class="dropdown-navigating">4 new messages</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../Header";
</style>

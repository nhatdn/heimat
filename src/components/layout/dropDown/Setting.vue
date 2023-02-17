<template>
  <div class="navbar-dropdown" >
    <h6 class="navbar-dropdown-title">Profile</h6>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item">
      <div class="preview-thumbnail">
        <div class="preview-icon">
          <icon class="icon" name="setting"></icon>
        </div>
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Settings</p>
      </div>
    </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item preview-item" @click.prevent="logout">
      <div class="preview-thumbnail">
        <div class="preview-icon">
          <icon class="icon" name="signout"></icon>
        </div>
      </div>
      <div class="preview-item-content">
        <p class="preview-subject">Log out</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../Header";
</style>
